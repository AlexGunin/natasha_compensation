import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  BenefitId,
  BenefitItem,
  BenefitScope,
  BenefitScopeTag,
} from "../types/benefits.ts";
import { UseQueryResult } from "@tanstack/react-query";
import { useBenefitsQuery } from "../queries/benefits-query.ts";

interface ICatalogContext {
  dataByScope: Record<BenefitScope, BenefitItem[]>;
  scopeTags: BenefitScopeTag[];
  data: BenefitItem[];
  markedToDelete: Set<BenefitId>;
  markToDelete: (id: BenefitId) => void;
  unmarkToDelete: (id: BenefitId) => void;
  status: UseQueryResult["status"];
}

const CatalogContext = createContext<ICatalogContext | null>(null);

const DEFAULT_DATA: BenefitItem[] = [];

export const CatalogProvider = (props: PropsWithChildren) => {
  const { data = DEFAULT_DATA, status } = useBenefitsQuery();

  const [markedToDelete, setMarkedToDelete] = useState<Set<BenefitId>>(
    () => new Set(),
  );

  const unmarkToDelete = (id: BenefitId) => {
    const newSet = new Set(markedToDelete);

    newSet.delete(id);

    setMarkedToDelete(newSet);
  };

  const markToDelete = (id: BenefitId) => {
    const newSet = new Set(markedToDelete);

    newSet.add(id);

    setMarkedToDelete(newSet);
  };

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
    <CatalogContext.Provider
      value={{
        dataByScope,
        scopeTags,
        data,
        markToDelete,
        unmarkToDelete,
        markedToDelete,
        status,
      }}
    >
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
