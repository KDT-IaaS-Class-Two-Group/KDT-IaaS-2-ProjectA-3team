/**
 * @function commentSend
 * @description
 * 주어진 게시물 ID와 댓글 내용을 서버로 전송하여 댓글을 추가합니다. 댓글 추가 후에는 폼을 초기화하고 댓글 목록을 새로고침합니다.
 *
 * @param {string} postId - 댓글을 추가할 게시물의 고유 식별자입니다.
 * @param {string} comment - 추가할 댓글의 내용입니다.
 * @param {React.Dispatch<React.SetStateAction<string>>} setComment - 댓글 입력 폼을 초기화하는 함수입니다.
 * @param {() => void} fetchComment - 댓글 추가 후 댓글 목록을 새로고침하는 함수입니다.
 *
 * @returns {Promise<void>} - 비동기 작업을 수행하며, 성공 시 아무것도 반환하지 않습니다.
 */
const commentSend = async (
  postId: string,
  comment: string,
  setComment: React.Dispatch<React.SetStateAction<string>>,
  fetchComment: () => void
) => {
  try {
    // 댓글 추가 API 호출
    await fetch(`http://localhost:3001/comments/${postId}`, {
      method: "POST", // HTTP 메서드는 POST로 설정하여 댓글을 추가합니다.
      headers: {
        "Content-Type": "application/json", // 요청 본문이 JSON 형식임을 명시합니다.
      },
      credentials: "include", // 쿠키를 포함하여 인증된 요청을 보냅니다.
      body: JSON.stringify({ content: comment }), // 댓글 내용을 JSON 문자열로 변환하여 본문에 포함합니다.
    });

    setComment(""); // 폼 초기화
    fetchComment(); // 댓글 추가 후 데이터 새로고침
  } catch (error) {
    console.error("댓글 작성 중 오류 발생:", error);
  }
};

export default commentSend;
