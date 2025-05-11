import { Progress } from "@mantine/core";
import { getTransparentBg } from "../utils/get-transparent-bg";
import { useCartContext } from "../providers/cart-provider";

export const PriceProgress = () => {
  const { total, limit } = useCartContext();

  return (
    <Progress.Root
      size="xl"
      transitionDuration={300}
      radius="xl"
      color={getTransparentBg("var(--mantine-color-blue-filled)", 75)}
      variant="gradient"
      styles={{
        section: {
          background: "var(--app-highlight-gradient)",
        },
      }}
    >
      <Progress.Section value={(total * 100) / limit}>
        <Progress.Label>
          {total} / {limit}
        </Progress.Label>
      </Progress.Section>
    </Progress.Root>
  );
};
