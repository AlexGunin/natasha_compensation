import React, { createContext, useContext, useState, useCallback, PropsWithChildren } from 'react';
import { useRouter } from '@tanstack/react-router';
import { markOnboardingCompleted, resetOnboarding } from '../hooks/use-auto-onboarding';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  target: string; // CSS selector
  page: string; // route path
  position?: 'top' | 'bottom' | 'left' | 'right';
  action?: 'click' | 'hover' | 'none';
}

interface OnboardingContextType {
  isActive: boolean;
  currentStep: number;
  steps: OnboardingStep[];
  startOnboarding: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipOnboarding: () => void;
  isStepActive: (stepId: string) => boolean;
  getCurrentStep: () => OnboardingStep | null;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'init',
    title: 'Добро пожаловать в систему гибкого управления льготами!',
    description: "Давайте проведем вас по основным функциям системы",
    target: '[data-onboarding="init"]',
    page: '/',
    position: 'top',
    action: 'none'
  },
  {
    id: 'catalog-intro',
    title: 'Добро пожаловать в каталог!',
    description: 'Здесь вы можете выбрать льготы, которые вам интересны',
    target: '[data-onboarding="catalog-grid"]',
    page: '/',
    position: 'bottom',
    action: 'none'
  },
  {
    id: 'benefit-add',
    title: 'Карточки льгот',
    description: 'Нажмите чтобы добавить льготу в корзину',
    target: '[data-onboarding="benefit-add"]:first-of-type',
    page: '/',
    position: 'top',
    action: 'click'
  },
  {
    id: 'benefit-filters-self',
    title: 'Фильтры льгот - Для себя',
    description: 'Здесь отображаются льготы только для вас лично',
    target: '[data-onboarding="filter-self"]',
    page: '/',
    position: 'bottom',
    action: 'none'
  },
  {
    id: 'benefit-filters-family',
    title: 'Фильтры льгот - Для семьи',
    description: 'Здесь льготы для всей семьи',
    target: '[data-onboarding="filter-family"]',
    page: '/',
    position: 'bottom',
    action: 'none'
  },
  {
    id: 'benefit-filters-all',
    title: 'Фильтры льгот - Все льготы',
    description: 'Здесь можно увидеть все доступные льготы сразу',
    target: '[data-onboarding="filter-all"]',
    page: '/',
    position: 'bottom',
    action: 'none'
  },
  {
    id: 'cart-navigation',
    title: 'Переход в корзину',
    description: 'Теперь можно перейти в корзину и проверить выбранные льготы',
    target: '[data-onboarding="cart-tab"]',
    page: '/',
    position: 'top',
    action: 'none'
  },
  {
    id: 'cart-items',
    title: 'Ваши выбранные льготы',
    description: 'Здесь отображаются все выбранные вами льготы',
    target: '[data-onboarding="cart-items"]',
    page: '/cart',
    position: 'bottom',
    action: 'none'
  },
  {
    id: 'finish-order',
    title: 'Завершение заказа',
    description: 'Когда будете готовы, нажмите эту кнопку, чтобы оформить пакет льгот',
    target: '[data-onboarding="finish-button"]',
    page: '/cart',
    position: 'top',
    action: 'none'
  }
];

export const OnboardingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const startOnboarding = useCallback(() => {
    resetOnboarding()
    setIsActive(true);
    setCurrentStep(0);
    // Переходим на первую страницу онбординга
    const firstStep = ONBOARDING_STEPS[0];
    if (firstStep && router.state.location.pathname !== firstStep.page) {
      console.log('Onboarding: Navigating to first step page:', firstStep.page);
      router.navigate({ to: firstStep.page });
    }
  }, [router]);

  const nextStep = useCallback(() => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      const nextStepIndex = currentStep + 1;
      const nextStep = ONBOARDING_STEPS[nextStepIndex];
      
      setCurrentStep(nextStepIndex);
      
      // Переходим на нужную страницу если она отличается
      if (nextStep && router.state.location.pathname !== nextStep.page) {
        // Увеличиваем задержку для навигации
        setTimeout(() => {
          try {
            router.navigate({ to: nextStep.page });
            // Дополнительная задержка для обновления UI
            setTimeout(() => {
              // Принудительно обновляем состояние после навигации
              const event = new CustomEvent('onboarding-navigation-complete');
              window.dispatchEvent(event);
            }, 200);
          } catch (error) {
            console.error('Onboarding: Navigation error:', error);
          }
        }, 200);
      }
    } else {
      console.log('Onboarding: Completed');
      skipOnboarding();
    }
  }, [currentStep, router]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      const prevStepIndex = currentStep - 1;
      const prevStep = ONBOARDING_STEPS[prevStepIndex];
      
      setCurrentStep(prevStepIndex);
      
      // Переходим на нужную страницу если она отличается
      if (prevStep && router.state.location.pathname !== prevStep.page) {
        // Небольшая задержка для плавного перехода
        setTimeout(() => {
          try {
            router.navigate({ to: prevStep.page });
          } catch (error) {
            console.error('Onboarding: Navigation error:', error);
          }
        }, 100);
      }
    }
  }, [currentStep, router]);

  const skipOnboarding = useCallback(() => {
    setIsActive(false);
    setCurrentStep(0);
    markOnboardingCompleted();
  }, []);

  const isStepActive = useCallback((stepId: string) => {
    return isActive && ONBOARDING_STEPS[currentStep]?.id === stepId;
  }, [isActive, currentStep]);

  const getCurrentStep = useCallback(() => {
    return isActive ? ONBOARDING_STEPS[currentStep] || null : null;
  }, [isActive, currentStep]);

  return (
    <OnboardingContext.Provider
      value={{
        isActive,
        currentStep,
        steps: ONBOARDING_STEPS,
        startOnboarding,
        nextStep,
        prevStep,
        skipOnboarding,
        isStepActive,
        getCurrentStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}; 