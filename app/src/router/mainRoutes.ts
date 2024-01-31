import { RouteEnum } from '@/enums/RouteEnum';

export const mainRoutes = [
    {
        component: async () => import('@/views/Dashboard.vue'),
        path: RouteEnum.DASHBOARD
    }
];
