import React from "react";
import Button from "client/refactor_component/atom/button/button";
import * as styles from "client/styles/notice/notice.css";
import { centeredflexrowcontainergap } from "client/styles/standardcontainer.css";
/**
 * @interface PagesProps
 * @description 페이지네이션에 필요한 속성들을 정의한 인터페이스
 *
 * @property {number} totalPages - 총 페이지 수
 * @property {number} currentPage - 현재 선택된 페이지 번호
 * @property {function} onPageChange - 페이지를 변경할 때 호출되는 함수
 */
interface PagesProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
/**
 * @function Pages
 * @description
 * 페이지네이션 버튼을 렌더링하는 컴포넌트입니다. 
 * 총 페이지 수에 따라 버튼을 생성하고, 현재 페이지는 비활성화됩니다.
 *
 * @param {PagesProps} props - 페이지네이션 관련 속성을 받는 컴포넌트
 * @returns {JSX.Element} 페이지네이션 버튼을 포함한 JSX
 */
const Pages: React.FC<PagesProps> = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className={centeredflexrowcontainergap}>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <Button
          key={page}
          button_text={page.toString()} // 페이지 번호를 문자열로 변환
          button_style={styles.pagebutton}
          onClick={() => onPageChange(page)} // 클릭 시 페이지 변경 함수 호출
          disabled={currentPage === page} // 현재 페이지이면 버튼을 비활성화
        />
      ))}
    </div>
  );
};

export default Pages;
