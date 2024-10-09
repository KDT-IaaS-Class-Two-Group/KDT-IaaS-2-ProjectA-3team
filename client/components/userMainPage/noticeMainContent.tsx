import React, { useState, useEffect } from "react";
import Link from "next/link";
import { tdn } from "client/styles/templatebutton.css";
import { hovertextstyle } from "client/styles/notice/mainnotice.css";

interface ListNotice {
  _id: string;
  title: string;
  user_id: string;
  createdAt: string;
}

const NoticeMainContent = () => {
  const [userList, setUserList] = useState<ListNotice[]>([]); // empolyee 서버에서 건너오는 게시물 데이터

  useEffect(() => {
    const fetchNotices = () => {
      fetch("http://localhost:3001/homenotice/user")
        .then((response) => response.json())
        .then((data: ListNotice[]) => setUserList(data))
        .catch((err) => {
          console.error("데이터를 가져오는 중 오류 발생:", err);
        });
    };
    fetchNotices(); // 컴포넌트가 처음 렌더링될 때 데이터 fetch
  }, []);

  const displayedNotices = userList.slice(0, 3);

  return (
    <div>
      {displayedNotices.length > 0 ? (
        displayedNotices.map((notice, index) => (
          <div key={notice._id}>
            <Link href={`/notice/${notice._id}`} className={tdn}>
              <div className={hovertextstyle}>
                <p>{index + 1 + "."}</p>
                <p>{notice.title}</p>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div>게시물 없음</div>
      )}
    </div>
  );
};

export default NoticeMainContent;
