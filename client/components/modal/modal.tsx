import {
  modalBackdrop,
  modalContent,
  closeButton,
} from 'client/styles/modal/modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

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
