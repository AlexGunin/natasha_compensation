import { HttpClient } from "./client/types";

export class LimitsApi {
  constructor(private client: HttpClient) {}

  get = async () => {
    return this.client.get<number>("limit");
  };
}
