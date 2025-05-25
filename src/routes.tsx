import {
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { lazy } from "react";
import { LayoutWithProviders } from "./pages/layout.tsx";
import { authService } from "./services/auth-service.ts";

const rootRoute = createRootRoute({
  component: LayoutWithProviders,
  beforeLoad: async ({ navigate, location }) => {
    const user = authService.getMe();
    const isAuthPage = location.pathname.includes('/sign-in') || location.pathname.includes('/sign-up');

    if (!user && !isAuthPage) {
      navigate({ to: "/sign-in" });
    }
  },
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-in",
  component: lazy(() => import("./pages/sign-in.tsx")),
});

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-up",
  component: lazy(() => import("./pages/sign-up.tsx")),
});

// const instructionRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: "/",
//   component: lazy(() => import("./pages/instruction.tsx")),
// });

const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  // path: "/catalog",
  path: "/",
  component: lazy(() => import("./pages/catalog.tsx")),
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: lazy(() => import("./pages/cart.tsx")),
});

const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/users",
  component: lazy(() => import("./pages/users.tsx")),
  beforeLoad: async () => {
    const user = authService.getMe();
    if (!user || !authService.isAdmin) {
      return Promise.reject();
    }
  },
});

const finishRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/finish",
  component: lazy(() => import("./pages/finish.tsx")),
});

const routeTree = rootRoute.addChildren([
  signInRoute,
  signUpRoute,
  // instructionRoute,
  catalogRoute,
  cartRoute,
  usersRoute,
  finishRoute,
]);

export const router = createRouter({
  routeTree,
  basepath: "/natasha_compensation",
  history: createHashHistory(),
});
