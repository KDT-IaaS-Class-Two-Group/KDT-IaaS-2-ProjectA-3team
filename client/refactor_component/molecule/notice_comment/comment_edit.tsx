import React from "react";
import Button from "client/refactor_component/atom/button/button";
import * as styles from "../../../styles/notice/notice.css";
import { greenButton } from 'client/styles/templatebutton.css';

interface EditProps {
  commentId: string;
  setEditState: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  deleteComment: (commentId: string) => void;
}

const Edit: React.FC<EditProps> = ({ commentId, setEditState, deleteComment }) => {
  return (
    <div className={styles.commentbtn}>
      <div>
        <Button
          button_text="수정"
          button_style={greenButton}
          onClick={() =>
            setEditState((prevState) => ({
              ...prevState,
              [commentId]: true,
            }))
          }
        />
      </div>
      <div>
        <Button
          button_text="삭제"
          button_style={greenButton}
          onClick={() => deleteComment(commentId)}
        />
      </div>
    </div>
  );
};

export default Edit;
