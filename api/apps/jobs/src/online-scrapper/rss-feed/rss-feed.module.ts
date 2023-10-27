import { Module } from '@nestjs/common';
import { RssFeedService } from './rss-feed.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { RssCronTasks } from './rss-cron-tasks.service';
@Module({
    imports: [HttpModule, ScheduleModule.forRoot()],
    controllers: [],
    providers: [RssFeedService, RssCronTasks]
})
export class RssFeedModule { }
