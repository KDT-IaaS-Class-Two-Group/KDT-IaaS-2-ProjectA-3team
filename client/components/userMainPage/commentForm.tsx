import React, { useEffect, useState } from "react";
import { greenButton, blueButton } from "client/styles/templatebutton.css";
import * as styles from "../../styles/notice/notice.css";
import retrieveComment from "./commentFormModule/fetchCommentRetrieve"
import { ListComment } from "./commentFormModule/ListComment";
import { CommentFormProps } from "./commentFormModule/CommentFormProps";
import commentSend from "./commentFormModule/fetchCommentSend";
import commentUpdate from "./commentFormModule/commentUpdate";
import commentDelete from "./commentFormModule/commentDelete";

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState<ListComment[]>([]); // 서버에서 건너오는 댓글 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const itemsPerPage = 3; // 한 페이지당 항목 수
  const [editState, setEditState] = useState<{ [key: string]: boolean }>({}); // 댓글 수정 상태

  const fetchComment = () => {
    retrieveComment(postId, currentPage, itemsPerPage, setCommentList, setTotalPages)
  };

  useEffect(() => {
    fetchComment(); // 컴포넌트가 처음 렌더링될 때 데이터 fetch
  }, [postId, currentPage]); // currentPage가 변경될 때마다 fetch

  const sendComment = () =>{
    commentSend(postId, comment, setComment, fetchComment);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 페이지 변경
  };

  const updateComment = (postId: string, newContent: string) => {
    commentUpdate(postId, newContent, fetchComment, setEditState);
  }

  const deleteComment = (postId:string) => {
    commentDelete(postId, fetchComment)
  }

  return (
    <div>
      <div className={styles.commentcreate}>
        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 작성하세요."
            className={styles.commenttext}
          />
        </div>
        <div>
          <button onClick={sendComment} className={greenButton}>
            댓글 작성
          </button>
        </div>
      </div>
      <div className={styles.commentcontent}>
        {commentList.length > 0 ? (
          commentList.map((comment) => (
            <div key={comment._id}>
              {editState[comment._id] ? (
                <div className={styles.commentcreate}>
                  <textarea
                    value={comment.content}
                    placeholder="댓글 수정하세요."
                    onChange={(e) => {
                      const newContent = e.target.value;
                      setCommentList((prevList) =>
                        prevList.map((c) =>
                          c._id === comment._id
                            ? { ...c, content: newContent }
                            : c
                        )
                      );
                    }}
                  />
                  <button
                    onClick={() => updateComment(comment._id, comment.content)}
                    className={blueButton}
                  >
                    수정 완료
                  </button>
                </div>
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
                  <div className={styles.commentbtn}>
                    <div>
                      <button
                        onClick={() =>
                          setEditState((prevState) => ({
                            ...prevState,
                            [comment._id]: true, // 선택한 댓글만 수정 모드로 설정
                          }))
                        }
                        className={greenButton}
                      >
                        수정
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => deleteComment(comment._id)}
                        className={greenButton}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>댓글 없음</div>
        )}
      </div>
      {/* 페이징 버튼 UI */}
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default CommentForm;
