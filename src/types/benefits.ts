export enum BenefitScope {
  SELF = "self",
  FAMILY = "family",
}

export type BenefitScopeTag = BenefitScope | "all";

export type BenefitId = number;

export interface BenefitItem {
  id: BenefitId;
  name: string;
  description?: string;
  price: number;
  max_usage: number | null;
  scope: BenefitScope;
}
