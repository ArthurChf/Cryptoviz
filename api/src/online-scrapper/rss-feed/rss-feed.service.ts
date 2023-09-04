import { Injectable, Logger } from "@nestjs/common";
import * as Parser from 'rss-parser';
import { RSSNews } from "@app/entities";

type CustomFeed = { foo: string };
type CustomItem = { bar: number };
@Injectable()
export class RssFeedService {

    constructor() { }

    private readonly logger = new Logger(RssFeedService.name);

    urls: { name: string, url: string }[] = [
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
        },
    ];
    async read() {
        const parser: Parser<CustomFeed, CustomItem> = new Parser({
            customFields: {
                feed: ['foo',],
                item: ['bar']
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
            }
        });

        // Stockez les articles existants dans un set pour une vérification rapide
        const existingArticles = new Set(
            await RSSNews.createQueryBuilder('news')
                .select(['news.title', 'news.pubDate'])
                .getMany()
                .then(news => news.map(n => `${n.title}|${n.pubDate}`))
        );

        const news: Partial<RSSNews>[] = [];

        for (const data of this.urls) {
            try {
                this.logger.log(`Reading RSS feed from ${data.name}`);
                const feed = await parser.parseURL(data.url);

                for (const item of feed.items) {
                    const uniqueIdentifier = `${item.title}|${item.pubDate}`;
                    if (!existingArticles.has(uniqueIdentifier)) {
                        news.push({
                            title: item.title,
                            link: item.link,
                            source: data.name,
                            resume: item.contentSnippet,
                            creator: item.creator,
                            pubDate: item.pubDate,
                        });
                        existingArticles.add(uniqueIdentifier); // Ajoutez-le pour éviter de le reconsidérer lors du prochain cycle
                    }
                }
            } catch (error) {
                this.logger.error(`Error reading RSS feed from ${data.name} at URL ${data.url}: ${error.message}`);
            }

            await new Promise(resolve => setTimeout(resolve, 6000));
        }

        this.logger.log(`Writing ${news.length} news to database`);
        if (news.length > 0) {
            await RSSNews.createQueryBuilder('news').insert().into(RSSNews).values(news).execute();
        }
        this.logger.log(`Wrote ${news.length} news to database`);
        return 1;
    }
}