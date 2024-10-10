import { ListNotice } from "../interface/notice_admin_all.interface";

/**
 * @function fetchNotices
 * @description 현재 페이지와 페이지당 항목 수를 기반으로 공지사항을 서버에서 가져오고,
 * 가져온 데이터를 상태로 업데이트하는 함수입니다.
 * @param {number} currentPage - 현재 페이지 번호입니다.
 * @param {number} itemsPerPage - 페이지당 항목 수입니다.
 * @param {React.Dispatch<React.SetStateAction<ListNotice[]>>} setUserList - 공지사항 목록을 설정하는 상태 업데이트 함수입니다.
 * @param {React.Dispatch<React.SetStateAction<number>>} setTotalPages - 총 페이지 수를 설정하는 상태 업데이트 함수입니다.
 * @returns {Promise<void>} - Promise를 반환합니다. 성공적으로 데이터를 가져오면 상태가 업데이트됩니다.
 */
const fetchNotices = (
  currentPage: number,
  itemsPerPage: number,
  setUserList: React.Dispatch<React.SetStateAction<ListNotice[]>>,
  setTotalPages: React.Dispatch<React.SetStateAction<number>>
) => {
  return fetch(
    `http://localhost:3001/authnotice/all?page=${currentPage}&limit=${itemsPerPage}`
  )
    .then((response) => {
      // 서버 응답을 JSON 형태로 변환
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
