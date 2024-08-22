import {
  modalBackdrop,
  modalContent,
  closeButton,
  modalbtncontainer,
} from "./style/modal.css";

import { ModalProps } from "./interface/props/modalProps.interface";

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
        <div className={modalbtncontainer}>
          <button className={closeButton} onClick={onClose}>
            x
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
