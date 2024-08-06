import {
  modalBackdrop,
  modalContent,
  closeButton,
} from "./style/modal.css";

import { ModalProps } from "./interface/props/modalProps.interface";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className={modalBackdrop}>
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