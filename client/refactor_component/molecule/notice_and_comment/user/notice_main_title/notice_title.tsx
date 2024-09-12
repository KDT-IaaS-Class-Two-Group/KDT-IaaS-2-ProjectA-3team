import React from "react";
import Link from "next/link";
import { blueButton, tdn } from "client/styles/templatebutton.css";
/**
 * @component NoticeAdminButton
 * @description
 * 관리자 게시판으로 이동하는 버튼을 렌더링하는 컴포넌트입니다. 버튼을 클릭하면 "/noticeAuthAllPage" 경로로 이동하며,
 * 스타일링은 `blueButton`과 `tdn` 클래스를 사용합니다.
 * 
 * @returns {JSX.Element} - '관리자 게시판 보기' 버튼이 포함된 링크 요소
 */

const NoticeAdminButton = () => {
  return (
    <Link href="/noticeAuthAllPage" className={tdn}>
      <button className={blueButton}>관리자 게시판 보기</button>
    </Link>
  );
};

export default NoticeAdminButton;
