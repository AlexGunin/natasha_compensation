import ky from "ky";
import { HttpClient } from "./types";
import { ACCESS_TOKEN_STORAGE_KEY } from "../../constants/auth";

const buildQueryString = (params: Record<string, string | number> = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) =>
    query.append(key, String(value)),
  );
  return query.toString() ? `?${query.toString()}` : "";
};

export class KyHttpClient implements HttpClient {
  private client;

  constructor(prefixUrl: string) {
    this.client = ky.create({
      credentials: "include",
      prefixUrl: prefixUrl,
      retry: {
        limit: 2,
        statusCodes: [408, 500, 502, 503, 504],
      },
      hooks: {
        beforeRequest: [
          (request) => {
            console.log(`Request to: ${request.url}`);

            const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
            if (token) {
              request.headers.set("Authorization", `Bearer ${token}`);
            }
          },
        ],
      },
    });
  }

  async get<T>(
    url: string,
    params?: Record<string, string | number>,
  ): Promise<T> {
    const query = buildQueryString(params);
    return await this.client.get(`${url}${query}`).json<T>();
  }

  async post<T>(url: string, body?: unknown): Promise<T> {
    return await this.client.post(url, { json: body }).json<T>();
  }

  async put<T>(url: string, body?: unknown): Promise<T> {
    return await this.client.put(url, { json: body }).json<T>();
  }

  async delete<T>(url: string): Promise<T> {
    return await this.client.delete(url).json<T>();
  }
}
