import {
  BenefitItem,
  BenefitScope,
  BenefitScopeTag,
} from "../../types/benefits";
import { CatalogGrid } from "./catalog-grid";
import { CatalogItem } from "./catalog-item";
import { ActiveAllPanel, ActiveAllPanelProps } from "./active-all-panel";
import { useCatalogContext } from "../../providers/catalog-provider";
import { FloatingTabs } from "../floating-tabs";
import { SCOPE_TAG_NAME } from "../../constants/scope-tags";
import { getTransparentBg } from "../../utils/get-transparent-bg";
import { useMemo } from "react";

const DEFAULT_ITEMS: BenefitItem[] = [];

const getItems = (
  dataByScope: Record<BenefitScope, BenefitItem[]>,
  scope: BenefitScope,
) => dataByScope[scope] ?? DEFAULT_ITEMS;

const styles = {
  list: {
    position: "sticky",
    top: 0,
    padding: "0.5rem 0",
    zIndex: 2,
    backgroundColor: getTransparentBg("var(--mantine-color-body)"),
  },
} as const;

export const CatalogList = () => {
  const { scopeTags, dataByScope } = useCatalogContext();

  const tabs = useMemo(
    () =>
      scopeTags.map((item) => ({
        value: item,
        title: SCOPE_TAG_NAME[item],
      })),
    [scopeTags],
  );

  return (
    <FloatingTabs<BenefitScopeTag>
      defaultValue={BenefitScope.SELF}
      tabs={tabs}
      styles={styles}
      withTransition={true}
    >
      {(activeTag) =>
        activeTag === "all" ? (
          <ActiveAllPanel
            items={Object.entries(dataByScope) as ActiveAllPanelProps["items"]}
          />
        ) : (
          <CatalogGrid>
            {getItems(dataByScope, activeTag).map((item) => (
              <CatalogItem {...item} key={item.id} />
            ))}
          </CatalogGrid>
        )
      }
    </FloatingTabs>
  );
};
