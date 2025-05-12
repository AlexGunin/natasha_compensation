import "./App.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes.tsx";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CatalogProvider } from "./providers/catalog-provider.tsx";
import { CartProvider } from "./providers/cart-provider.tsx";
import { UserProvider } from "./providers/user-provider.tsx";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { DrawerProvider } from "./providers/drawer-provider.tsx";

const queryClient = new QueryClient();

const DataProviders = (props: PropsWithChildren) => {
  return (
    <UserProvider>
      <CatalogProvider>
        <CartProvider>{props.children}</CartProvider>
      </CatalogProvider>
    </UserProvider>
  );
};

const UiProviders = (props: PropsWithChildren) => {
  return <DrawerProvider>{props.children}</DrawerProvider>;
};

export const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <DataProviders>
          <UiProviders>
            <RouterProvider router={router} />
          </UiProviders>
        </DataProviders>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
