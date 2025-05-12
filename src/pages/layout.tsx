import { Outlet } from "@tanstack/react-router";
import { Stack, useMantineColorScheme } from "@mantine/core";
import { PriceProgress } from "../components/progress.tsx";
import { DockBar } from "../components/dock-bar.tsx";
import classes from "./layout.module.css";
import { IfUser } from "../components/if-user.tsx";
import { GlobalAuthListener } from "../components/global-auth-listener.tsx";
import { ToastContainer } from "react-toastify";

export const Layout = () => {
  const theme = useMantineColorScheme();

  return (
    <Stack gap="md" align="center" w="100%">
      <GlobalAuthListener />
      <div className={classes["outlet-container"]}>
        <Outlet />
        <ToastContainer theme={theme.colorScheme} autoClose={3000} />
      </div>
      <Stack gap="md" justify="center" className={classes["float-bottom"]}>
        <IfUser>
          <PriceProgress />
        </IfUser>
        <DockBar />
      </Stack>
    </Stack>
  );
};
