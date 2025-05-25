import {
  ActionIcon,
  Button,
  Card,
  Flex,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { Plus, Minus } from "lucide-react";
import { BenefitItem } from "../../types/benefits";
import { PriceBadge } from "../shared/price-badge";
import { useCartContext } from "../../providers/cart-provider";
import { Swap } from "../shared/swap";
import { getTransparentBg } from "../../utils/get-transparent-bg";
import { useCatalogContext } from "../../providers/catalog-provider";
import { useCardContextMenu } from "./hooks/use-card-context-menu";
import { Tooltip } from "../shared/tooltip";

const SWAP_ITEM_STYLE = {
  marginTop: "auto",
} as const;

export const CatalogItem = (props: BenefitItem) => {
  const { added, add, remove, getQuantity, checkCanAdd } = useCartContext();
  const { markedToDelete } = useCatalogContext();

  const onContextMenu = useCardContextMenu(props);

  const isAdded = added.has(props.id);
  const quantity = getQuantity(props.id);
  const canAdd = checkCanAdd(props);

  return (
    <Card
      shadow={isAdded ? "xl" : "sm"}
      padding="lg"
      radius="md"
      withBorder
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        boxShadow: isAdded
          ? `0px 0px 8px 2px ${getTransparentBg(
              "var(--mantine-color-blue-filled)",
              30
            )}`
          : undefined,
        opacity: markedToDelete.has(props.id) ? 0.2 : 1,
      }}
      onContextMenu={onContextMenu}
    >
      <Group justify="space-between">
        <Title order={3} fw={500}>
          {props.name}
        </Title>
        <PriceBadge value={props.price} />
      </Group>

      {props.description ? (
        <Text size="lg" c="dimmed" mb="md">
          {props.description}
        </Text>
      ) : null}

      <Swap
        isActiveFirst={isAdded}
        first={
          <Flex gap="md" align="center" justify="center">
            <ActionIcon
              onClick={() => remove(props)}
              size="xl"
              flex={1}
              radius="md"
              variant="light"
              color={quantity === 1 ? "red" : undefined}
            >
              <Minus />
            </ActionIcon>
            <Text size="xl" miw={50} ta="center">
              {quantity}
            </Text>
            <Tooltip label={canAdd.value ? null : canAdd.reason}>
              <ActionIcon
                disabled={!canAdd.value}
                onClick={() => add(props)}
                size="xl"
                variant="light"
                flex={1}
                radius="md"
                data-onboarding="benefit-add"
              >
                <Plus />
              </ActionIcon>
            </Tooltip>
          </Flex>
        }
        second={
          <Tooltip label={canAdd.value ? null : canAdd.reason}>
            <Button
              color="blue"
              size="md"
              fullWidth
              radius="md"
              variant="light"
              disabled={!canAdd.value}
              onClick={() => add(props)}
              data-onboarding="benefit-add"
            >
              Добавить
            </Button>
          </Tooltip>
        }
        styles={{
          first: SWAP_ITEM_STYLE,
          second: SWAP_ITEM_STYLE,
        }}
      ></Swap>
    </Card>
  );
};
