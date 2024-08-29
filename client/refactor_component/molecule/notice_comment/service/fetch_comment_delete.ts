const commentDelete = async (postId: string, fetchComment: () => void) => {
  return fetch(`http://localhost:3001/comments/${postId}`, {
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
export default commentDelete;