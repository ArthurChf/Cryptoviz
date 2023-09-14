import { mainRoutes } from '@router/mainRoutes';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        ...mainRoutes,
        { path: '/:pathMatch(.*)', redirect: '/' }
    ]
});

export default router;
