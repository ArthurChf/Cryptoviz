import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { DatabaseModule } from '@libs/database/src';
import { OnlineScrapperModule } from '@app/online-scrapper/online-scrapper.module';
import { RssFeedModule } from '@app/online-scrapper/rss-feed/rss-feed.module';

@Module({
    imports: [DatabaseModule, RssFeedModule, OnlineScrapperModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule { }
