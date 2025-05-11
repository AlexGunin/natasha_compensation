import { Accordion, AccordionProps, Badge, Flex, Title } from "@mantine/core";
import { BenefitItem, BenefitScope } from "../../types/benefits";
import { ChevronDown } from "lucide-react";
import { CatalogGrid } from "./catalog-grid";
import { CatalogItem } from "./catalog-item";
import { SCOPE_TAG_NAME } from "../../constants/scope-tags";
import { useCartContext } from "../../providers/cart-provider";
import { Price } from "../price";

const accordionStyles: AccordionProps["styles"] = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 40,
  },
  content: {
    padding: 0,
    paddingBottom: 32,
  },
  control: {
    paddingInline: 0,
    marginBottom: 16,
  },
  chevron: {
    display: "flex",
    width: "fit-content",
  },
  icon: {
    width: 36,
  },
};

export interface ActiveAllPanelProps {
  items: [scope: BenefitScope, items: BenefitItem[]][];
  defaultValue?: BenefitScope[];
}

const DEFAULT_VALUE = ["self", "family"];

export const ActiveAllPanel = (props: ActiveAllPanelProps) => {
  const { getQuantity } = useCartContext();

  return (
    <Accordion
      multiple
      defaultValue={props.defaultValue ?? DEFAULT_VALUE}
      styles={accordionStyles}
      chevronPosition="left"
    >
      {props.items.map(([scope, benefits]) => {
        return (
          <Accordion.Item value={scope} key={scope}>
            <Accordion.Control
              chevron={<ChevronDown size={28} strokeWidth={2} />}
            >
              <Flex align="center" justify="space-between">
                <Title order={3} fw="normal">
                  {SCOPE_TAG_NAME[scope]}
                </Title>
                <Badge
                  size={"xl"}
                  variant="transparent"
                  color="var(--mantine-font-color)"
                >
                  <Price
                    value={benefits.reduce(
                      (acc, cur) => acc + cur.price * getQuantity(cur.id),
                      0,
                    )}
                  />
                </Badge>
              </Flex>
            </Accordion.Control>
            <Accordion.Panel>
              <CatalogGrid>
                {benefits.map((item) => (
                  <CatalogItem key={item.id} {...item} />
                ))}
              </CatalogGrid>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};
