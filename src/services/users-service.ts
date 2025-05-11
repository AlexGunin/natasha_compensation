import { api } from "../api/api";
import { User } from "../types/users";

export class UserService {
  me: User | null = null;

  getMe = async () => {
    const user = await api.users.me();

    this.me = user;

    return user;
  };
}

export const userService = new UserService();
