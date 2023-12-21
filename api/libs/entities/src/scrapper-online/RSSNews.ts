export interface RSSNewsDto {
    title: string;
    link: string;
    pubDate: string;
    contentSnippet: string;
    creator: string;
    source: string;
}

export interface RSSNews {
    title: string;
    link: string;
    pubDate: string;
    resume: string;
    creator: string;
    source: string;
}

export function newsMapper(item: RSSNewsDto, source: string): RSSNews {
    return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        resume: item.contentSnippet,
        creator: item.creator,
        source
    };
}
