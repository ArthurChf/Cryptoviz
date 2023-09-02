import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import * as Parser from 'rss-parser';
import * as fs from 'fs';

type CustomFeed = { foo: string };
type CustomItem = { bar: number };
@Injectable()
export class RssFeedService {

    constructor(private readonly httpService: HttpService) { }

    urls: { [key: string]: string }[] = [
        {
            name: 'coindesk',
            url: 'https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml'
        },
        {
            name: 'cointelegraph',
            url: 'https://cointelegraph.com/rss'
        },
        {
            name: 'cryptonews',
            url: 'https://cryptonews.com/news/feed'
        },
        {
            name: 'cryptopotato',
            url: 'https://cryptopotato.com/feed/'
        },
        {
            name: 'newsbtc',
            url: 'https://www.newsbtc.com/feed/'
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
        const titles: any[] = [];
        const promises = this.urls.map(async (data) => {
            const feed = await parser.parseURL(data.url);
            feed.items.forEach(item => {
                titles.push({
                    title: item.title,
                    url: item.link,
                    source: data.name,
                    resume: item.contentSnippet,
                    pubDate: item.creator,
                });
            });
        });
        await Promise.all(promises);
        return titles;
    }

}