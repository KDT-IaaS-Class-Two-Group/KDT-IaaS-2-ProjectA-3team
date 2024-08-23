import ModalBackdrop from "client/refactor_component/atom/back_drop/Back_drop";
import ModalButtonContainer from "client/refactor_component/molecule/modal_close_button/modal_close_button";
import ModalContent from "client/refactor_component/molecule/modal_content/modal_content";
import ModalProps from "../props/modal.props";

/**
 * @param ModalProps, CardProps
 * @returns ModalComponent
 */
// [ ] Modal 최상위 컨테이너 스타일 관련 위치 조정 필요 .
// [ ] Modal Button 스타일 추가.
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <ModalBackdrop onClick={handleBackdropClick}>
      <ModalContent>
        <ModalButtonContainer onClose={onClose}></ModalButtonContainer>
        {children}
      </ModalContent>
    </ModalBackdrop>
  );
};
export default Modal;
