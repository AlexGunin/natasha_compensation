import {
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { lazy } from "react";
import { Layout } from "./pages/layout.tsx";
import { authService } from "./services/auth-service.ts";

const rootRoute = createRootRoute({
  component: Layout,
  beforeLoad: async ({ navigate }) => {
    const user = await authService.getMe();

    if (!user) {
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

const instructionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazy(() => import("./pages/instruction.tsx")),
  // beforeLoad: protectedBeforeLoad,
});

const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/catalog",
  component: lazy(() => import("./pages/catalog.tsx")),
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: lazy(() => import("./pages/cart.tsx")),
});

const finishRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/finish",
  component: lazy(() => import("./pages/finish.tsx")),
});

const routeTree = rootRoute.addChildren([
  signInRoute,
  signUpRoute,
  instructionRoute,
  catalogRoute,
  cartRoute,
  finishRoute,
]);

export const router = createRouter({
  routeTree,
  basepath: "/natasha_compensation",
  history: createHashHistory(),
});
