import { useState } from "react";

/**
 * @author @naviadev
 * @date 2024/08/23
 * @version 1.4
 * @brief CreateProjectModal에서 사용되는 Modal 상태 관리 훅
 * @details  이 훅은 모달의 열림/닫힘 상태와 모달 내의 단계를 관리하는 역할을 한다. openModal과 closeModal 함수를 통해 모달을 열고 닫을 수 있으며, handleNext 함수를 통해 조건에 따라 모달 내의 단계를 진행할 수 있다.
 *
 * @returns {object} 모달 상태와 관련된 제어 함수들을 반환한다.
 * @returns {boolean} isOpen 모달의 열림/닫힘 상태.
 * @returns {number} step 현재 모달 단계.
 * @returns {function} openModal 모달을 여는 함수.
 * @returns {function} closeModal 모달을 닫고 단계를 초기화하는 함수.
 * @returns {function} handleNext 조건이 만족될 경우 다음 단계로 진행하는 함수.
 */

const useModal = () => {
  /**
   * @brief 모달의 열림/닫힘 상태를 관리하는 상태값.
   * @details 기본값은 false로 설정되어 있어 버튼을 눌러야만 모달이 열린다.
   */
  const [isOpen, setIsOpen] = useState(false);

  /**
   * @brief 모달 내부 컨텐츠의 단계를 정의하는 상태값.
   * @details 페이지의 단계로, 1은 첫 번째 페이지를, 2는 두 번째 페이지를 의미한다.
   */
  const [step, setStep] = useState(1);

  /**
   * @brief 모달을 여는 함수.
   * @details 이 함수를 호출하면 isOpen 상태가 true로 변경되어 모달이 열린다.
   */
  const openModal = () => setIsOpen(true);

  /**
   * @brief 모달을 닫는 함수.
   * @details 이 함수를 호출하면 모달이 닫히고, step 값은 1로 초기화된다.
   */
  const closeModal = () => {
    setIsOpen(false);
    setStep(1);
  };

  /**
   * @brief 모달 내부 컨텐츠의 단계를 다음 단계로 진행하는 함수.
   * @param conditions {boolean} 조건을 나타내는 boolean 값.
   * @details 조건이 true일 경우 현재 step 값을 1 증가시켜 모달 내부의 컨텐츠를 다음 단계로 전환한다.
   */
  const handleNext = (conditions: boolean) => {
    if (conditions) {
      setStep((prevStep) => prevStep + 1);
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
