import { useRouter } from "@tanstack/react-router";
import { useSyncExternalStore } from "react";

export const useActiveRoute = () => {
  const router = useRouter();

  return useSyncExternalStore(
    (callback) => {
      // Подписываемся на все возможные события изменения маршрута
      const unsubscribers = [
        router.subscribe("onLoad", callback),
        router.subscribe("onBeforeLoad", callback),
        router.subscribe("onResolved", callback),
      ];
      
      // Также слушаем изменения в истории браузера
      const handlePopState = () => callback();
      window.addEventListener('popstate', handlePopState);
      
      // Слушаем кастомное событие завершения навигации
      const handleNavigationComplete = () => callback();
      window.addEventListener('onboarding-navigation-complete', handleNavigationComplete);
      
      return () => {
        unsubscribers.forEach(unsubscribe => unsubscribe());
        window.removeEventListener('popstate', handlePopState);
        window.removeEventListener('onboarding-navigation-complete', handleNavigationComplete);
      };
    },
    () => {
      // Получаем текущий pathname
      const pathname = router.state.location.pathname;
      
      // Убираем basepath если он есть
      const basepath = "/natasha_compensation";
      let cleanPath = pathname;
      
      if (pathname.startsWith(basepath)) {
        cleanPath = pathname.slice(basepath.length);
      }
      
      // Если путь пустой, возвращаем "/"
      return cleanPath || "/";
    },
    () => {
      // Server-side rendering fallback
      return "/";
    }
  );
};
