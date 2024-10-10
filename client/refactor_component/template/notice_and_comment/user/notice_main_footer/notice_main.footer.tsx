import React from "react";
import WriteButton from "client/refactor_component/molecule/notice_and_comment/user/notice_main_footer/notice_footer";

/**
 * @component NoticeMainFooter
 * @description 게시판 메인 페이지의 하단에 위치한 푸터 컴포넌트. 작성 버튼을 포함한다.
 */
const NoticeMainFooter = () => {
  return (
    // 작성 버튼을 누르면 게시물 작성 페이지로 변환
    <WriteButton />
  );
};

export default NoticeMainFooter;
