/**
 * @function commentUpdate
 * @description
 * 주어진 게시물 ID와 새로운 댓글 내용을 서버로 전송하여 댓글을 업데이트합니다. 댓글 수정 후에는 데이터 새로고침과 수정 모드 비활성화를 처리합니다.
 * 
 * @param {string} postId - 수정할 댓글이 포함된 게시물의 고유 식별자입니다.
 * @param {string} newContent - 새로 업데이트할 댓글 내용입니다.
 * @param {() => void} fetchComment - 댓글 수정 후 댓글 목록을 새로고침하는 함수입니다.
 * @param {React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>} setEditState - 댓글 수정 모드를 관리하는 함수입니다.
 * 
 * @returns {Promise<void>} - 비동기 작업을 수행하며, 성공 시 아무것도 반환하지 않습니다.
 */
const commentUpdate = (postId: string, newContent: string, fetchComment: () => void, setEditState: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>) => {
  return fetch(`http://localhost:3001/comments/${postId}`, {
    method: "PUT", // HTTP 메서드는 PUT으로 설정하여 댓글을 업데이트합니다.
    headers: { "Content-Type": "application/json" }, // 요청 본문이 JSON 형식임을 명시합니다.
    credentials: "include", // 쿠키를 포함하여 인증된 요청을 보냅니다.
    body: JSON.stringify({ content: newContent }), // 새로운 댓글 내용을 JSON 문자열로 변환하여 본문에 포함합니다.
  })
    .then((response) => response.text()) // 서버에서 반환한 텍스트 값을 받음
    .then((text) => {
      if (text === "true") { // 서버가 "true"를 반환하면 업데이트 성공으로 간주합니다.
        fetchComment(); // 댓글 수정 후 데이터 새로고침
        setEditState((prevState) => ({
          ...prevState,
          [postId]: false, // 수정 완료 후 수정 모드 비활성화
        }));
      } else {
        alert("댓글 수정에 실패했습니다.");
        window.location.reload(); // 페이지를 새로고침하여 UI를 초기 상태로 복원합니다.
      }
    })
    .catch((error) => {
      console.error("댓글 수정 중 오류 발생:", error);
      alert("댓글 수정 중 오류 발생");
    });
};
export default commentUpdate;