import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Text, Button, Progress, CloseButton } from "@mantine/core";
import { ChevronLeft, ChevronRight, Hand } from "lucide-react";
import { useOnboarding } from "../../providers/onboarding-provider";
import { BreathingHighlight } from "./breathing-highlight";
import { PulsingCursor } from "./pulsing-cursor";
import { ClickableOverlay } from "./clickable-overlay";

interface ElementPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const OnboardingOverlay: React.FC = () => {
  const {
    isActive,
    getCurrentStep,
    nextStep,
    prevStep,
    skipOnboarding,
    currentStep,
    steps,
  } = useOnboarding();
  const [targetPosition, setTargetPosition] = useState<ElementPosition | null>(
    null
  );
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const currentStepData = getCurrentStep();

  // Функция для пересчета позиции тултипа
  const calculateTooltipPosition = useCallback(
    (position: ElementPosition) => {
      // Используем размеры по умолчанию или измеренные размеры для расчета позиции
      let tooltipWidth = 320; // размер по умолчанию
      let tooltipHeight = 200; // размер по умолчанию

      if (tooltipRef.current) {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        if (tooltipRect.width > 0 && tooltipRect.height > 0) {
          tooltipWidth = tooltipRect.width;
          tooltipHeight = tooltipRect.height;
        }
      }

      // Определяем мобильное устройство
      const isMobile = window.innerWidth <= 768;

      // Получаем текущую позицию элемента в viewport
      const targetElement = document.querySelector(
        currentStepData?.target || ""
      );
      let viewportPosition = position;

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft =
          window.pageXOffset || document.documentElement.scrollLeft;

        viewportPosition = {
          top: rect.top + scrollTop,
          left: rect.left + scrollLeft,
          width: rect.width,
          height: rect.height,
        };
      }

      let tooltipTop = viewportPosition.top;
      let tooltipLeft = viewportPosition.left;

      // На мобильных устройствах используем адаптивное позиционирование
      if (isMobile) {
        const elementCenterY =
          viewportPosition.top + viewportPosition.height / 2;
        const screenCenterY = window.pageYOffset + window.innerHeight / 2;

        // Если элемент в верхней половине экрана - тултип снизу
        // Если в нижней половине - тултип сверху
        if (elementCenterY < screenCenterY) {
          tooltipTop = viewportPosition.top + viewportPosition.height + 20;
          tooltipLeft = Math.max(
            20,
            Math.min(
              window.innerWidth - tooltipWidth - 20,
              viewportPosition.left +
                viewportPosition.width / 2 -
                tooltipWidth / 2
            )
          );
        } else {
          tooltipTop = viewportPosition.top - tooltipHeight - 20;
          tooltipLeft = Math.max(
            20,
            Math.min(
              window.innerWidth - tooltipWidth - 20,
              viewportPosition.left +
                viewportPosition.width / 2 -
                tooltipWidth / 2
            )
          );
        }
      } else {
        // Для десктопа используем заданную позицию
        switch (currentStepData?.position) {
          case "top":
            tooltipTop = viewportPosition.top - tooltipHeight - 20;
            tooltipLeft =
              viewportPosition.left +
              viewportPosition.width / 2 -
              tooltipWidth / 2;
            break;
          case "bottom":
            tooltipTop = viewportPosition.top + viewportPosition.height + 20;
            tooltipLeft =
              viewportPosition.left +
              viewportPosition.width / 2 -
              tooltipWidth / 2;
            break;
          case "left":
            tooltipTop =
              viewportPosition.top +
              viewportPosition.height / 2 -
              tooltipHeight / 2;
            tooltipLeft = viewportPosition.left - tooltipWidth - 20;
            break;
          case "right":
            tooltipTop =
              viewportPosition.top +
              viewportPosition.height / 2 -
              tooltipHeight / 2;
            tooltipLeft = viewportPosition.left + viewportPosition.width + 20;
            break;
          default:
            tooltipTop = viewportPosition.top + viewportPosition.height + 20;
            tooltipLeft =
              viewportPosition.left +
              viewportPosition.width / 2 -
              tooltipWidth / 2;
        }
      }

      // Убеждаемся, что тултип не выходит за границы экрана
      const padding = 20;
      const maxLeft = window.innerWidth - tooltipWidth - padding;
      const maxTop = window.innerHeight - tooltipHeight - padding;

      tooltipLeft = Math.max(padding, Math.min(tooltipLeft, maxLeft));
      tooltipTop = Math.max(padding, Math.min(tooltipTop, maxTop));

      setTooltipPosition({ top: tooltipTop, left: tooltipLeft });
    },
    [currentStepData?.position, currentStepData?.target]
  );

  // Обработчик скролла для обновления позиции тултипа
  const handleScroll = useCallback(() => {
    if (targetPosition && currentStepData) {
      // При скролле пересчитываем позицию тултипа относительно нового положения элемента
      const targetElement = document.querySelector(currentStepData.target);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft =
          window.pageXOffset || document.documentElement.scrollLeft;

        const newPosition = {
          top: rect.top + scrollTop,
          left: rect.left + scrollLeft,
          width: rect.width,
          height: rect.height,
        };

        // Проверяем, действительно ли позиция изменилась
        const positionChanged =
          Math.abs(newPosition.top - targetPosition.top) > 1 ||
          Math.abs(newPosition.left - targetPosition.left) > 1 ||
          Math.abs(newPosition.width - targetPosition.width) > 1 ||
          Math.abs(newPosition.height - targetPosition.height) > 1;

        // Обновляем позиции только если они действительно изменились
        if (positionChanged) {
          setTargetPosition(newPosition);
          calculateTooltipPosition(newPosition);
        }
      }
    }
  }, [targetPosition, currentStepData, calculateTooltipPosition]);

  useEffect(() => {
    if (!isActive || !currentStepData) {
      setTargetPosition(null);
      setTooltipPosition(null);
      return;
    }

    const updatePosition = () => {
      const targetElement = document.querySelector(currentStepData.target);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft =
          window.pageXOffset || document.documentElement.scrollLeft;

        const position = {
          top: rect.top + scrollTop,
          left: rect.left + scrollLeft,
          width: rect.width,
          height: rect.height,
        };

        setTargetPosition(position);
        calculateTooltipPosition(position);
      }
    };

    // Обработчик завершения навигации
    const handleNavigationComplete = () => {
      // Несколько попыток обновления позиции с разными задержками
      setTimeout(updatePosition, 100);
      setTimeout(updatePosition, 300);
      setTimeout(updatePosition, 500);
    };

    // Обработчик изменения маршрута
    const handleRouteChange = () => {
      setTimeout(updatePosition, 200);
    };

    // Небольшая задержка для рендеринга элементов
    const timer = setTimeout(updatePosition, 300);

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener(
      "onboarding-navigation-complete",
      handleNavigationComplete
    );
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener(
        "onboarding-navigation-complete",
        handleNavigationComplete
      );
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [isActive, currentStepData, calculateTooltipPosition, handleScroll]);

  // Эффект для обновления позиции тултипа при изменении контента
  useEffect(() => {
    if (!tooltipRef.current || !targetPosition) return;

    const updateTooltipPosition = () => {
      // Пересчитываем позицию с учетом нового размера контента
      calculateTooltipPosition(targetPosition);
    };

    // Небольшая задержка для рендеринга нового контента
    const timer = setTimeout(updateTooltipPosition, 100);

    return () => clearTimeout(timer);
  }, [
    currentStepData?.title,
    currentStepData?.description,
    currentStep,
    targetPosition,
    calculateTooltipPosition,
  ]);

  if (!isActive || !currentStepData || !targetPosition || !tooltipPosition) {
    return null;
  }

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          pointerEvents: "auto",
        }}
      >
        {/* Затемнение с вырезом */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <defs>
            <mask id="spotlight">
              <rect width="100%" height="100%" fill="white" />
              <motion.rect
                initial={{
                  x: targetPosition.left - 10,
                  y: targetPosition.top - 10,
                  width: targetPosition.width + 20,
                  height: targetPosition.height + 20,
                }}
                animate={{
                  x: targetPosition.left - 10,
                  y: targetPosition.top - 10,
                  width: targetPosition.width + 20,
                  height: targetPosition.height + 20,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                fill="black"
                rx="8"
              />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.7)"
            mask="url(#spotlight)"
          />
        </svg>

        {/* Подсветка целевого элемента с эффектом дыхания */}
        <BreathingHighlight position={targetPosition} />
        <ClickableOverlay
          targetPosition={targetPosition}
          action={currentStepData.action || "none"}
        />
        {/* Кликабельная область для интерактивных элементов */}

        {/* Пульсирующий курсор для действий */}
        {currentStepData.action === "click" && (
          <PulsingCursor
            position={{
              top: targetPosition.top + targetPosition.height / 2,
              left: targetPosition.left + targetPosition.width / 2,
            }}
          />
        )}

        {/* Тултип */}
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            duration: 0.4,
            delay: 0.2,
          }}
          style={{
            position: "absolute",
            left: tooltipPosition.left,
            top: tooltipPosition.top,
            width: "fit-content",
            minWidth: window.innerWidth <= 768 ? 260 : 280,
            maxWidth:
              window.innerWidth <= 768
                ? Math.min(320, window.innerWidth - 40)
                : 400,
            zIndex: 10000,
            transition: "left 0.3s ease-out, top 0.3s ease-out",
          }}
        >
          <Card shadow="xl" padding="lg" radius="md" withBorder>
            {/* Заголовок с крестиком */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "12px",
                gap: "12px",
              }}
            >
              <Text size="lg" fw={600} style={{ flex: 1, lineHeight: 1.3 }}>
                {currentStepData.title}
              </Text>
              <CloseButton
                onClick={skipOnboarding}
                size="sm"
                style={{ flexShrink: 0, marginTop: "2px" }}
              />
            </div>

            <Text size="sm" c="dimmed" mb="md" style={{ lineHeight: 1.4 }}>
              {currentStepData.description}
            </Text>

            <Progress value={progress} size="sm" mb="lg" />

            {/* Нижний блок с кнопками */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {/* Прогресс */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  size="xs"
                  c="dimmed"
                  style={{
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {currentStep + 1} из {steps.length}
                </Text>
              </div>

              {/* Кнопки */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="light"
                  leftSection={<ChevronLeft size={16} />}
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  size="sm"
                  fullWidth
                >
                  Назад
                </Button>

                <Button
                  rightSection={<ChevronRight size={16} />}
                  onClick={nextStep}
                  size="sm"
                  fullWidth
                >
                  {currentStep === steps.length - 1 ? "Завершить" : "Далее"}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Анимированная рука-указатель */}
        {currentStepData.action === "click" && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0.8],
              x: [0, 5, -5, 0],
              y: [0, -5, 5, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 0.5,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: targetPosition.top,
              left: targetPosition.left + targetPosition.width / 2 - 24,
              pointerEvents: "none",
              filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))",
            }}
          >
            <Hand size={48} color="#339af0" />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
