import React, { useCallback } from 'react';
import { useOnboarding } from '../../providers/onboarding-provider';

interface ClickableOverlayProps {
  targetPosition: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  action: string;
}

export const ClickableOverlay: React.FC<ClickableOverlayProps> = ({ 
  targetPosition, 
  action 
}) => {
  const { nextStep, getCurrentStep } = useOnboarding();
  const currentStep = getCurrentStep();

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentStep || action !== 'click') return;

    // Находим целевой элемент
    const targetElement = document.querySelector(currentStep.target);
    if (!targetElement) return;

    // Создаем событие клика для обычных элементов
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    targetElement.dispatchEvent(clickEvent);

    // Переходим к следующему шагу после задержки
    setTimeout(() => {
      nextStep();
    }, 100);
  }, [currentStep, action, nextStep]);

  if (action !== 'click') return null;
  
  // Для элементов с собственной обработкой не показываем overlay
  if (currentStep?.target.includes('cart-tab') || 
      currentStep?.target.includes('theme-btn') ||
      currentStep?.target.includes('user-avatar') ||
      currentStep?.target.includes('filter-')) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: targetPosition.top,
        left: targetPosition.left,
        width: targetPosition.width,
        height: targetPosition.height,
        zIndex: 10000,
        cursor: 'pointer',
        borderRadius: '8px',
        backgroundColor: 'transparent',
      }}
      onClick={handleOverlayClick}
      title="Нажмите, чтобы продолжить"
    />
  );
}; 