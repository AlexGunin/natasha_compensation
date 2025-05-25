import React from 'react';
import { Button, Group, Text, Stack } from '@mantine/core';
import { useOnboarding } from '../../providers/onboarding-provider';
import { resetOnboarding } from '../../hooks/use-auto-onboarding';

export const OnboardingTest: React.FC = () => {
  const { startOnboarding, isActive, currentStep, steps, nextStep, prevStep, skipOnboarding } = useOnboarding();

  const handleReset = () => {
    resetOnboarding();
    window.location.reload();
  };

  if (true || process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: 20, 
      left: 20, 
      zIndex: 10000,
      background: 'white',
      padding: '12px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      border: '1px solid #ddd',
      minWidth: '200px'
    }}>
      <Text size="sm" fw={600} mb="xs">Онбординг тест</Text>
      
      <Stack gap="xs">
        <Group gap="xs">
          <Button size="xs" onClick={startOnboarding} disabled={isActive}>
            Запустить
          </Button>
          <Button size="xs" variant="outline" onClick={handleReset}>
            Сбросить
          </Button>
        </Group>
        
        {isActive && (
          <>
            <Text size="xs" c="dimmed">
              Шаг: {currentStep + 1} / {steps.length}
            </Text>
            <Text size="xs" c="blue">
              {steps[currentStep]?.title}
            </Text>
            <Group gap="xs">
              <Button size="xs" variant="light" onClick={prevStep} disabled={currentStep === 0}>
                ←
              </Button>
              <Button size="xs" variant="light" onClick={nextStep}>
                →
              </Button>
              <Button size="xs" variant="light" color="red" onClick={skipOnboarding}>
                ✕
              </Button>
            </Group>
          </>
        )}
      </Stack>
    </div>
  );
}; 