import React from "react";
import Button from "client/refactor_component/atom/button/button";
import * as styles from "client/styles/notice/notice.css";
import { greenButton } from "client/styles/templatebutton.css";

/**
 * @function Edit
 * @description
 * 댓글의 수정 및 삭제를 위한 버튼을 제공하는 컴포넌트입니다. "수정" 버튼을 클릭하면 수정 모드로 전환되며, "삭제" 버튼을 클릭하면 해당 댓글이 삭제됩니다.
 *
 * @param {string} commentId - 수정하거나 삭제할 댓글의 고유 식별자입니다.
 * @param {React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>} setEditState - 댓글의 수정 모드를 관리하는 함수입니다. 댓글의 수정 모드를 활성화합니다.
 * @param {(commentId: string) => void} deleteComment - 댓글을 삭제하는 함수입니다.
 *
 * @returns {JSX.Element} - 수정 및 삭제 버튼을 포함한 JSX 엘리먼트를 반환합니다.
 */

interface EditProps {
  commentId: string;
  setEditState: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  deleteComment: (commentId: string) => void;
}

const Edit: React.FC<EditProps> = ({
  commentId,
  setEditState,
  deleteComment,
}) => {
  return (
    <div className={styles.commentbtn}>
      <div>
        <Button
          button_text="수정"
          button_style={greenButton}
          onClick={() =>
            setEditState((prevState) => ({
              ...prevState, // 이전 상태를 유지합니다.
              [commentId]: true, // 해당 댓글 ID의 수정 모드를 활성화합니다.
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
