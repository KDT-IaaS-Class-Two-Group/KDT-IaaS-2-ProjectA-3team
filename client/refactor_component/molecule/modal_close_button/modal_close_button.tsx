import { modalbtncontainer } from "./style/button_container.css";
import Button from "client/refactor_component/atom/button/button";
import ModalCloseButtonProps from "./props/modal_close_button.props";

// [ ] 모달 닫기 버튼 스타일 추가
const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({ onClose }) => {
  return (
    <div className={modalbtncontainer}>
      <Button button_text="X" button_style="" onClick={onClose} />
    </div>
  );
};
export default ModalCloseButton;
