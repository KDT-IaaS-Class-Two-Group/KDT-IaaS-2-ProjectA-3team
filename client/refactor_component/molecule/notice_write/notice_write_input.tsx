import React from "react";
import Input from "client/refactor_component/atom/input/input";
import * as styles from "client/styles/notice/notice.css";

const TitleInput: React.FC<{
  value: string;
  onChange: (ele: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, onChange }) => {
  return (
    <div className={styles.checksize}>
      <Input
        id="title"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="글 제목"
        className={styles.inputSize}
      />
    </div>
  );
};

export default TitleInput;
