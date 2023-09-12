import moment from "moment";
import Crawler from "../../interfaces/crawler";
import VolumeData from "../resources/volume";
import { CrawlerLogger as logger } from "../../utils/logger";
import { getValue } from "../../utils/bigNumber";
import { Op } from "sequelize";

export default class VolumeCrawler implements Crawler {
  constructor() {
  }

  getTimezone: () => "UTC";

  getCrawlInterval(): string {
    return VolumeData.crawlInterval;
  }

  async crawl(): Promise<void> {
    try {
      console.log('crawling...')
    } catch (error) {
      console.log("error : ", error);
    }
    logger.log(`[Job] Updated volume completed`);
  }
}
