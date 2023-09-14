import Crawler from "../../interfaces/crawler";
import BotData from "../resources/bot";
import { CrawlerLogger as logger } from "../../utils/logger";
import { Wallet, utils } from "ethers";
import { ControlModel, WalletModel } from "../../models";
import { WalletAttributes } from "models/wallet-model";
import moment from "moment";
import axios, { AxiosInstance } from "axios";
import crypto from "crypto";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { sleep } from "../../utils/wait";
import { BigNumber as BN } from "ethers";

export default class BotCrawler implements Crawler {
  constructor() {
    this.model = WalletModel;
    this.modelControl = ControlModel;
    this.axios = axios.create({
      baseURL: BotData.telegram_url,
    });
  }
  getTimezone: () => "UTC";

  getCrawlInterval(): string {
    return BotData.crawlInterval;
  }

  async crawl(): Promise<void> {
    try {
      const status = await this.modelControl.findOne({
        where: { chat_id: BotData.chat_id },
        attributes: ["status"],
      });

      if (status && status.getDataValue("status")) {
        // const wallet = Wallet.fromMnemonic(
        //   "cage assume general mass amused paper rely memory rather hope curious imitated"
        // );

        await this.sendLogTelegram("<=== BOT START ===>", "");

        const wallet = Wallet.fromMnemonic(
          utils.entropyToMnemonic(utils.randomBytes(16))
        );

        console.log("seed: ", wallet.mnemonic.phrase);

        this.web3.eth.accounts.wallet.add(wallet.privateKey);

        let data: WalletAttributes = {
          address: wallet.address,
          seed: wallet.mnemonic.phrase,
          private_key: wallet.privateKey,
          status: "created",
          withdrawal_id: "",
          created_at: moment().utc().startOf("minute").toDate(),
        };

        await this.model.create(data);

        const cost = await this.vault.methods
          .previewCost(
            "0x0000000000000000000000000000000000000000",
            this.web3.utils.toWei("1", "ether")
          )
          .call();

        await this.sendLogTelegram("Phrase:", wallet.mnemonic.phrase);
        logger.log("Create wallet success.");
        await this.sendLogTelegram("Address:", wallet.address);

        // console.log("address: ", wallet.address);

        await this.withdrawalToken(wallet);

        await sleep(15000);

        do {
          await sleep(5000);
          await this.web3.eth.getBalance(
            wallet.address,
            async (error, balance) => {
              if (!error) {
                this.balanceCount = Number(
                  this.web3.utils.fromWei(balance, "ether")
                );
                if (Number(balance) > 0) {
                  await this.sendLogTelegram(
                    "BOT:",
                    `Withdrawal success. Balance BNB: ${this.balanceCount.toFixed(
                      4
                    )} BNB`
                  );
                  logger.log(
                    `Withdrawal success. Balance BNB: ${this.balanceCount.toFixed(
                      4
                    )} BNB`
                  );
                } else {
                  await this.sendLogTelegram(
                    "BOT:",
                    `Please wait for the transaction to be confirmed on the blockchain.`
                  );
                  logger.log(
                    `Please wait for the transaction to be confirmed on the blockchain.`
                  );
                }
              } else {
                await this.sendLogTelegram("Error:", error.message);
                console.error("Error:", error);
              }
            }
          );
        } while (Number(this.balanceCount) === 0);

        this.buyValue = BN.from(
          this.web3.utils.toWei((this.balanceCount - 0.002).toFixed(4), "ether")
        )
          .div(BN.from(cost))
          .toNumber();

        await this.buyToken(wallet);
      } else {
        logger.log('[BOT] Listening request Telegram.')
      }
    } catch (error) {
      console.log("error : ", error);
    }
  }

