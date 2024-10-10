import React from "react";
import Button from "client/refactor_component/atom/button/button";
import { greenButton } from "client/styles/templatebutton.css";
import * as styles from "client/styles/notice/notice.css";
/**
 * @component BackBtn
 * @description
 * "뒤로가기" 버튼을 렌더링하는 React 컴포넌트입니다. 클릭 시 전달된 `onClick` 핸들러가 호출됩니다.
 * 버튼의 스타일은 `greenButton` 클래스를 사용하며, 버튼의 텍스트는 "뒤로가기"입니다.
 *
 * @param {Object} props - 컴포넌트의 속성
 * @param {Function} props.onClick - 버튼 클릭 시 호출되는 함수
 *
 * @returns {JSX.Element} - 렌더링된 컴포넌트
 */
const BackBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className={styles.btnsize}>
      <Button
        button_text="뒤로가기"
        button_style={greenButton}
        onClick={onClick}
      />
    </div>
  );
};

export default BackBtn;
