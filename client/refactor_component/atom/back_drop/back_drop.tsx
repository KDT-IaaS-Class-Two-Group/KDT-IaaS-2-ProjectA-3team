import ModalBackdropProps from "./props/back_drop.props";
import { modalBackdrop } from "./style/back_drop.css";
const ModalBackdrop: React.FC<ModalBackdropProps> = ({ onClick, children }) => {
  return (
    <div className={modalBackdrop} onClick={onClick}>
      {children}
    </div>
  );
};

export default ModalBackdrop;
