/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { RssFeedTestController } from './rss-feed-test.controller';

@Module({
    imports: [],
    controllers: [RssFeedTestController],
    providers: [],
})
export class RssFeedModule {}
