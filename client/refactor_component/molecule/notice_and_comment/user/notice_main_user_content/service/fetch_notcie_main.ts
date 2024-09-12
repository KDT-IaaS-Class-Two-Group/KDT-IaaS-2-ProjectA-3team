import { ListNotice } from "../interface/notice_main_interface";
/**
 * @function fetchNotices
 * @description
 * 현재 페이지와 아이템 수에 맞춰 공지 사항 목록을 서버에서 가져옵니다. 
 * 데이터를 가져온 후 사용자 목록과 총 페이지 수를 업데이트합니다.
 *
 * @param {number} currentPage - 현재 페이지 번호
 * @param {number} itemsPerPage - 페이지당 표시할 항목 수
 * @param {React.Dispatch<React.SetStateAction<ListNotice[]>>} setUserList - 공지 사항 목록을 설정하는 함수
 * @param {React.Dispatch<React.SetStateAction<number>>} setTotalPages - 총 페이지 수를 설정하는 함수
 * @returns {Promise<void>} 서버에서 데이터를 가져와 상태를 업데이트하는 비동기 함수
 */
const fetchNotices = (
  currentPage:number,
  itemsPerPage:number,
  setUserList: React.Dispatch<React.SetStateAction<ListNotice[]>>,
  setTotalPages: React.Dispatch<React.SetStateAction<number>>) => {
  return fetch(
    `http://localhost:3001/notices?page=${currentPage}&limit=${itemsPerPage}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data: { notices: ListNotice[]; totalPages: number }) => {
      setUserList(data.notices); // 게시물 데이터
      setTotalPages(data.totalPages); // 총 페이지 수 설정
    })
    .catch((err) => {
      console.error("데이터를 가져오는 중 오류 발생:", err);
    });
};
export default fetchNotices;