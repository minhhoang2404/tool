import { Moment, unitOfTime } from 'moment';

export interface BaseSlugOptions {
    slug: string;
}

export default interface Crawler {
    getCrawlInterval: () => string;
    crawl: () => Promise<void>;
    getTimezone?: () => string;
}
