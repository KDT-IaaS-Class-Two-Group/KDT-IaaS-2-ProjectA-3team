import React from "react";
import Button from "client/refactor_component/atom/button/button";
import * as styles from "../../../styles/notice/notice.css";
import { centeredflexrowcontainergap } from "client/styles/standardcontainer.css";

interface PagesProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pages: React.FC<PagesProps> = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className={centeredflexrowcontainergap}>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <Button
          key={page}
          button_text={page.toString()}
          button_style={styles.pagebutton}
          onClick={() => onPageChange(page)}
          disabled={currentPage === page}
        />
      ))}
    </div>
  );
};

export default Pages;
