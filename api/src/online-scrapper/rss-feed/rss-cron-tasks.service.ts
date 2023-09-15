import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { RssFeedService } from "./rss-feed.service";

@Injectable()
export class RssCronTasks {
    constructor(private readonly rssFeedService: RssFeedService) { }
    private readonly logger = new Logger(RssCronTasks.name);
    @Cron('*/3 * * * *')
    trigger() {
        this.logger.debug('Triggering RSS feed update');
        return this.rssFeedService.read();
    }
}