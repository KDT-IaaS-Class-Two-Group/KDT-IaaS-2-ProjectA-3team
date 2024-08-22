import { modalBackdrop } from "client/styles/modal/modal.css";
import ModalBackdropProps from "./props/back_drop.props";
// [ ] 스타일 위치 변경 필요. 현재 임의 css 추가
const ModalBackdrop: React.FC<ModalBackdropProps> = ({ onClick, children }) => {
  return (
    <div className={modalBackdrop} onClick={onClick}>
      {children}
    </div>
  );
};

export default ModalBackdrop;
