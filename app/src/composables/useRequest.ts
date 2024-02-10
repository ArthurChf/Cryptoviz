import type { HttpRouteEnum } from '@/enums/HttpRouteEnum';

export const useRequest = async <T>(url: HttpRouteEnum, options: RequestInit & { query?: Record<string, string> } = {}): Promise<T> => {
    try {
        const { query, ...baseOptions } = options;
        const path = new URL(`http://localhost:3000${url}`);
        path.search = new URLSearchParams(options.query).toString();

        const response = await fetch(path.href, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            ...baseOptions
        });
        const data = (await response.json()).data;
        if (response.status >= 400) throw new Error(`HTTP Request error`);
        return data as T;
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
        throw new Error('');
    }
};
