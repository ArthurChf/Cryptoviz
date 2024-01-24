import { Module } from '@nestjs/common';
import { RssFeedService } from '@/apps/scrapper/src/rss-feed/rss-feed.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { RssCronTasks } from '@/apps/scrapper/src/rss-feed/rss-cron-tasks.service';
import { KafkaService } from '@/libs/kafka/src/kafka.service';

@Module({
    imports: [HttpModule, ScheduleModule.forRoot()],
    providers: [KafkaService, RssFeedService, RssCronTasks]
})
export class RssFeedModule {}
