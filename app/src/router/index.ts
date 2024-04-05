import { mainRoutes } from '@/router/mainRoutes';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory('/Cryptoviz/demo'),
    routes: [
        ...mainRoutes,
        { path: '/:pathMatch(.*)', redirect: '/' }
    ]
});

export default router;
