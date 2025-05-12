import { User } from "./users";

export interface AuthResponse {
  access_token: string;
  user: User;
}
