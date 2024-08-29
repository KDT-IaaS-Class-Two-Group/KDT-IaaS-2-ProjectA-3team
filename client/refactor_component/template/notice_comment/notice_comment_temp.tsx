import React, { useEffect, useState } from "react";
import { greenButton, blueButton } from "client/styles/templatebutton.css";
import * as styles from "../../../styles/notice/notice.css";
import retrieveComment from "client/refactor_component/molecule/notice_comment/hook/fetch_comment_retrieve"
import { ListComment } from "client/refactor_component/molecule/notice_comment/interface/list_comment";
import { CommentFormProps } from "client/refactor_component/molecule/notice_comment/interface/comment_form_props";
import commentSend from "client/refactor_component/molecule/notice_comment/hook/fetch_comment_send";
import commentUpdate from "client/refactor_component/molecule/notice_comment/hook/fetch_comment_update";
import commentDelete from "client/refactor_component/molecule/notice_comment/hook/fetch_comment_delete";
import CommentWrite from "client/refactor_component/molecule/notice_comment/comment_write"
import CommentEditing from "client/refactor_component/molecule/notice_comment/comment_editing";
import Edit from "client/refactor_component/molecule/notice_comment/comment_edit";

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState<ListComment[]>([]); // 서버에서 건너오는 댓글 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const itemsPerPage = 3; // 한 페이지당 항목 수
  const [editState, setEditState] = useState<{ [key: string]: boolean }>({}); // 댓글 수정 상태

  const fetchComment = () => {
    retrieveComment(
      postId,
      currentPage,
      itemsPerPage,
      setCommentList,
      setTotalPages
    );
  };

  useEffect(() => {
    fetchComment(); // 컴포넌트가 처음 렌더링될 때 데이터 fetch
  }, [postId, currentPage]); // currentPage가 변경될 때마다 fetch

  const sendComment = () => {
    commentSend(postId, comment, setComment, fetchComment);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 페이지 변경
  };

  const updateComment = (postId: string, newContent: string) => {
    commentUpdate(postId, newContent, fetchComment, setEditState);
  };

  const deleteComment = (postId: string) => {
    commentDelete(postId, fetchComment);
  };

  return (
    <>
      <div className={styles.commentcreate}>
        <CommentWrite
          comment={comment}
          setComment={setComment}
          sendComment={sendComment}
        />
      </div>
      <div className={styles.commentcontent}>
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
                    deleteComment={deleteComment} />
                </div>
              )}
            </div>
          ))
        ) : (
          <div>댓글 없음</div>
        )}
      </div>
      {/* 페이징 버튼 UI */}
      {/* <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <Button
              key={page}
              button_text={page.toString()} // 페이지 번호를 문자열로 설정
              button_style={currentPage === page ? `${greenButton}` : greenButton}
              onClick={() => handlePageChange(page)} // 페이지 변경 함수 호출
              disabled={currentPage === page} // 현재 페이지인 경우 버튼 비활성화
            // 버튼 스타일은 부모 컴포넌트에서 설정
            />
          )
        )}
      </div> */}
    </>
  );
};

export default CommentForm;
