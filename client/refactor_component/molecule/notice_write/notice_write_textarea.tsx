import React from "react";
import TextArea from "client/refactor_component/atom/text_area/text_area";
import * as styles from "client/styles/notice/notice.css";

const ContentTextArea: React.FC<{
  value: string;
  onChange: (ele: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ value, onChange }) => {
  return (
    <div className={styles.testsize}>
      <TextArea
        value={value}
        onChange={onChange}
        name="content"
        id="content"
        placeholder="글 내용"
        className={styles.textareaSize}
      />
    </div>
  );
};

export default ContentTextArea;
