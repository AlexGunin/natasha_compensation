import { createTheme, MantineProvider } from "@mantine/core";
import { PropsWithChildren } from "react";

const theme = createTheme({
  components: {
    Button: {
      styles: {
        root: {
          "--button-height-md": "calc(2.75rem * var(--mantine-scale))",
        },
      },
    },
    Progress: {
      styles: {
        root: {
          "--progress-size-xl": "calc(1.5rem* var(--mantine-scale))",
        },
        section: {
          transitionDuration: "400ms",
        },
      },
    },
  },
} as const);

export const ThemeProvider = (props: PropsWithChildren) => (
  <MantineProvider theme={theme}>{props.children}</MantineProvider>
);
