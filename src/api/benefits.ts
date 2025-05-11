import { BenefitItem } from "../types/benefits";
import { HttpClient } from "./client/types";

const sleep = (time: number) => new Promise((res) => setTimeout(res, time));

export class BenefitsApi {
  constructor(private client: HttpClient) {}

  get = async () => {
    await sleep(2000);
    return this.client.get<BenefitItem[]>("benefits");
  };
}
