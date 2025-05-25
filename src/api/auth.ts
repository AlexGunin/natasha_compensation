import { AuthResponse } from "../types/auth";
import { SignInUser, SignUpUser, User } from "../types/users";
import { deduplication } from "../utils/deduplication";
import { HttpClient } from "./client/types";

export class AuthApi {
  constructor(private client: HttpClient) {}

  signUp = deduplication(async (user: SignUpUser) => {
    try {
      return await this.client.post<AuthResponse | null>("auth/register", user);
    } catch (err) {
      console.error(err);
      return null;
    }
  });

  signIn = deduplication(async (user: SignInUser) => {
    try {
      return await this.client.post<AuthResponse | null>("auth/login", user);
    } catch (err) {
      console.error(err);
      return null;
    }
  });

  signInAnonym = deduplication(async () => {
    try {
      return await this.client.post<AuthResponse | null>("auth/anonym");
    } catch (err) {
      console.error(err);
      return null;
    }
  });

  me = deduplication(async () => {
    try {
      return await this.client.get<User | null>("auth/me", {}, { retry: 0 });
    } catch (err) {
      console.error(err);
      return null;
    }
  });

  logout = deduplication(async () => {
    try {
      return await this.client.post<null>("auth/logout");
    } catch (err) {
      console.error(err);
    }
  });
}
