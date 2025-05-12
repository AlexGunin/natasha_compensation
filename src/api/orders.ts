import { BenefitsOrder } from "../types/orders";
import { HttpClient } from "./client/types";

export class OrdersApi {
  constructor(private client: HttpClient) {}

  create = async (order: BenefitsOrder) => {
    return this.client.post<number>("orders", order);
  };
}
