import React from "react";
import CommentEditing from "client/refactor_component/molecule/notice_comment/comment_editing";
import Edit from "client/refactor_component/molecule/notice_comment/comment_edit";
import * as styles from "../../../styles/notice/notice.css";
import { ListComment } from "client/refactor_component/molecule/notice_comment/interface/list_comment";

interface CommentListProps {
  commentList: ListComment[];
  editState: { [key: string]: boolean };
  setEditState: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  updateComment: (commentId: string, newContent: string) => void;
  setCommentList: React.Dispatch<React.SetStateAction<ListComment[]>>;
  deleteComment: (commentId: string) => void;
}

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
      {commentList.length > 0 ? (
        commentList.map((comment) => (
          <div key={comment._id}>
            {editState[comment._id] ? (
              <CommentEditing
                comment={comment}
                updateComment={updateComment}
                setCommentList={setCommentList}
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
                  setEditState={setEditState}
                  deleteComment={deleteComment}
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
