import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import {
  BenefitItem,
  BenefitScope,
  BenefitScopeTag,
} from "../types/benefits.ts";
import { api } from "../api/api.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface ICatalogContext {
  dataByScope: Record<BenefitScope, BenefitItem[]>;
  scopeTags: BenefitScopeTag[];
  data: BenefitItem[];
  status: UseQueryResult["status"];
}

const CatalogContext = createContext<ICatalogContext | null>(null);

const DEFAULT_DATA: BenefitItem[] = [];

export const CatalogProvider = (props: PropsWithChildren) => {
  const { data = DEFAULT_DATA, status } = useQuery({
    queryKey: ["benefits"],
    queryFn: api.benefits.get,
    gcTime: 1000 * 60 * 10,
    retry: 3,
    retryDelay: 3000,
  });

  const dataByScope = useMemo(() => {
    return data.reduce(
      (acc, cur) => {
        if (acc[cur.scope]) {
          acc[cur.scope].push(cur);
        } else {
          acc[cur.scope] = [cur];
        }

        return acc;
      },
      {} as Record<BenefitScope, BenefitItem[]>,
    );
  }, [data]);

  const scopeTags = useMemo(() => {
    const set = new Set<BenefitScopeTag>(data.map((item) => item.scope));

    set.add("all");

    return [...set];
  }, [data]);

  return (
    <CatalogContext.Provider value={{ dataByScope, scopeTags, data, status }}>
      {props.children}
    </CatalogContext.Provider>
  );
};

export const useCatalogContext = () => {
  const context = useContext(CatalogContext);

  if (!context) {
    throw new Error(
      "You should use hook useCatalogProvider inside CatalogProvider ",
    );
  }

  return context;
};
