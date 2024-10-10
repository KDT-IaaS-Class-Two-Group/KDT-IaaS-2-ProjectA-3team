/**
 * @function commentDelete
 * @description
 * 댓글을 삭제하는 함수입니다. 삭제 요청을 서버에 보내고, 삭제 결과에 따라 데이터를 새로고침하거나 오류를 처리합니다.
 *
 * @param {string} postId - 삭제할 댓글의 고유 식별자입니다.
 * @param {() => void} fetchComment - 댓글 삭제 후 호출될 함수입니다. 일반적으로 댓글 목록을 새로고침하는 용도로 사용됩니다.
 *
 * @returns {Promise<void>} - 비동기 작업을 수행하며, 성공 시 아무것도 반환하지 않습니다.
 */
const commentDelete = async (postId: string, fetchComment: () => void) => {
  return fetch(`http://localhost:3001/comments/${postId}`, {
    method: "DELETE", // HTTP 메소드로 DELETE 요청을 보냅니다.
    credentials: "include", // 쿠키를 포함하여 요청을 보냅니다.
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
