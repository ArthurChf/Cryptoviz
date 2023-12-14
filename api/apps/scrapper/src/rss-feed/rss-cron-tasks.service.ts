import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import type { RssFeedService } from '@/apps/scrapper/src/rss-feed/rss-feed.service';

@Injectable()
export class RssCronTasks {
    private readonly rssFeedService: RssFeedService;
    private readonly logger = new Logger(RssCronTasks.name);
    // Date du cron à modifier
    @Cron('*/3 * * * *')
    public async trigger(): Promise<number> {
        this.logger.debug('Triggering RSS feed update');
        return await this.rssFeedService.read();
    }
}
