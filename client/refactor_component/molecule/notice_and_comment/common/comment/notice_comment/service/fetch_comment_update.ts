const commentUpdate = (postId: string, newContent: string, fetchComment: () => void, setEditState: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>) => {
  return fetch(`http://localhost:3001/comments/${postId}`, {
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
export default commentUpdate;