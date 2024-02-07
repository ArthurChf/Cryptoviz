import { RouteEnum } from '@/enums/RouteEnum';
import Dashboard from '@/views/Dashboard.vue';
import Market from '@/views/Market.vue';
import News from '@/views/News.vue';

export const mainRoutes = [
    {
        component: Dashboard,
        path: RouteEnum.DASHBOARD
    },
    {
        component: Market,
        path: RouteEnum.MARKET
    },
    {
        component: News,
        path: RouteEnum.NEWS
    }
];
