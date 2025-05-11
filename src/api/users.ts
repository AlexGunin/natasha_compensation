import { User } from "../types/users";
import { HttpClient } from "./client/types";

export class UsersApi {
  constructor(private client: HttpClient) {}

  getAll = async () => {
    return this.client.get<User[]>("users");
  };
}
