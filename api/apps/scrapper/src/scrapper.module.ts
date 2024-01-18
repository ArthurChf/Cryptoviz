import { Module } from '@nestjs/common';
// import { BinanceApiModule } from '@/apps/scrapper/src/binance-api/binance-api.module';
import { RssFeedModule } from '@/apps/scrapper/src/rss-feed/rss-feed.module';

@Module({
    imports: [RssFeedModule],
    controllers: [],
    providers: []
})
export class ScrapperModule { }
