const commentSend = (postId: string, comment: string, setComment: React.Dispatch<React.SetStateAction<string>>, fetchComment: () => void) => {
  // 댓글 추가 API 호출
  fetch(`http://localhost:3001/comments/${postId}`, {
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
export default commentSend;