import { RssFeedModule } from './online-scrapper/rss-feed/rss-feed.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@app/database';
import { OnlineScrapperModule } from './online-scrapper/online-scrapper.module';

@Module({
    imports: [DatabaseModule, RssFeedModule, OnlineScrapperModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
