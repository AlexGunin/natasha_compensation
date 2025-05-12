import { BenefitsOrder } from "../types/orders";
import { HttpClient } from "./client/types";

export class OrdersApi {
  constructor(private client: HttpClient) {}

  create = async (order: BenefitsOrder) => {
    try {
      return this.client.post<number>("orders", order);
    } catch (err) {
      console.error(err);
    }
  };
}
