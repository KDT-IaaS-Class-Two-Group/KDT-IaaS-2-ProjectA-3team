import {
  modalBackdrop,
  modalContent,
  closeButton,
} from "./style/modal.css";

import { ModalProps } from "./interface/props/modalProps.interface";

// [ ] Modal은 다양한 레이어층에서 사용함으로, Common 디렉토리로 옮길 필요가 있음.
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={modalBackdrop} onClick={handleBackdropClick}>
      <div className={modalContent}>
        <button className={closeButton} onClick={onClose}>
          x
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
