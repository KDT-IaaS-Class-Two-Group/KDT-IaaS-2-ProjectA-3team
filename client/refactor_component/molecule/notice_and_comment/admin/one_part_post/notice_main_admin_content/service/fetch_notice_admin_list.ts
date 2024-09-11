/**
 * @function fetchNotices
 * @description
 * 서버에서 공지사항 데이터를 가져와서 상태를 업데이트하는 함수입니다.
 * 
 * @param {React.Dispatch<React.SetStateAction<ListNotice[]>>} setAuthList - 공지사항 목록을 업데이트하는 상태 변경 함수입니다.
 * 
 * @returns {Promise<void>} - 데이터를 가져오는 작업이 완료된 후 반환되는 프로미스입니다.
 * 
 * @throws {Error} - 데이터 fetching 중 발생한 오류를 콘솔에 출력합니다.
 */
import { ListNotice } from "../interface/notice_admin_props";

const fetchNotices = (setAuthList: React.Dispatch<React.SetStateAction<ListNotice[]>>) => {
  return fetch("http://localhost:3001/authnotice")
    .then((response) => {
      // 서버로부터 응답을 JSON 형식으로 변환
      return response.json();
    })
    .then((data) => {
      // 변환된 데이터를 setAuthList를 통해 상태에 업데이트
      setAuthList(data);
    })
    .catch((err) => {
      console.error("데이터를 가져오는 중 오류 발생:", err);
    });
};
export default fetchNotices;