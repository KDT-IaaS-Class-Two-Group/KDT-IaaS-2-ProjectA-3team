import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as styles from "../../styles/notice/notice.css";

interface ListNotice {
  _id: string;
  title: string;
  user_id: string;
  createdAt: string;
}

const NoticeAuthContent = () => {
  const [authList, setAuthList] = useState<ListNotice[]>([]); // auth 서버에서 건너오는 게시물 데이터

  useEffect(() => {
    const fetchNotices = () => {
      fetch("http://localhost:3001/authnotices")
        .then((response) => {
          return response.json();
        })
        .then((data: ListNotice[]) => {
          setAuthList(data);
        })
        .catch((err) => {
          console.error("데이터를 가져오는 중 오류 발생:", err);
        });
    };
    fetchNotices(); //컴포넌트가 처음 렌더링될 때 데이터 fetch
  }, []);

  return (
    <div className={styles.authcontentdiv}>
      {authList.length > 0 ? (
        authList.map((notice, index) => (
          <div key={notice._id}>
            <Link
              href={`/noticeAuth/${notice._id}`}
              className={styles.uploadbutton}
            >
              <div className={styles.noticelengh}>
                <p className={styles.TagSize}>{index + 1 + "."}</p>
                <p className={styles.pTagTitletext}>{notice.title}</p>
                <p className={styles.TagSize}>{notice.user_id}</p>
                <p className={styles.TagSize}>{notice.createdAt}</p>
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

export default NoticeAuthContent;
