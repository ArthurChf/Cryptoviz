import * as Parser from "rss-parser";

export class RssFeedModel {

    url: string;

    constructor(_url: string) {
        this.url = _url;
    }

    async read() {
        const parser = new Parser();
        try {
            const feed = await parser.parseURL(this.url);
            console.log(feed.title);
            feed.items.forEach(item => {
                console.log(item);
            });
            return `Reading RSS feed from ${this.url}`;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to read RSS feed');
        }
    }

}