import React, { ReactElement, useState } from "react";

export const useMultiForm = (steps: ReactElement[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = () => {
    // Navigate to the next form step
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  };
  const back = () => {
    // Navigate to the back form step
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };
  const goTo = (index: number) => {
    // Navigate to the goTo form step
    setCurrentStepIndex(index);
  };
  return {
    step: steps[currentStepIndex],
    currentStepIndex,
    next,
    back,
    goTo,
    setCurrentStepIndex,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    steps,
  };
};
