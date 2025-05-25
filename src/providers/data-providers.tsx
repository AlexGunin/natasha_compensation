import { PropsWithChildren } from "react";
import { CartProvider } from "./cart-provider";
import { CatalogProvider } from "./catalog-provider";
import { OnboardingProvider } from "./onboarding-provider";
import { UserProvider } from "./user-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const DataProviders = (props: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CatalogProvider>
          <CartProvider>
            <OnboardingProvider>{props.children}</OnboardingProvider>
          </CartProvider>
        </CatalogProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};
