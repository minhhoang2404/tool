import server from "./app";
import { APP_HOST, PORT } from "./config";
import {
  VolumeJob,
} from "./jobs";
import { initDatabase } from "./models";
import { AppLogger as logger } from "./utils/logger";
import sendLog from "./utils/slack-bot";

async function start(): Promise<void> {
  try {
    await initDatabase();

    await server.listen(PORT, APP_HOST);
    logger.log(`App's listening on the port ${PORT}`);
    sendLog({ msg: "Data service starts" });

    await Promise.all([
      VolumeJob.register(),
    ]);
  } catch (err) {
    sendLog({ msg: "Error on start", err });
    process.exit(1);
  }
}

start();
