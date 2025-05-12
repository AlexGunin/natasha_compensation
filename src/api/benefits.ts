import { BenefitId, BenefitItem } from "../types/benefits";
import { HttpClient } from "./client/types";

export class BenefitsApi {
  constructor(private client: HttpClient) {}

  get = async () => {
    return this.client.get<BenefitItem[]>("benefits");
  };

  create = async (data: Omit<BenefitItem, "id">) => {
    return this.client.post<BenefitItem[]>("benefits", data);
  };

  edit = async (id: BenefitId, data: Omit<BenefitItem, "id">) => {
    return this.client.patch<BenefitItem[]>(`benefits/${id}`, data);
  };

  delete = async (id: BenefitId) => {
    return this.client.delete<null>(`benefits/${id}`);
  };
}
