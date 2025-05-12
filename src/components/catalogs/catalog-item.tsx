import {
  ActionIcon,
  Button,
  Card,
  Flex,
  Group,
  Text,
  Tooltip as MantineTooltip,
  TooltipProps,
  Title,
} from "@mantine/core";
import { Plus, Minus } from "lucide-react";
import { BenefitItem } from "../../types/benefits";
import { PriceBadge } from "../price-badge";
import { useCartContext } from "../../providers/cart-provider";
import { Swap } from "../swap";
import { getTransparentBg } from "../../utils/get-transparent-bg";
import { CatalogItemActions } from "./catalog-item-actions";
import { useCatalogContext } from "../../providers/catalog-provider";
import { useUserContext } from "../../providers/user-provider";
import { UserRole } from "../../types/users";

const Tooltip = (props: TooltipProps) => {
  if (!props.label) {
    return props.children;
  }

  return <MantineTooltip color="gray" offset={4} {...props} />;
};

const SWAP_ITEM_STYLE = {
  marginTop: "auto",
} as const;

const EVENTS_FOR_TOOLTIP = { hover: true, focus: true, touch: true } as const;

export const CatalogItem = (props: BenefitItem) => {
  const { added, add, remove, getQuantity, checkCanAdd } = useCartContext();
  const { markedToDelete } = useCatalogContext();
  const user = useUserContext();

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
          ? `0px 0px 8px 2px ${getTransparentBg("var(--mantine-color-blue-filled)", 30)}`
          : undefined,
        opacity: markedToDelete.has(props.id) ? 0.2 : 1,
      }}
    >
      <Group justify="space-between">
        <Title order={3} fw={500}>
          {props.name}
        </Title>
        <Flex gap="xs" align="center">
          <PriceBadge value={props.price} />
          {user?.role === UserRole.ADMIN && <CatalogItemActions item={props} />}
        </Flex>
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
            <Tooltip
              label={canAdd.value ? null : canAdd.reason}
              events={EVENTS_FOR_TOOLTIP}
            >
              <ActionIcon
                disabled={!canAdd.value}
                onClick={() => add(props)}
                size="xl"
                variant="light"
                flex={1}
                radius="md"
              >
                <Plus />
              </ActionIcon>
            </Tooltip>
          </Flex>
        }
        second={
          <Tooltip
            label={canAdd.value ? null : canAdd.reason}
            events={EVENTS_FOR_TOOLTIP}
          >
            <Button
              color="blue"
              size="md"
              fullWidth
              radius="md"
              variant="light"
              disabled={!canAdd.value}
              onClick={() => add(props)}
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
