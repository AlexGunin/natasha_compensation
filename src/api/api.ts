import { AuthApi } from "./auth";
import { BenefitsApi } from "./benefits";
import { KyHttpClient } from "./client/ky-http-client";
import { OrdersApi } from "./orders";
import { UsersApi } from "./users";

const apiUrl = import.meta.env.VITE_API_URL;

const httpClient = new KyHttpClient(apiUrl);

export const api = {
  benefits: new BenefitsApi(httpClient),
  users: new UsersApi(httpClient),
  auth: new AuthApi(httpClient),
  orders: new OrdersApi(httpClient),
};
