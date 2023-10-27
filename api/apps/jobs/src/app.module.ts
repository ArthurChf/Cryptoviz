import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OnlineScrapperModule } from './online-scrapper/online-scrapper.module';
import { DatabaseModule } from "@libs/database/src";

@Module({
    imports: [OnlineScrapperModule, DatabaseModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule { }
