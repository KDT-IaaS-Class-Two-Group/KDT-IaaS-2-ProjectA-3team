import React from "react";
import Button from "client/refactor_component/atom/button/button"; // 버튼 컴포넌트 import
import TextArea from "client/refactor_component/atom/text_area/text_area"; // 텍스트 에어리어 컴포넌트 import
import * as styles from "client/styles/notice/notice.css";
import { greenButton } from 'client/styles/templatebutton.css';

interface CommentCreatingProps {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  sendComment: () => void;
}

/**
 * @function CommentCreating
 * @description
 * 댓글을 작성할 수 있는 입력 폼과 제출 버튼을 렌더링하는 컴포넌트입니다. 
 * 사용자가 텍스트 에어리어에 댓글을 입력하고, "댓글 작성" 버튼을 클릭하면 댓글이 제출됩니다.
 * 
 * @param {Object} props - 컴포넌트의 props
 * @param {string} props.comment - 현재 입력된 댓글 내용
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setComment - 댓글 상태를 업데이트하는 함수
 * @param {() => void} props.sendComment - 댓글을 제출하는 함수
 * 
 * @returns {JSX.Element} - 댓글 작성 폼과 제출 버튼을 포함하는 JSX 엘리먼트를 반환합니다.
 */
const CommentCreating: React.FC<CommentCreatingProps> = ({ comment, setComment, sendComment }) => {
  return (
    <div className={styles.commentcreate}>
      <div>
        <TextArea
          value={comment}                       // 상태 변수를 `value`로 전달
          onChange={(e) => setComment(e.target.value)} // 입력이 변경될 때 상태 업데이트
          placeholder="댓글을 작성하세요."
          className={styles.commenttext}        // 스타일 클래스 적용
        />
      </div>
      <div>
        <Button
          button_text="댓글 작성"
          button_style={greenButton}
          onClick={sendComment}
        />
      </div>
    </div>
  );
};

export default CommentCreating;
