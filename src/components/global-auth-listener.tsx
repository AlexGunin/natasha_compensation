import { useEffect } from "react";
import { useUserContext } from "../providers/user-provider";
import { useRouter } from "@tanstack/react-router";

export const GlobalAuthListener = () => {
  const user = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      console.log("Пользователь не авторизован. Редирект на /sign-in");
      router.navigate({ to: "/sign-in" });
    }
  }, [user]);

  return null;
};
