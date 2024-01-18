import { Injectable, Logger } from '@nestjs/common';
import Parser from 'rss-parser';
import type { RSSNews, RSSNewsDto } from '@/libs/entities/src';
import { newsMapper } from '@/libs/entities/src';
import { writeFile } from 'fs/promises';
import { writeFileSync } from 'fs';

interface CustomFeed { foo: string }
interface CustomItem { bar: number }
@Injectable()
export class RssFeedService {
    private readonly parser: Parser<CustomFeed, CustomItem>;
    private readonly logger = new Logger(RssFeedService.name);

    constructor() {
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

    public urls: { name: string; url: string }[] = [
        {
            url: 'https://coinjournal.net/fr/actualites/category/analyse/feed/',
            name: 'coinjournal-analyse'
        },
        {
            url: 'https://www.newsbtc.com/feed/',
            name: 'newsbtc'
        },
        {
            url: 'https://www.cryptopolitan.com/feed/',
            name: 'cryptopolitan'
        },
        {
            url: 'https://cryptopotato.com/feed/',
            name: 'cryptopotato'
        },
        {
            url: 'https://coincodecap.com/category/news/feed/gn',
            name: 'coincodecap'
        },
        {
            name: 'alexablockchain',
            url: 'https://alexablockchain.com/feed/'
        },
        {
            name: 'airdropalert',
            url: 'https://blogs.airdropalert.com/feed/'
        },
        {
            name: 'decrypt',
            url: 'https://decrypt.co/feed'
        },
        {
            name: 'ethereumworldnews',
            url: 'https://en.ethereumworldnews.com/feed/'
        },
        {
            name: 'blockchain',
            url: 'https://Blockchain.News/RSS?key=0HM0B8QFN3GEO'
        },
        {
            name: 'coinregwatch',
            url: 'https://coinregwatch.com/feed/'
        },
        {
            name: 'cryptoslate',
            url: 'https://cryptoslate.com/feed/'
        }
    ];
    public async read(): Promise<void> {
        const newsPromises = this.urls.map(async (feed) => this.parseFeed(feed.url, feed.name));
        try {
            const allNews = await Promise.all(newsPromises);
            const flattenedNews = allNews.flat();
            this.logger.log(`Send ${flattenedNews.length} news to kafka`);
        } catch (error) {
            this.logger.error(`Error in processing RSS Feeds: ${error.message}`);
        }
    }
}
