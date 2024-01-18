export interface RSSNewsDto {
    title: string;
    link: string;
    isoDate: string;
    contentSnippet: string;
    creator: string;
    source: string;
    content: string;
}

export interface RSSNews {
    title: string;
    link: string;
    isoDate: string;
    content: string;
    creator: string;
    source: string;
}

export function newsMapper(item: RSSNewsDto, source: string): RSSNews {
    return {
        title: item.title,
        link: item.link,
        isoDate: item.isoDate,
        creator: item.creator,
        source,
        content: item.content
    };
}
