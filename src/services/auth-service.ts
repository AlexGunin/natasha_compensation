import { api } from "../api/api";
import { ACCESS_TOKEN_STORAGE_KEY } from "../constants/auth";
import { AuthResponse } from "../types/auth";
import { SignInUser, SignUpUser, User } from "../types/users";

type UserUpdateCb = (user: User | null) => void;

export class AuthService {
  me: User | null = null;

  private subsribers = new Set<UserUpdateCb>();

  signUp = async (data: SignUpUser) => {
    const authResponse = await api.auth.signUp(data);

    return this.handleAuthResponse(authResponse);
  };

  signIn = async (data: SignInUser) => {
    const authResponse = await api.auth.signIn(data);

    return this.handleAuthResponse(authResponse);
  };

  signInAnonym = async () => {
    const authResponse = await api.auth.signInAnonym();

    return this.handleAuthResponse(authResponse);
  };

  logout = async () => {
    // await api.auth.logout();
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
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

  private handleAuthResponse(response: AuthResponse | null) {
    if (!response) {
      return null;
    }
    const { access_token, user } = response;

    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, access_token);

    this.setMe(user);

    return user;
  }

  private notify() {
    this.subsribers.forEach((cb) => {
      cb(this.me);
    });
  }
}

export const authService = new AuthService();
