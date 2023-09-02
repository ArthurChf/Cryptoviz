/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { RssFeedTestController } from './rss-feed-test.controller';
import { RssFeedService } from './rss-feed.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [RssFeedTestController],
    providers: [RssFeedService],
})
export class RssFeedModule { }
