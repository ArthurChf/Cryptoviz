import { RouteEnum } from '@/enums/RouteEnum';
import Dashboard from '@/views/Dashboard.vue';
import News from '@/views/News.vue';

export const mainRoutes = [
    {
        component: Dashboard,
        path: RouteEnum.DASHBOARD
    },
    {
        component: News,
        path: RouteEnum.NEWS
    }
];
