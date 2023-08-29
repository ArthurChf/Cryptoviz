import { Controller, Get } from "@nestjs/common";
import { RssFeedModel } from "./rss-feed.model";

@Controller('/rss-feed-test')
export class RssFeedTestController {
    @Get()
    async test() {
        const feed = new RssFeedModel('https://cryptoslate.com/feed/');
        return await feed.read();
    }

}