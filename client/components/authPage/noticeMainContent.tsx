import React, { useState, useEffect } from "react";

interface ListNotice {
  list_num: string;
  title: string;
  content: string;
}

/**
 * * Function : NoticeMainContent
 * 작성자 : @yun-21 / 2024-08-01
 * 편집자 : @yun-21 / 2024-08-01
 * Issue : yun-21
 * @function NoticeMainContent
 * @description 

 */
const NoticeMainContent = () => {
  const [list, setList] = useState<ListNotice[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/notices")
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 응답에 문제가 있습니다.");
        }
        return response.json();
      })
      .then((data: ListNotice[]) => {
        setList(data);
      })
      .catch((err) => {
        console.error("데이터를 가져오는 중 오류 발생:", err);
      });
  }, []);

  return (
    <div>
      {list.length > 0 ? (
        list.map((notice) => (
          <div key={notice.list_num}>
            <h3>{notice.title}</h3>
            <p>{notice.content}</p>
          </div>
        ))
      ) : (
        <div>게시물 없음</div>
      )}
    </div>
  );
};

export default NoticeMainContent;
