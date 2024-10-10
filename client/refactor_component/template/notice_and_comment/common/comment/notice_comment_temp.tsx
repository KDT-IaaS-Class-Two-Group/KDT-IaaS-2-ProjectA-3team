import React, { useEffect, useState } from "react";
import * as styles from "client/styles/notice/notice.css";
import retrieveComment from "client/refactor_component/molecule/notice_and_comment/common/comment/notice_comment/service/fetch_comment_retrieve";
import { ListComment } from "client/refactor_component/molecule/notice_and_comment/common/comment/notice_comment/interface/list_comment";
import { CommentFormProps } from "client/refactor_component/molecule/notice_and_comment/common/comment/notice_comment/interface/comment_form_props";
import commentSend from "client/refactor_component/molecule/notice_and_comment/common/comment/notice_comment/service/fetch_comment_send";
import commentUpdate from "client/refactor_component/molecule/notice_and_comment/common/comment/notice_comment/service/fetch_comment_update";
import commentDelete from "client/refactor_component/molecule/notice_and_comment/common/comment/notice_comment/service/fetch_comment_delete";
import CommentWrite from "client/refactor_component/molecule/notice_and_comment/common/comment/notice_comment/comment_write";
import CommentList from "client/refactor_component/organism/notice_and_comment/notice_comment/comment_list";
import CommentPages from "client/refactor_component/molecule/notice_and_comment/common/comment/notice_comment/comment_pages";

/**
 * @function CommentForm
 * @description 댓글 리스트를 가져오고 관리하는 컴포넌트
 */
const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [comment, setComment] = useState(""); // 댓글 상태
  const [commentList, setCommentList] = useState<ListComment[]>([]); // 서버에서 건너오는 댓글 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const itemsPerPage = 3; // 한 페이지당 항목 수
  const [editState, setEditState] = useState<{ [key: string]: boolean }>({}); // 댓글 수정 상태

  /**
   * @function fetchComment
   * @description 서버에서 댓글 데이터를 가져오는 함수
   */
  const fetchComment = () => {
    retrieveComment(
      postId,
      currentPage,
      itemsPerPage,
      setCommentList,
      setTotalPages
    );
  };

  // 컴포넌트가 처음 마운트될 때 및 페이지나 게시물이 바뀔 때마다 fetch 호출
  useEffect(() => {
    fetchComment(); // 컴포넌트가 처음 렌더링될 때 데이터 fetch
  }, [postId, currentPage]); // currentPage가 변경될 때마다 fetch

  /**
   * @function sendComment
   * @description 새로운 댓글을 서버에 전송하는 함수
   */
  const sendComment = () => {
    commentSend(postId, comment, setComment, fetchComment);
  };

  /**
   * @function pageChange
   * @description 페이지 변경 시 호출되는 함수
   */
  const pageChange = (page: number) => {
    setCurrentPage(page); // 페이지 변경
  };

  /**
   * @function updateComment
   * @description 댓글을 수정하는 함수
   * @param {string} postId - 댓글이 달린 게시물의 ID
   * @param {string} newContent - 수정된 댓글 내용
   */
  const updateComment = (postId: string, newContent: string) => {
    commentUpdate(postId, newContent, fetchComment, setEditState);
  };

  /**
   * @function deleteComment
   * @description 댓글을 삭제하는 함수
   * @param {string} postId - 삭제할 댓글의 게시물 ID
   */
  const deleteComment = (postId: string) => {
    commentDelete(postId, fetchComment);
  };

  return (
    <>
      {/* 댓글 작성 */}
      <div className={styles.commentcreate}>
        <CommentWrite
          comment={comment}
          setComment={setComment}
          sendComment={sendComment}
        />
      </div>
      {/* 댓글 목록 */}
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
      {/* 댓글 페이지네이션 */}
      <div>
        <CommentPages
          totalPages={totalPages}
          currentPage={currentPage}
          pageChange={pageChange}
        />
      </div>
    </>
  );
};

export default CommentForm;
