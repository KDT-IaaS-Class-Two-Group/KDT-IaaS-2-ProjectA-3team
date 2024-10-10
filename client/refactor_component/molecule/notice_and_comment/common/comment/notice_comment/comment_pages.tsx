import React from "react";
import Button from "client/refactor_component/atom/button/button";
import { greenButton } from "client/styles/templatebutton.css";

interface PagesProps {
  totalPages: number;
  currentPage: number;
  pageChange: (page: number) => void;
}

/**
 * @function Pages
 * @description
 * 페이지 네비게이션 버튼을 렌더링하는 컴포넌트입니다. 총 페이지 수에 따라 페이지 번호 버튼을 생성하고,
 * 사용자가 버튼을 클릭하면 페이지 변경 함수가 호출됩니다. 현재 페이지는 비활성화된 버튼으로 표시됩니다.
 *
 * @param {Object} props - 컴포넌트의 props
 * @param {number} props.totalPages - 총 페이지 수
 * @param {number} props.currentPage - 현재 페이지 번호
 * @param {(page: number) => void} props.pageChange - 페이지를 변경하는 함수
 *
 * @returns {JSX.Element} - 페이지 네비게이션 버튼 목록을 포함하는 JSX 엘리먼트를 반환합니다.
 */
const Pages: React.FC<PagesProps> = ({
  totalPages,
  currentPage,
  pageChange,
}) => {
  return (
    <>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <Button
            key={page}
            button_text={page.toString()} // 페이지 번호를 문자열로 설정
            button_style={greenButton}
            onClick={() => pageChange(page)} // 페이지 변경 함수 호출
            disabled={currentPage === page} // 현재 페이지인 경우 버튼 비활성화
          />
        )
      )}
    </>
  );
};

export default Pages;
