import React from "react";
import Button from "client/refactor_component/atom/button/button";
import { greenButton } from "client/styles/templatebutton.css";

interface PagesProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const Pages: React.FC<PagesProps> = ({
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  return (
    <>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <Button
            key={page}
            button_text={page.toString()} // 페이지 번호를 문자열로 설정
            button_style={greenButton}
            onClick={() => handlePageChange(page)} // 페이지 변경 함수 호출
            disabled={currentPage === page} // 현재 페이지인 경우 버튼 비활성화
          />
        )
      )}
    </>
  );
};

export default Pages;
