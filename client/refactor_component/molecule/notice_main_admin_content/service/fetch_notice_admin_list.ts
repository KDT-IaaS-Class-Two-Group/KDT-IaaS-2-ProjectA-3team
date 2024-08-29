import { ListNotice } from "../interface/notice_admin_props";

const fetchNotices = (setAuthList: React.Dispatch<React.SetStateAction<ListNotice[]>>) => {
  return fetch("http://localhost:3001/authnotices")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setAuthList(data);
    })
    .catch((err) => {
      console.error("데이터를 가져오는 중 오류 발생:", err);
    });
};
export default fetchNotices;