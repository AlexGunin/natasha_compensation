import { SignInUser, SignUpUser, User } from "../types/users";
import { HttpClient } from "./client/types";

export class AuthApi {
  constructor(private client: HttpClient) {}

  signUp = async (user: SignUpUser) => {
    return this.client.post<User | null>("auth/register", user);
  };

  signIn = async (user: SignInUser) => {
    return this.client.post<User | null>("auth/login", user);
  };

  signInAnonym = async () => {
    return this.client.post<User | null>("auth/anonym");
  };

  me = async () => {
    try {
      return await this.client.get<User | null>("auth/me");
    } catch (err) {
      return null;
    }
  };

  logout = async () => {
    return this.client.post<null>("auth/logout");
  };
}
