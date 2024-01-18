import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RssFeedService } from '@/apps/scrapper/src/rss-feed/rss-feed.service';

@Injectable()
export class RssCronTasks {
    constructor(private readonly rssFeedService: RssFeedService) {
        this.logger.debug('RssCronTasks constructor');
        this.trigger();
    }

    private readonly logger = new Logger(RssCronTasks.name);
    @Cron('0 * * * *')
    public async trigger(): Promise<void> {
        this.logger.debug('Triggering RSS feed update');
        await this.rssFeedService.read();
    }
}
