import { useMatch, useRouter } from "@tanstack/react-router";
import { FloatingTabs } from "./floating-tabs";
import { viewTransition } from "../utils/view-transition";
import { NavigationItem } from "../types/navigation";

const styles = {
  root: {
    flex: 1,
  },
} as const;

interface NavigationProps {
  items: NavigationItem[];
}

export const Navigation = (props: NavigationProps) => {
  const { state, navigate } = useRouter();
  useMatch({ to: "/" });

  const activeTab = state.location.pathname.replace(
    "/natasha_compensation",
    "",
  );

  return (
    <FloatingTabs<string>
      activeTab={activeTab}
      defaultValue="/"
      tabs={props.items.map((item) => ({
        value: item.to,
        title: item.title,
        onClick: () =>
          viewTransition(() => {
            navigate({ to: item.to });
          }),
      }))}
      styles={styles}
    />
  );
};
