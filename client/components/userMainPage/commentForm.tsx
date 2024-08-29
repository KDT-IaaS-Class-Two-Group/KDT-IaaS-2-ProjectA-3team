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
      <div className={styles.commentcontent}>
        {commentList.length > 0 ? (
          commentList.map((comment) => (
            <div key={comment._id}>
              {editState[comment._id] ? (
                <div className={styles.commentcreate}>
                  <TextArea
                    value={comment.content} // 상태 변수 comment의 content 속성 전달
                    placeholder="댓글 수정하세요." // placeholder 텍스트 설정
                    onChange={(e) => {
                      const newContent = e.target.value;
                      setCommentList((prevList) => prevList.map((c) => c._id === comment._id
                        ? { ...c, content: newContent }
                        : c
                      )
                      );
                    } }
                    className={styles.commenttext} 
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
