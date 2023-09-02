import { Controller, Get } from "@nestjs/common";
import { RssFeedService } from "./rss-feed.service";

@Controller('/rss-feed-test')
export class RssFeedTestController {
    constructor(private readonly rssFeedService: RssFeedService) { }
    @Get()
    async test() {
        return await this.rssFeedService.read();
    }
}