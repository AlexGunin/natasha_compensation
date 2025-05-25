import { useEffect } from 'react';
import { useOnboarding } from '../providers/onboarding-provider';
import { useUserContext } from '../providers/user-provider';

const ONBOARDING_STORAGE_KEY = 'natasha-compensation-onboarding-completed';

export const useAutoOnboarding = () => {
  const { startOnboarding, isActive } = useOnboarding();
  const user = useUserContext();

  useEffect(() => {
    // Запускаем онбординг только для авторизованных пользователей
    if (!user || isActive) return;

    // Проверяем, проходил ли пользователь онбординг
    const hasCompletedOnboarding = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    
    if (!hasCompletedOnboarding) {
      // Небольшая задержка для загрузки интерфейса
      const timer = setTimeout(() => {
        startOnboarding();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [user, isActive, startOnboarding]);
};

export const markOnboardingCompleted = () => {
  localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
};

export const resetOnboarding = () => {
  localStorage.removeItem(ONBOARDING_STORAGE_KEY);
}; 