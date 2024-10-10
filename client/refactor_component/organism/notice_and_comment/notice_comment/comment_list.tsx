import React from "react";
import CommentEditing from "client/refactor_component/molecule/notice_and_comment/common/comment/notice_comment/comment_editing";
import Edit from "client/refactor_component/molecule/notice_and_comment/common/comment/notice_comment/comment_edit";
import * as styles from "client/styles/notice/notice.css";
import { ListComment } from "client/refactor_component/molecule/notice_and_comment/common/comment/notice_comment/interface/list_comment";

/**
 * @interface CommentListProps
 * @description 댓글 리스트 컴포넌트에 필요한 속성들을 정의한 인터페이스
 *
 * @property {ListComment[]} commentList - 댓글 리스트
 * @property {{ [key: string]: boolean }} editState - 댓글 수정 상태를 관리하는 객체
 * @property {React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>} setEditState - 댓글 수정 상태를 설정하는 함수
 * @property {(commentId: string, newContent: string) => void} updateComment - 댓글 내용을 업데이트하는 함수
 * @property {React.Dispatch<React.SetStateAction<ListComment[]>>} setCommentList - 댓글 리스트 상태를 설정하는 함수
 * @property {(commentId: string) => void} deleteComment - 댓글 삭제 함수
 */
interface CommentListProps {
  commentList: ListComment[];
  editState: { [key: string]: boolean };
  setEditState: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  updateComment: (commentId: string, newContent: string) => void;
  setCommentList: React.Dispatch<React.SetStateAction<ListComment[]>>;
  deleteComment: (commentId: string) => void;
}
/**
 * @function CommentList
 * @description
 * 댓글 리스트를 화면에 표시하는 컴포넌트.
 * 각 댓글은 수정 상태에 따라 '수정 모드'와 '보기 모드'로 나누어 렌더링되며,
 * 댓글이 없을 경우 '댓글 없음' 메시지를 표시합니다.
 *
 * @param {CommentListProps} props - 댓글 리스트와 관련된 속성을 전달받습니다.
 * @returns {JSX.Element} 댓글 리스트를 보여주는 JSX
 */
const CommentList: React.FC<CommentListProps> = ({
  commentList,
  editState,
  setEditState,
  updateComment,
  setCommentList,
  deleteComment,
}) => {
  return (
    <>
      {commentList.length > 0 ? ( // 댓글이 존재할 때
        commentList.map((comment) => (
          <div key={comment._id}>
            {editState[comment._id] ? ( // 댓글 수정 상태에 따른 조건부
              <CommentEditing
                comment={comment}
                updateComment={updateComment} // 댓글 수정 함수 전달
                setCommentList={setCommentList} // 댓글 목록 상태 함수
              />
            ) : (
              <div className={styles.commentinnercontent}>
                <div>
                  <div className={styles.commentcreate}>
                    <div className={styles.comment}>{comment.content}</div>
                    <div>
                      <div>{comment.userId}</div>
                      <div>{comment.createdAt}</div>
                    </div>
                  </div>
                </div>
                <Edit
                  commentId={comment._id}
                  setEditState={setEditState} // 수정상태 변경 함수
                  deleteComment={deleteComment} // 댓글 삭제 함수
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <div>댓글 없음</div>
      )}
    </>
  );
};

export default CommentList;
