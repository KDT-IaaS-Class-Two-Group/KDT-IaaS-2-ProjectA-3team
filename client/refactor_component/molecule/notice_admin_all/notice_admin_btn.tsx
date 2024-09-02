import React from "react";
import Button from "client/refactor_component/atom/button/button";
import * as styles from "../../../styles/notice/notice.css";
import { centeredflexrowcontainer } from "client/styles/standardcontainer.css";

interface AdminAllNoticePageBtnProps {
  totalPages : number,
  handlePageChange : (page:number)=>void,
  currentPage : number,
}

const AdminAllNoticePageBtn: React.FC<AdminAllNoticePageBtnProps> = ({totalPages, handlePageChange, currentPage}) => {
  return (
    <div className={centeredflexrowcontainer}>
      {Array.from(
        { length: totalPages },
        (_, index) => index + 1).map((page) => (
        <Button
        key={page}
        button_style={styles.pagebutton}
        onClick={() => handlePageChange(page)}
        disabled={currentPage === page}
        button_text={page.toString()}
        />
        ))}
    </div>
  );
};

export default AdminAllNoticePageBtn;
