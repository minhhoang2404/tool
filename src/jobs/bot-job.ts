import { CronJob } from 'cron';
import { CrawlerLogger as logger } from '../utils/logger';
import BotCrawler from './crawler/bot';

export async function register(): Promise<void> {
    logger.log('[Job] Run BOT.');
    const crawler = new BotCrawler();
    let job = new CronJob(crawler.getCrawlInterval(), () => crawler.crawl(), null, false, crawler.getTimezone?.());
    job.start();
}
