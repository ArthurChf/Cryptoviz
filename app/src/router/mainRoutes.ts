import { RouteEnum } from '@enums/RouteEnum';
import DefaultLayout from '@layouts/DefaultLayout.vue';
import Dashboard from '@views/Dashboard.vue';

export const mainRoutes = [
    {
        component: Dashboard,
        meta: {
            layout: DefaultLayout
        },
        name: 'dashboard',
        path: RouteEnum.DASHBOARD
    }
];
