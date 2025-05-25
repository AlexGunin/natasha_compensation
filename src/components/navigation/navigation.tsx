import { useRouter } from "@tanstack/react-router";
import { FloatingTabs } from "../floating-tabs/floating-tabs";
import { viewTransition } from "../../utils/view-transition";
import { NavigationItem } from "../../types/navigation";
import { useActiveRoute } from "../../hooks/use-active-route";
import { useOnboarding } from "../../providers/onboarding-provider";

const styles = {
  root: {
    flex: 1,
  },
} as const;

interface NavigationProps {
  items: NavigationItem[];
}

export const Navigation = (props: NavigationProps) => {
  const router = useRouter();
  const activeRoute = useActiveRoute();
  const { isActive, getCurrentStep, nextStep } = useOnboarding();
  
  return (
    <FloatingTabs<string>
      activeTab={activeRoute}
      defaultValue="/"
      tabs={props.items.map((item) => ({
        value: item.to,
        title: item.title,
        onClick: () => {
          console.log('Navigation tab clicked:', item.to, 'isActive:', isActive);
          
          viewTransition(() => {
            router.navigate({ to: item.to });
          });
          
          // Если это онбординг и клик по корзине
          if (isActive && item.to === '/cart') {
            const currentStep = getCurrentStep();
            console.log('Cart navigation - current step:', currentStep?.id, 'target:', currentStep?.target);
            
            if (currentStep?.target.includes('cart-tab')) {
              console.log('Cart onboarding step matched, proceeding to next step');
              setTimeout(() => {
                nextStep();
              }, 800);
            }
          }
        },
        'data-onboarding': item.to === '/cart' ? 'cart-tab' : undefined,
      }))}
      styles={styles}
    />
  );
};
