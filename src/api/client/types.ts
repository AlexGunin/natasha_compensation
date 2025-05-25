import { Options } from "ky";

export interface HttpClient {
  get<T>(
    url: string,
    params?: Record<string, string | number>,
    options?: Options,
  ): Promise<T>;
  post<T>(url: string, body?: unknown, options?: Options): Promise<T>;
  put<T>(url: string, body?: unknown, options?: Options): Promise<T>;
  patch<T>(url: string, body?: unknown, options?: Options): Promise<T>;
  delete<T>(url: string, options?: Options): Promise<T>;
}
