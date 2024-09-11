import React from "react";
import Button from "client/refactor_component/atom/button/button";
import * as styles from "client/styles/notice/notice.css";
import { centeredflexrowcontainer } from "client/styles/standardcontainer.css";

interface AdminAllNoticePageBtnProps {
  totalPages : number, // 총 페이지 수
  pageChange : (page:number)=>void, // 페이지 변경 핸들러 함수
  currentPage : number, // 현재 페이지 번호
}

/**
 * @component AdminAllNoticePageBtn
 * @description
 * 총 페이지 수에 따라 페이지 버튼을 생성하고, 페이지 변경 핸들러를 연결하는 컴포넌트입니다.
 * 현재 페이지와 일치하는 버튼은 비활성화됩니다.
 * 
 * @param {number} totalPages - 총 페이지 수
 * @param {(page: number) => void} pageChange - 페이지 변경 핸들러 함수
 * @param {number} currentPage - 현재 페이지 번호
 * @returns {React.FC<AdminAllNoticePageBtnProps>} - 페이지 버튼을 렌더링하는 컴포넌트
 */
const AdminAllNoticePageBtn: React.FC<AdminAllNoticePageBtnProps> = ({
  totalPages,
  pageChange,
  currentPage,
}) => {
  return (
    <div className={centeredflexrowcontainer}>
      {Array.from(
        { length: totalPages }, // 총 페이지 수만큼 배열 생성
        (_, index) => index + 1).map((page) => (  // 페이지 번호를 배열 요소로 설정
        <Button
        key={page} // 버튼의 고유 키 설정
        button_style={styles.pagebutton} // 버튼 스타일 적용
        onClick={() => pageChange(page)} // 클릭 시 페이지 변경 핸들러 호출
        disabled={currentPage === page} // 현재 페이지와 일치하면 버튼 비활성화
        button_text={page.toString()} //버튼에 페이지 번호 텍스트 설정
        />
        ))}
    </div>
  );
};

export default AdminAllNoticePageBtn;
