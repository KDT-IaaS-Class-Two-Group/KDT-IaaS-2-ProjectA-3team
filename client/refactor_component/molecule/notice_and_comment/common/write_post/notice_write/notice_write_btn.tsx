import Link from "next/link";
import React from "react";
import Button from "client/refactor_component/atom/button/button";
import { greenButton } from "client/styles/templatebutton.css";
import * as styles from "client/styles/notice/notice.css";
/**
 * @component SendBtn
 * @description
 * "게시글 작성" 버튼을 렌더링하는 React 컴포넌트입니다. 버튼 클릭 시 전달된 `onClick` 핸들러가 호출됩니다.
 * 버튼은 Next.js의 `Link` 컴포넌트로 감싸져 있어 `/noticeMain` 경로로 이동합니다.
 * 버튼의 스타일은 `greenButton` 클래스를 사용하며, 버튼의 텍스트는 "게시글 작성"입니다.
 *
 * @param {Object} props - 컴포넌트의 속성
 * @param {Function} props.onClick - 버튼 클릭 시 호출되는 함수
 *
 * @returns {JSX.Element} - 렌더링된 컴포넌트
 */
const SendBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className={styles.btnsize}>
      <Link href="/noticeMain" passHref className={styles.uploadbutton}>
        <Button
          button_text="게시글 작성"
          button_style={greenButton}
          onClick={onClick}
        />
      </Link>
    </div>
  );
};

export default SendBtn;
