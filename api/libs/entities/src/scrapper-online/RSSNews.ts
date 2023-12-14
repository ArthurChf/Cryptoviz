export interface RSSNews {
    title: string;
    link: string;
    pubDate: string;
    resume: string;
    creator: string;
    source: string;
}

export function newsMapper(item: unknown, source: string): RSSNews {
    return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        resume: item.contentSnippet,
        creator: item.creator,
        source
    };
}
