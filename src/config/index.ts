import dotenv from "dotenv";

dotenv.config();

import { AppLogger as logger } from "../utils/logger";

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const APP_HOST = process.env.APP_HOST || "0.0.0.0";
export const SERVER_URI = process.env.SERVER_URI;
export const CLIENT_URI = process.env.CLIENT_URI;

export const CRAWL_VOLUME_INTERVAL = process.env.CRAWL_VOLUME_INTERVAL;

export const DB_URI = process.env.DB_URI;
export const DB_NAME = process.env.DB_NAME;

if (!DB_URI || !DB_NAME)
  logger.error("[ENV] Missing required env variables for database");
