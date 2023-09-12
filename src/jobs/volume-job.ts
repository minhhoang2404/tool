import { CronJob } from 'cron';
import { CrawlerLogger as logger } from '../utils/logger';
import VolumeCrawler from './crawler/volume';

export async function register(): Promise<void> {
    logger.log('[Job] Update volume coin.');
    const crawler = new VolumeCrawler();
    let job = new CronJob(crawler.getCrawlInterval(), () => crawler.crawl(), null, false, crawler.getTimezone?.());
    job.start();
}
