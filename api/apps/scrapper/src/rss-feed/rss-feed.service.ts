import { Injectable, Logger } from '@nestjs/common';
import Parser from 'rss-parser';
import { RSSNews, newsMapper } from '@libs/entities/src';

interface CustomFeed { foo: string }
interface CustomItem { bar: number }
@Injectable()
export class RssFeedService {
    constructor() { }

    private readonly logger = new Logger(RssFeedService.name);

    urls: { name: string; url: string }[] = [
        {
            name: 'coindesk',
            url: 'https://www.coindesk.com/arc/outboundfeeds/rss'
        },
        {
            name: 'cointelegraph',
            url: 'https://cointelegraph.com/rss'
        },
        {
            name: 'fxempire',
            url: 'https://www.fxempire.com/api/v1/en/articles/rss/news'
        },
        {
            name: 'cryptoslate',
            url: 'https://cryptoslate.com/feed/'
        },
        {
            name: 'cryptopotato',
            url: 'https://cryptopotato.com/feed/'
        },
        {
            name: 'cryptobriefing',
            url: 'https://cryptobriefing.com/feed/'
        },
        {
            name: 'newsbtc',
            url: 'https://www.newsbtc.com/feed/'
        },
        {
            name: 'bitcoinist',
            url: 'https://bitcoinist.com/feed/'
        },
        {
            name: 'bitcoinmagazine',
            url: 'https://bitcoinmagazine.com/feed/'
        },
        {
            name: 'bitcoin',
            url: 'https://bitcoin.org/en/rss/blog.xml'
        }
    ];
    async read(): Promise<number> {
        // @ts-ignore
        const parser: Parser<CustomFeed, CustomItem> = new Parser({
            customFields: {
                feed: ['foo'],
                item: ['bar']
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
            }
        });

        const news: RSSNews[] = [];
        for (const data of this.urls) {
            try {
                this.logger.log(`Reading RSS feed from ${data.name}`);
                const feed = await parser.parseURL(data.url);
                feed.items.map((item) => {
                    news.push(newsMapper(item, data.name));
                });
            } catch (error) {
                this.logger.error(`Error reading RSS feed from ${data.name} at URL ${data.url}: ${error.message}`);
            }
            await new Promise(resolve => {
                setTimeout(resolve, 6000);
            });
        }
        this.logger.log(`Send ${news.length} news to kafka`);
        return 1;
    }
}
