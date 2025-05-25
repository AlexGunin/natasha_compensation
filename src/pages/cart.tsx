import { Stack, Button, Badge } from "@mantine/core";
import { useRouter } from "@tanstack/react-router";
import {
  ActiveAllPanel,
  ActiveAllPanelProps,
} from "../components/catalogs/active-all-panel.tsx";
import { useCatalogContext } from "../providers/catalog-provider.tsx";
import { useCartContext } from "../providers/cart-provider.tsx";
import { Price } from "../components/shared/price.tsx";
import { BenefitScope } from "../types/benefits.ts";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api/api.ts";
import { toast } from "react-toastify";
import { useOnboarding } from "../providers/onboarding-provider.tsx";

const DEFAULT_OPENED_SCOPE: BenefitScope[] = [];
const DEFAULT_ONBOARDING_OPENED_SCOPE: BenefitScope[] = [BenefitScope.SELF,BenefitScope.FAMILY];

const BTN_STYLES = {
  root: {
    minWidth: "fit-content",
    maxWidth: 400,
    margin: "0 auto",
    background: "var(--app-highlight-gradient)",
  },
  label: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
} as const;

export default function CartPage() {
  const {isActive} = useOnboarding()
  const { dataByScope } = useCatalogContext();
  const { added, total, list } = useCartContext();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: api.orders.create,
    onSuccess: () => {
      router.navigate({ to: "/finish" });
    },
    onError: (err) => {
      toast(`Ошибка при создании заказа: ${err.message}`, { type: "error" });
    },
  });

  return (
    <Stack gap="xl">
      <div data-onboarding="cart-items">
        <ActiveAllPanel
          defaultValue={isActive ? DEFAULT_ONBOARDING_OPENED_SCOPE : DEFAULT_OPENED_SCOPE}
          items={
            Object.entries(dataByScope).map(([key, value]) => [
              key,
              value.filter((item) => added.has(item.id)),
            ]) as ActiveAllPanelProps["items"]
          }
        />
      </div>

      <Button
        data-onboarding="finish-button"
        onClick={() => mutation.mutate(list)}
        variant="gradient"
        size="xl"
        styles={BTN_STYLES}
        radius="xl"
        loading={mutation.isPending}
        disabled={isActive}
        style={{
          color: isActive ? "unset": "initial",
          opacity: isActive ? 0.5 : 1,
        }}
      >
        Оформить
        <Badge
          size={"xl"}
          variant="transparent"
          color="var(--mantine-font-color)"
        >
          <Price value={total} />
        </Badge>
      </Button>
    </Stack>
  );
}
