import { ControlAttributes } from "models/control-model";
import server from "./app";
import { APP_HOST, BOT_KEY, PORT } from "./config";
import { BotJob } from "./jobs";
import { ControlModel, initDatabase } from "./models";
import { AppLogger as logger } from "./utils/logger";
import sendLog from "./utils/slack-bot";
import TelegramBot from "node-telegram-bot-api";
import moment from "moment";

async function start(): Promise<void> {
  try {
    await initDatabase();

    const bot = new TelegramBot(
      "6677618212:AAG5Mty4VQyEq43kdVojt3m-NBLX1sQTHu0",
      { polling: true }
    );

    bot.onText(/\/startBOT/, async (msg) => {
      const chatId = msg.chat.id;
      let data: ControlAttributes = {
        chat_id: chatId,
        status: true,
        updated_at: moment().utc().startOf("minute").toDate(),
      };
      await ControlModel.upsert(data, {
        conflictFields: ["chat_id"],
        returning: false,
      });
      bot.sendMessage(chatId, "Start BOT buy token AIRB. Please wait a moment");
    });

    bot.onText(/\/stopBOT/, async (msg) => {
      const chatId = msg.chat.id;
      let data: ControlAttributes = {
        chat_id: chatId,
        status: false,
        updated_at: moment().utc().startOf("minute").toDate(),
      };
      await ControlModel.upsert(data, {
        conflictFields: ["chat_id"],
        returning: false,
      });
      bot.sendMessage(chatId, "Stop BOT buy token AIRB.");
    });

    await server.listen(PORT, APP_HOST);
    logger.log(`App's listening on the port ${PORT}`);
    sendLog({ msg: "Data service starts" });

    await Promise.all([BotJob.register()]);
  } catch (err) {
    sendLog({ msg: "Error on start", err });
    process.exit(1);
  }
}

start();
