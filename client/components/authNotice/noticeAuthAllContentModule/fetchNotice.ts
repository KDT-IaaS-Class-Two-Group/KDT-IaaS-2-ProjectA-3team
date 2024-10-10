import { ListNotice } from "../noticeAuthContentModule/interfaceType";

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
