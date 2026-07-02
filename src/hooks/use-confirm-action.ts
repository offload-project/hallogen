import { useState } from "react";

export interface ConfirmActionConfig {
  title: string;
  description: string;
  variant?: "danger" | "primary";
  confirmLabel: string;
  processingLabel: string;
  onConfirm: () => void;
}

export function useConfirmAction<T extends string>() {
  const [activeModal, setActiveModal] = useState<T | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  function closeModal() {
    setActiveModal(null);
    setIsProcessing(false);
  }

  function executeAction(visit: () => void) {
    setIsProcessing(true);
    try {
      visit();
    } catch (error) {
      setIsProcessing(false);
      throw error;
    }
  }

  return {
    activeModal,
    setActiveModal,
    isProcessing,
    closeModal,
    executeAction,
  };
}
