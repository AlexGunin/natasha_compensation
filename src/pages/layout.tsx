import { Outlet } from "@tanstack/react-router";
import {Stack, useMantineColorScheme } from "@mantine/core";
import { PriceProgress } from "../components/shared/progress.tsx";
import { DockBar } from "../components/navigation/dock-bar.tsx";
import classes from "./layout.module.css";
import { IfUser } from "../components/auth/if-user.tsx";
import { ToastContainer } from "react-toastify";
import { OnboardingOverlay } from "../components/onboarding/onboarding-overlay.tsx";
import { OnboardingTest } from "../components/onboarding/onboarding-test.tsx";
import { useAutoOnboarding } from "../hooks/use-auto-onboarding.ts";
import { UiProviders } from "../providers/ui-provider.tsx";
import { DataProviders } from "../providers/data-providers.tsx";

export const Layout = () => {
  const theme = useMantineColorScheme();
  
  useAutoOnboarding();

  return (
    <Stack gap="md" align="center" w="100%" data-onboarding="init">
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
      
      <OnboardingOverlay />
      
      <OnboardingTest />
    </Stack>
  );
};

export const LayoutWithProviders = () => {
  return <DataProviders>
    <UiProviders>
      <Layout/>
    </UiProviders>
  </DataProviders>
}