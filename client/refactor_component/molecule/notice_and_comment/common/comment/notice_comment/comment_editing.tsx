import React from "react";
import Button from "client/refactor_component/atom/button/button";
import TextArea from "client/refactor_component/atom/text_area/text_area";
import * as styles from "client/styles/notice/notice.css";
import { blueButton } from 'client/styles/templatebutton.css';
import { ListComment } from "./interface/list_comment";
/**
 * @function CommentEditing
 * @description
 * 댓글을 수정할 수 있는 컴포넌트입니다. `TextArea`를 통해 댓글 내용을 수정할 수 있으며, "수정 완료" 버튼을 클릭하면 댓글이 업데이트됩니다.
 * 
 * @param {{
*  _id: string;
*  content: string;
* }} comment - 수정할 댓글의 ID와 현재 내용을 포함하는 객체입니다.
* @param {(commentId: string, newContent: string) => void} updateComment - 댓글을 업데이트하는 함수입니다.
* @param {React.Dispatch<React.SetStateAction<ListComment[]>>} setCommentList - 댓글 목록을 업데이트하는 함수입니다.
* 
* @returns {JSX.Element} - 댓글 수정 UI를 포함한 JSX 엘리먼트를 반환합니다.
*/
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
          const newContent = e.target.value; // 텍스트 변경 시 새로운 댓글 내용 저장
          setCommentList((prevList) => prevList.map((c) => c._id === comment._id  // 현재 댓글 ID와 일치하는 댓글 찾기
            ? { ...c, content: newContent } : c  // 댓글 내용 업데이트
          ));
        }}
        className={styles.commenttext} 
      />
      <Button
        button_text="수정 완료"
        button_style={blueButton}
        onClick={() => updateComment(comment._id, comment.content)} // 클릭 시 댓글 업데이트 함수 호출
      />
    </div>
  );
};

export default CommentEditing;