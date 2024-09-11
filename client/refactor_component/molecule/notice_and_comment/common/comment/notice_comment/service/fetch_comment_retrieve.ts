import { ListComment } from "../interface/list_comment";

/**
 * @function retrieveComment
 * @description
 * 주어진 게시물 ID에 대해 댓글 데이터를 서버에서 가져와서 상태를 업데이트합니다. 페이지네이션을 지원하여 특정 페이지의 댓글을 조회합니다.
 * 
 * @param {string} postId - 댓글을 가져올 게시물의 고유 식별자입니다.
 * @param {number} currentPage - 현재 페이지 번호입니다.
 * @param {number} itemsPerPage - 한 페이지에 표시할 댓글 수입니다.
 * @param {React.Dispatch<React.SetStateAction<ListComment[]>>} setCommentList - 댓글 데이터를 업데이트하는 함수입니다.
 * @param {React.Dispatch<React.SetStateAction<number>>} setTotalPages - 총 페이지 수를 업데이트하는 함수입니다.
 * 
 * @returns {Promise<void>} - 비동기 작업을 수행하며, 성공 시 아무것도 반환하지 않습니다.
 */
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