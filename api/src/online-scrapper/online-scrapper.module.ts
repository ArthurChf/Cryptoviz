import { Module } from '@nestjs/common';
import { RssFeedModule } from './rss-feed/rss-feed.module';

@Module({
    imports: [RssFeedModule],
    controllers: [],
    providers: [],
})
export class OnlineScrapperModule { }
