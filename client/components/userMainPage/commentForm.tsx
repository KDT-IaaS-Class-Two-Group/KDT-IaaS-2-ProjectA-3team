import React, { useEffect, useState } from "react";
import { greenButton, blueButton } from "client/styles/templatebutton.css";
import * as styles from "../../styles/notice/notice.css";
import retrieveComment from "./commentFormModule/fetchCommentRetrieve"
import { ListComment } from "./commentFormModule/ListComment";

interface CommentFormProps {
  postId: string;
}

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

  const commentSend = async (event: React.FormEvent) => {
    event.preventDefault();
    // 댓글 추가 API 호출
    await fetch(`http://localhost:3001/comments/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ content: comment }),
    });
    setComment(""); // 폼 초기화
    fetchComment(); // 댓글 추가 후 데이터 새로고침
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 페이지 변경
  };

  const commentUpdate = async (postId: string, newContent: string) => {
    fetch(`http://localhost:3001/comments/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ content: newContent }),
    })
      .then((response) => response.text()) // 서버에서 반환한 텍스트 값을 받음
      .then((text) => {
        if (text === "true") {
          fetchComment(); // 댓글 수정 후 데이터 새로고침
          setEditState((prevState) => ({
            ...prevState,
            [postId]: false, // 수정 완료 후 수정 모드 비활성화
          }));
        } else {
          alert("댓글 수정에 실패했습니다.");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("댓글 수정 중 오류 발생:", error);
        alert("댓글 수정 중 오류 발생");
      });
  };

  const commentDelete = async (postId: string) => {
    fetch(`http://localhost:3001/comments/${postId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.text()) // 서버에서 반환한 텍스트 값을 받음
      .then((text) => {
        if (text === "true") {
          fetchComment(); // 댓글 삭제 후 데이터 새로고침
        } else {
          alert("댓글 삭제에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("댓글 삭제 중 오류 발생:", error);
        alert("댓글 삭제 중 오류 발생");
      });
  };

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
          <button onClick={commentSend} className={greenButton}>
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
                    onClick={() => commentUpdate(comment._id, comment.content)}
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
                        onClick={() => commentDelete(comment._id)}
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
