import { ThemeProvider } from "./theme-provider.tsx";
import { DrawerProvider } from "./drawer-provider.tsx";
import { PropsWithChildren } from "react";

export const UiProviders = (props: PropsWithChildren) => {
    return (
      <ThemeProvider>
        <DrawerProvider>
          {props.children}
        </DrawerProvider>
      </ThemeProvider>
    );
  };
  