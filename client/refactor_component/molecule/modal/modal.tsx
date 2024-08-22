import { modalBackdrop } from "client/components/modal/style/modal.css";
import Button from "client/refactor_component/atom/button/button";
import Card from "client/refactor_component/atom/card/card";
import CardProps from "client/refactor_component/atom/card/props/card.props";

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
    <div
      className={modalBackdrop}
      id="modal-overlay"
      onClick={handleBackdropClick}
    >
      <Card container_style={container_style}>
        <div>
          <Button button_text="X" button_style="" onClick={onClose} />
        </div>
        {children}
      </Card>
    </div>
  );
};
