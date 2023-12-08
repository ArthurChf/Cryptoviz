import { Module } from '@nestjs/common';
import {BinanceApiModule} from "./binance-api/binance-api.module";
import {RssFeedModule} from "./rss-feed/rss-feed.module";

@Module({
    imports: [RssFeedModule],
    controllers: [],
    providers: []
})
export class ScrapperModule { }
