import {
  createContext,
  PropsWithChildren,
  useContext,
  useSyncExternalStore,
} from "react";
import { User } from "../types/users.ts";
import { authService } from "../services/auth-service.ts";
import { useQuery } from "@tanstack/react-query";

const UserContext = createContext<User | null | undefined>(undefined);

export const UserProvider = (props: PropsWithChildren) => {
  useQuery({
    queryKey: ["user"],
    queryFn: authService.fetchMe,
  })
  
  const user = useSyncExternalStore(authService.subscribe, authService.getMe);

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
