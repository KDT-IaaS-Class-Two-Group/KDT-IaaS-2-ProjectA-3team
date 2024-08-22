import { modalBackdrop } from "client/components/modal/style/modal.css";
import ModalBackdrop from "client/refactor_component/atom/back_drop/back_drop";
import Button from "client/refactor_component/atom/button/button";
import Card from "client/refactor_component/atom/card/card";
import CardProps from "client/refactor_component/atom/card/props/card.props";
import ModalButtonContainer from "client/refactor_component/molecule/modal_close_button/modal_close_button";
import ModalContent from "client/refactor_component/molecule/modal_content/modal_content";

interface ModalProps extends CardProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * @param ModalProps, CardProps
 * @returns ModalComponent
 */
// [ ] Modal 최상위 컨테이너 스타일 관련 위치 조정 필요 .
// [ ] Modal Button 스타일 추가.
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  container_style,
}) => {
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
