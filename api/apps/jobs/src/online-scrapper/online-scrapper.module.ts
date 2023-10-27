import { Module } from '@nestjs/common';
import { RssFeedModule } from './rss-feed/rss-feed.module';
import { BinanceApiModule } from './binance-api/binance-api.module';
import {BlockExplorerModule} from "./block-explorer/block-explorer.module";

@Module({
    imports: [BinanceApiModule, BlockExplorerModule, RssFeedModule],
    controllers: [],
    providers: []
})
export class OnlineScrapperModule { }
