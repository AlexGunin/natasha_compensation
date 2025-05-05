// routes.tsx
import {createHashHistory, createRootRoute, createRoute, createRouter} from '@tanstack/react-router';
import { lazy } from 'react';
import {Layout} from "./pages/layout.tsx";

const rootRoute = createRootRoute({
    component: Layout,
});


const catalogRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: lazy(() => import('./pages/catalog.tsx')),
});

const cartRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/cart',
    component: lazy(() => import('./pages/cart.tsx')),
});

const finishRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/finish',
    component: lazy(() => import('./pages/finish.tsx')),
});

const routeTree = rootRoute.addChildren([catalogRoute, cartRoute, finishRoute]);

export const router = createRouter({
    routeTree,
    basepath: '/',
    history: createHashHistory()
});
