import { AuthResponse } from "../types/auth";
import { SignInUser, SignUpUser, User } from "../types/users";
import { HttpClient } from "./client/types";

const reusePromise = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Args extends any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Callback extends (...args: Args) => Promise<any>,
>(
  callback: Callback,
) => {
  let promise: ReturnType<Callback> | null = null;

  return (...args: Args): ReturnType<Callback> => {
    if (promise) {
      return promise;
    }

    const internalPromise = callback(...args);

    // @ts-expect-error: Todo
    promise = internalPromise;

    internalPromise.finally(() => {
      promise = null;
    });

    // @ts-expect-error: Todo
    return internalPromise;
  };
};

export class AuthApi {
  constructor(private client: HttpClient) {}

  signUp = reusePromise(async (user: SignUpUser) => {
    try {
      return this.client.post<AuthResponse | null>("auth/register", user);
    } catch (err) {
      console.error(err);
      return null;
    }
  });

  signIn = reusePromise(async (user: SignInUser) => {
    try {
      return this.client.post<AuthResponse | null>("auth/login", user);
    } catch (err) {
      console.error(err);
      return null;
    }
  });

  signInAnonym = reusePromise(async () => {
    try {
      return this.client.post<AuthResponse | null>("auth/anonym");
    } catch (err) {
      console.error(err);
      return null;
    }
  });

  me = reusePromise(async () => {
    try {
      return await this.client.get<User | null>("auth/me");
    } catch (err) {
      console.error(err);
      return null;
    }
  });

  logout = reusePromise(async () => {
    try {
      return this.client.post<null>("auth/logout");
    } catch (err) {
      console.error(err);
    }
  });
}
