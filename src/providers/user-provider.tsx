import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types/users.ts";
import { authService } from "../services/auth-service.ts";

const UserContext = createContext<User | null | undefined>(undefined);

export const UserProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => authService.subscribe(setUser), []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("You should use hook useUserProvider inside UserProvider ");
  }

  return context;
};
