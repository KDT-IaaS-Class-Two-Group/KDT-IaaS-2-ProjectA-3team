import { ListComment } from "./ListComment";

const retrieveComment = (
  postId: string,
  currentPage: number,
  itemsPerPage: number,
  setCommentList: React.Dispatch<React.SetStateAction<ListComment[]>>,
  setTotalPages: React.Dispatch<React.SetStateAction<number>>,) => {
  return fetch(
    `http://localhost:3001/comments/${postId}?page=${currentPage}&limit=${itemsPerPage}`
  )
    .then((response) => response.json())
    .then((data: { comments: ListComment[]; totalPages: number }) => {
      setCommentList(data.comments); // 댓글 데이터
      setTotalPages(data.totalPages); // 총 페이지 수 설정
    })
    .catch((err) => {
      console.error("데이터를 가져오는 중 오류 발생:", err);
    });
}
export default retrieveComment;