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
