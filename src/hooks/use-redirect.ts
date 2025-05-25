import { useRouter } from "@tanstack/react-router";
import { useUserContext } from "../providers/user-provider";
import { useEffect } from "react";

export const useRedirect = () => {
  const user = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const currentPath = router.state.location.pathname;
      const isAuthPage = currentPath.includes('/sign-in') || currentPath.includes('/sign-up');
      
      if (isAuthPage) {
        router.navigate({ to: "/" });
      }
    }
  }, [user, router]);
};
