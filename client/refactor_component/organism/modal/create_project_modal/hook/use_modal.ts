import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setStep(1);
  };
  const handleNext = (conditions: boolean) => {
    if (conditions) {
      setStep(prevStep => prevStep + 1);
    }
  };
  return {
    isOpen,
    step,
    openModal,
    closeModal,
    handleNext,
  };
};

export default useModal;
