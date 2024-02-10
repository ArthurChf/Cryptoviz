import type { HttpRouteEnum } from '@/enums/HttpRouteEnum';

export interface HttpOptions {
    routeName: HttpRouteEnum;
    queryParams: Record<string, string>;
}