  private async withdrawalToken(wallet: Wallet) {
    const apiKey = BotData.binanceApiKey;
    const apiSecret = BotData.binanceApiSecret;

    const withdrawalEndpoint = `${BotData.binanceApi}/sapi/v1/capital/withdraw/apply`;

    const withdrawalData = {
      coin: "BNB",
      amount: this.AmountWithdrawal,
      network: "BSC",
      address: wallet.address,
      name: "WITHDRAWAl",
    };

    const queryString = Object.keys(withdrawalData)
      .map((key) => `${key}=${encodeURIComponent(withdrawalData[key])}`)
      .join("&");

    const timestamp = Date.now();

    const signature = crypto
      .createHmac("sha256", apiSecret)
      .update(queryString + `&timestamp=${timestamp}`)
      .digest("hex");

    axios
      .post(withdrawalEndpoint, null, {
        headers: {
          "X-MBX-APIKEY": apiKey,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          ...withdrawalData,
          timestamp: timestamp,
          signature: signature,
        },
      })
      .then(async (response) => {
        response.data &&
          (await this.model.update(
            { status: "withdrawal", withdrawal_id: response?.data?.id || "" },
            { where: { address: wallet.address } }
          ));
        await this.sendLogTelegram(
          "BOT:",
          "Your withdrawal is being processed. Please wait for the transaction to be confirmed on the blockchain."
        );
        logger.log(
          "Your withdrawal is being processed. Please wait for the transaction to be confirmed on the blockchain."
        );
      })
      .catch(async (error) => {
        await this.sendLogTelegram("Status:", error?.response?.data?.msg);
        console.error("error:", error.response.data);
      });
  }

  private async buyToken(wallet: Wallet) {
    try {
      const tx = this.vault.methods.buyTokens(
        "0x0000000000000000000000000000000000000000",
        this.web3.utils.toWei(this.buyValue.toString(), "ether"),
        "0x0000000000000000000000000000000000000000"
      );

      const networkId = await this.web3.eth.net.getId();
      // const gas = await tx.estimateGas({ from: wallet.address });
      const gasPrice = await this.web3.eth.getGasPrice();
      // console.log('gasPrice:', gasPrice)
      const data = tx.encodeABI();
      const nonce = await this.web3.eth.getTransactionCount(wallet.address);

      const signedTx = await this.web3.eth.accounts.signTransaction(
        {
          to: this.vault.options.address,
          data,
          value: this.web3.utils.toWei(
            (this.balanceCount - 0.002).toFixed(4),
            "ether"
          ),
          gas: 501532,
          gasPrice,
          nonce,
          chainId: networkId,
        },
        wallet.privateKey
      );

      await this.web3.eth
        .sendSignedTransaction(signedTx.rawTransaction)
        .on("transactionHash", async (hash) => {
          await this.sendLogTelegram(
            "BOT:", `Buy AIRB with 0.022 BNB. Hash: ${hash}`);
          logger.log(`Buy AIRB with 0.022 BNB. Hash: ${hash}`);
          console.log("Transaction hash:", hash);
        })
        .on("error", (error) => {
          logger.log(`BOT: ${error?.message}`);
          console.error("Transaction error:", error);
        });
        await this.sendLogTelegram(
          "BOT:", `[Job] Withdrawal ${this.AmountWithdrawal} BNB and buy ${
            this.buyValue
          } AIRB (${(this.balanceCount - 0.002).toFixed(4)} BNB) success.`);
      logger.log(
        `[Job] Withdrawal ${this.AmountWithdrawal} BNB and buy ${
          this.buyValue
        } AIRB (${(this.balanceCount - 0.002).toFixed(4)} BNB) success.`
      );
    } catch (error) {
      logger.error(`error: `, error);
    }
  }

  private async sendLogTelegram(title: string, value: string) {
    await this.axios.post(`/${BotData.bot_key}/sendMessage`, {
      chat_id: BotData.chat_id,
      text: `<strong>${title}</strong> ${value}`,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  }

  private web3 = new Web3("https://bsc-dataseed.binance.org/");

  private vault = new this.web3.eth.Contract(
    BotData.presale_ABI as AbiItem[],
    "0xcCFE88665840b858dF87Df4F27f38Ca029057c12"
  );

  private axios: AxiosInstance;

  private balanceCount = 0;

  private buyValue = 0;

  private AmountWithdrawal = 0.025;

  private model: typeof WalletModel;

  private modelControl: typeof ControlModel;
}
