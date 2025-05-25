import { Progress, Text } from "@mantine/core";
import { getTransparentBg } from "../../utils/get-transparent-bg";
import { useCartContext } from "../../providers/cart-provider";
import { Tooltip } from "./tooltip";

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
          background: total ? "var(--app-highlight-gradient)" : "transparent",
        },
        label: {
          color: total ? undefined: "var(--mantine-color-dark-2)"
        }
      }}
    >
      <Progress.Section value={total ? (total * 100) / limit : 100}>
        <Tooltip label={<Text> {total} / {limit}</Text>} offset={8}>
          <Progress.Label>
            {total} / {limit}
          </Progress.Label>
        </Tooltip>
      </Progress.Section>
    </Progress.Root>
  );
};
