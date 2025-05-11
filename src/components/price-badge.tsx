import { Badge, MantineSize } from "@mantine/core";
import { Price } from "./price";

interface PriceBadgeProps {
  value: number;
  size?: MantineSize;
}

const styles = {
  root: {
    background: "var(--app-highlight-gradient)",
  },
} as const;

export const PriceBadge = (props: PriceBadgeProps) => {
  return (
    <Badge size={props.size ?? "xl"} variant="gradient" styles={styles}>
      <Price value={props.value} />
    </Badge>
  );
};
