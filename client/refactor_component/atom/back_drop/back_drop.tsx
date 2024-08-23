/**
 * @file back_drop.tsx
 * @brief 모달 백드롭 컴포넌트 파일
 * @details 이 파일은 모달이 열렸을 때 화면을 덮는 백드롭 컴포넌트를 정의한다.
 * 사용자가 모달 외부를 클릭했을 때 이벤트를 처리하기 위한 기능을 제공한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */

import ModalBackdropProps from "./props/back_drop.interface";
import { modalBackdrop } from "./style/back_drop.css";

/**
 * @brief 모달 백드롭 컴포넌트
 * @details 모달이 열렸을 때 화면을 덮는 백드롭 역할을 하는 컴포넌트.
 * 사용자가 백드롭을 클릭하면 onClick 이벤트 핸들러가 호출된다.
 * @param {ModalBackdropProps} props 컴포넌트의 props로, onClick 핸들러와 자식 요소(children)를 받는다.
 * @return 백드롭이 적용된 div 요소를 반환
 */
const Backdrop: React.FC<ModalBackdropProps> = ({ onClick, children }) => {
  return (
    <div className={modalBackdrop} onClick={onClick}>
      {children}
    </div>
  );
};

export default Backdrop;
