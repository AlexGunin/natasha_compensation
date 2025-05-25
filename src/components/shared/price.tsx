import { NumberFormatter } from "@mantine/core";

interface PriceProps {
  value: number;
}

export const Price = (props: PriceProps) => {
  return (
    <NumberFormatter value={props.value} thousandSeparator=" " suffix=" ₽" />
  );
};
