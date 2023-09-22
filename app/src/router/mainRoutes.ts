import { RouteEnum } from '@enums/RouteEnum';
import Dashboard from '@views/Dashboard.vue';

export const mainRoutes = [
    {
        component: Dashboard,
        name: 'dashboard',
        path: RouteEnum.DASHBOARD
    }
];
