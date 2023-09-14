import {
  CRAWL_BOT_INTERVAL,
  BINANCE_API_KEY,
  BINANCE_API_SECRET,
  BINANCE_API,
  PRESALE_CONTRACT,
  TELEGRAM_URL,
  BOT_KEY,
  CHAT_ID,
} from "../../config";

namespace BotData {
  export const crawlInterval = CRAWL_BOT_INTERVAL;
  export const binanceApiKey = BINANCE_API_KEY;
  export const binanceApiSecret = BINANCE_API_SECRET;
  export const binanceApi = BINANCE_API;
  export const telegram_url = TELEGRAM_URL;
  export const bot_key = BOT_KEY;
  export const chat_id = CHAT_ID;
  export const presaleContract = PRESALE_CONTRACT;
  export const presale_ABI = [
    {
      inputs: [
        { internalType: "contract IERC20", name: "_airb", type: "address" },
        { internalType: "uint256", name: "_startTime", type: "uint256" },
        { internalType: "uint256[]", name: "_caps", type: "uint256[]" },
        { internalType: "uint256", name: "_vestingDuration", type: "uint256" },
        { internalType: "address", name: "_treasury", type: "address" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "buyer",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "paymentToken",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "numberOfTokens",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "referrer",
          type: "address",
        },
      ],
      name: "TokensBought",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "claimer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "numberOfTokens",
          type: "uint256",
        },
      ],
      name: "TokensClaimed",
      type: "event",
    },
    {
      inputs: [],
      name: "AIRB",
      outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract IERC20",
          name: "paymentToken",
          type: "address",
        },
        { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
        { internalType: "address", name: "referrer", type: "address" },
      ],
      name: "buyTokens",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "caps",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "claimTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "claimedTokens",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "currentPhase",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "endSale",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "endTime",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getCurrentPhase",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "isSupportedPaymentMethod",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "listSupportedPaymentMethods",
      outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "paymentTokenToPriceFeed",
      outputs: [
        {
          internalType: "contract AggregatorV3Interface",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract IERC20",
          name: "paymentToken",
          type: "address",
        },
        { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
      ],
      name: "previewCost",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "paymentToken", type: "address" },
        {
          internalType: "contract AggregatorV3Interface",
          name: "dataFeed",
          type: "address",
        },
      ],
      name: "setPriceFeed",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256[10]",
          name: "_tokenPrices",
          type: "uint256[10]",
        },
      ],
      name: "setTokenPrices",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "startTime",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "supportedPaymentMethods",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "tokenPrices",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "phase", type: "uint256" }],
      name: "tokensAvailable",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "tokensBought",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "tokensSoldPerPhase",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "treasury",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "paymentToken", type: "address" },
        {
          internalType: "contract AggregatorV3Interface",
          name: "dataFeed",
          type: "address",
        },
      ],
      name: "unsetPriceFeed",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "vestingDuration",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    { stateMutability: "payable", type: "receive" },
  ];
}

export default BotData;
