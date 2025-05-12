import { SignInUser, SignUpUser, User } from "../types/users";
import { HttpClient } from "./client/types";

const reusePromise = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Args extends any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // Return extends any,
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

    promise = internalPromise;

    internalPromise.finally(() => {
      promise = null;
    });

    return internalPromise;
  };
};

const deduplication = (): MethodDecorator => {
  return (target, propertyKey, descriptor) => {
    const originalMethod = descriptor.value;

    let promise: Promise<any> | null = null;

    descriptor.value = async function (...args: any[]) {
      if (promise) return promise;

      promise = originalMethod.apply(this, args);

      try {
        const result = await promise;
        promise = null;
        return result;
      } catch (error) {
        promise = null;
        throw error;
      }
    };
  };
};

export class AuthApi {
  constructor(private client: HttpClient) {}

  signUp = reusePromise(async (user: SignUpUser) => {
    return this.client.post<User | null>("auth/register", user);
  });

  signIn = reusePromise(async (user: SignInUser) => {
    return this.client.post<User | null>("auth/login", user);
  });

  signInAnonym = reusePromise(async () => {
    return this.client.post<User | null>("auth/anonym");
  });

  me = reusePromise(async () => {
    try {
      return await this.client.get<User | null>("auth/me");
    } catch (err) {
      return null;
    }
  });

  logout = reusePromise(async () => {
    return this.client.post<null>("auth/logout");
  });
}
