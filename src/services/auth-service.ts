import { api } from "../api/api";
import { SignInUser, SignUpUser, User } from "../types/users";

type UserUpdateCb = (user: User | null) => void;

export class AuthService {
  me: User | null = null;

  private subsribers = new Set<UserUpdateCb>();

  signUp = async (data: SignUpUser) => {
    const user = await api.auth.signUp(data);

    if (user) {
      this.setMe(user);
    }

    return user;
  };

  signIn = async (data: SignInUser) => {
    const user = await api.auth.signIn(data);

    if (user) {
      this.setMe(user);
    }

    return user;
  };

  signInAnonym = async () => {
    const user = await api.auth.signInAnonym();

    if (user) {
      this.setMe(user);
    }

    return user;
  };

  logout = async () => {
    await api.auth.logout();
    this.setMe(null);
  };

  getMe = async () => {
    const user = await api.auth.me();

    this.setMe(user);

    return user;
  };

  setMe(user: User | null) {
    this.me = user;
    this.notify();
  }

  subscribe = (cb: UserUpdateCb) => {
    this.subsribers.add(cb);

    return () => {
      this.subsribers.delete(cb);
    };
  };

  private notify() {
    this.subsribers.forEach((cb) => {
      cb(this.me);
    });
  }
}

export const authService = new AuthService();
