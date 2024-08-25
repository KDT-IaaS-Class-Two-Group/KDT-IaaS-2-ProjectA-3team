import React, { useEffect, useState } from "react";
import { greenButton, blueButton } from "client/styles/templatebutton.css";
import * as styles from "../../styles/notice/notice.css";
import retrieveComment from "./commentFormModule/fetchCommentRetrieve";
import { ListComment } from "./commentFormModule/ListComment";
import { CommentFormProps } from "./commentFormModule/CommentFormProps";
import commentSend from "./commentFormModule/fetchCommentSend";
import commentUpdate from "./commentFormModule/commentUpdate";
import commentDelete from "./commentFormModule/commentDelete";
import Button from "client/refactor_component/atom/button/button";
import TextArea from "client/refactor_component/atom/text_area/text_area";

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
        <div>
          <TextArea className={styles.commenttext} children={comment} />
        </div>
        <div>
          <Button
            button_text="댓글 작성"
            button_style={greenButton}
            onClick={sendComment}
          />
        </div>
      </div>
      <div className={styles.commentcontent}>
        {commentList.length > 0 ? (
          commentList.map((comment) => (
            <div key={comment._id}>
              {editState[comment._id] ? (
                <div className={styles.commentcreate}>
                  <TextArea
                    className={styles.commenttext}
                    children={comment.content}
                  />
                  <Button
                    button_text="수정 완료"
                    button_style={blueButton}
                    onClick={() => updateComment(comment._id, comment.content)}
                  />
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
                      <Button
                        button_text="수정"
                        button_style={greenButton}
                        onClick={() =>
                          setEditState((prevState) => ({
                            ...prevState,
                            [comment._id]: true,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Button
                        button_text="삭제"
                        button_style={greenButton}
                        onClick={() => deleteComment(comment._id)}
                      />
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
    </>
  );
};

export default CommentForm;
