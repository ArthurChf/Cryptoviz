import { Injectable, Logger } from '@nestjs/common';
import Parser from 'rss-parser';
import type { RSSNews, RSSNewsDto } from '@/libs/entities/src';
import { newsMapper } from '@/libs/entities/src';
import { KafkaService } from '@/libs/kafka/src/kafka.service';
import { urls } from '@/apps/scrapper/src/rss-feed/urls';

interface CustomFeed { foo: string }
interface CustomItem { bar: number }

@Injectable()
export class RssFeedService {
    private readonly parser: Parser<CustomFeed, CustomItem>;
    private readonly logger = new Logger(RssFeedService.name);

    constructor(private readonly kafkaService: KafkaService) {
        this.parser = new Parser({
            customFields: {
                feed: ['foo'],
                item: ['bar']
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 ...'
            }
        });
    }

    async parseFeed(url: string, name: string): Promise<RSSNews[]> {
        try {
            const feed = await this.parser.parseURL(url);
            return (feed.items as unknown as RSSNewsDto[]).filter((item) => item.content.length).map((item) => newsMapper(item, name));
        } catch (error) {
            this.logger.error(`Error reading RSS feed from ${name} at URL ${url}: ${error.message}`);
            throw error;
        }
    }


    public async read(): Promise<void> {
        const newsPromises = urls.map(async (feed) => this.parseFeed(feed.url, feed.name));
        try {
            const allNews = await Promise.all(newsPromises);
            const flattenedNews = allNews.flat();
            this.kafkaService.sendRssNews(flattenedNews);
            this.logger.log(`Send ${flattenedNews.length} news to kafka`);
        } catch (error) {
            this.logger.error(`Error in processing RSS Feeds: ${error.message}`);
        }
    }
}
