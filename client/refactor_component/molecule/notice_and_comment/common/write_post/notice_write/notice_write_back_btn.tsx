import React from "react";
import Button from "client/refactor_component/atom/button/button";
import { greenButton } from "client/styles/templatebutton.css";
import * as styles from "client/styles/notice/notice.css";

const BackBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className={styles.btnsize}>
      <Button button_text="뒤로가기" button_style={greenButton} onClick={onClick} />
    </div>
  );
};

export default BackBtn;
