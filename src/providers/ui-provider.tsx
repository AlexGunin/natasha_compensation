import { ThemeProvider } from "./theme-provider.tsx";
import { DrawerProvider } from "./drawer-provider.tsx";
import { PropsWithChildren } from "react";
import { ContextMenuProvider } from "mantine-contextmenu";

export const UiProviders = (props: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <ContextMenuProvider>
        <DrawerProvider>{props.children}</DrawerProvider>
      </ContextMenuProvider>
    </ThemeProvider>
  );
};
