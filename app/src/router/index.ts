import { mainRoutes } from '@/router/mainRoutes';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory('/Cryptoviz/demo/'),
    routes: [
        ...mainRoutes,
        { path: '/:pathMatch(.*)', redirect: '/' }
    ]
});

export default router;
