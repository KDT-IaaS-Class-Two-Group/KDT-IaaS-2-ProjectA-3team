import React, { useEffect, useState } from "react";
import * as styles from "../../../styles/notice/notice.css";
import retrieveComment from "client/refactor_component/molecule/notice_comment/hook/fetch_comment_retrieve"
import { ListComment } from "client/refactor_component/molecule/notice_comment/interface/list_comment";
import { CommentFormProps } from "client/refactor_component/molecule/notice_comment/interface/comment_form_props";
import commentSend from "client/refactor_component/molecule/notice_comment/hook/fetch_comment_send";
import commentUpdate from "client/refactor_component/molecule/notice_comment/hook/fetch_comment_update";
import commentDelete from "client/refactor_component/molecule/notice_comment/hook/fetch_comment_delete";
import CommentWrite from "client/refactor_component/molecule/notice_comment/comment_write"
import CommentList from "client/refactor_component/organism/notice_comment/comment_list";
import CommentPages from "client/refactor_component/molecule/notice_comment/comment_pages"


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
        <CommentList
          commentList={commentList}
          editState={editState}
          setEditState={setEditState}
          updateComment={updateComment}
          setCommentList={setCommentList}
          deleteComment={deleteComment}
        />
      </div>
      <div>
        <CommentPages
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default CommentForm;
