export interface RSSNewsDto {
    title: string;
    link: string;
    isoDate: string;
    contentSnippet: string;
    creator: string;
    source: string;
    content: string;
    guid: string;
    pubDate: string;
    categories: string[];
}

export interface RSSNews {
    title: string;
    link: string;
    createdAt: string;
    content: string;
    author: string;
    source: string;
    contentSnippet: string;
    guid: string;
    pubDate: string;
    categories: string[];
}

export function newsMapper(item: RSSNewsDto, source: string): RSSNews {
    return {
        title: item.title,
        link: item.link,
        createdAt: item.isoDate,
        author: item.creator,
        source,
        content: item.content,
        guid: item.guid,
        pubDate: item.pubDate,
        categories: item.categories,
        contentSnippet: item.contentSnippet
    };
}
