const commentSend = async (
  postId: string,
  comment: string,
  setComment: React.Dispatch<React.SetStateAction<string>>,
  fetchComment: () => void
) => {
  try {
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
  } catch (error) {
    console.error("댓글 작성 중 오류 발생:", error);
  }
};

export default commentSend;
