import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RssFeedService } from '@app/online-scrapper/rss-feed/rss-feed.service';

@Injectable()
export class RssCronTasks {
    constructor(private readonly rssFeedService: RssFeedService) { }
    private readonly logger = new Logger(RssCronTasks.name);
    @Cron('*/3 * * * *')
    async trigger(): Promise<number> {
        this.logger.debug('Triggering RSS feed update');
        return await this.rssFeedService.read();
    }
}
