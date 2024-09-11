import React from "react";
import Button from "client/refactor_component/atom/button/button";
import TextArea from "client/refactor_component/atom/text_area/text_area";
import * as styles from "client/styles/notice/notice.css";
import { blueButton } from 'client/styles/templatebutton.css';
import { ListComment } from "./interface/list_comment";

interface EditingProps {
  comment: {
    _id: string;
    content: string;
  };
  updateComment: (commentId: string, newContent: string) => void;
  setCommentList: React.Dispatch<React.SetStateAction<ListComment[]>>;
}

const CommentEditing: React.FC<EditingProps> = ({ comment, updateComment, setCommentList }) => {
  return (
    <div className={styles.commentcreate}>
      <TextArea
        value={comment.content} // 상태 변수 comment의 content 속성 전달
        placeholder="댓글 수정하세요." // placeholder 텍스트 설정
        onChange={(e) => {
          const newContent = e.target.value;
          setCommentList((prevList) => prevList.map((c) => c._id === comment._id
            ? { ...c, content: newContent } : c
          ));
        }}
        className={styles.commenttext} 
      />
      <Button
        button_text="수정 완료"
        button_style={blueButton}
        onClick={() => updateComment(comment._id, comment.content)}
      />
    </div>
  );
};

export default CommentEditing;