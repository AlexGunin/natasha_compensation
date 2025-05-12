import { BenefitItem } from "../types/benefits";
import { HttpClient } from "./client/types";

export class BenefitsApi {
  constructor(private client: HttpClient) {}

  get = async () => {
    return this.client.get<BenefitItem[]>("benefits");
  };
}
