import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as styles from "../../styles/notice/notice.css";
import fetchNotices from "./noticeAuthContentModule/fetchNotice";
import { ListNotice } from "./noticeAuthContentModule/interfaceType";

const NoticeAuthContent = () => {
  const [authList, setAuthList] = useState<ListNotice[]>([]); // auth 서버에서 건너오는 게시물 데이터

  useEffect(() => {
    fetchNotices(setAuthList);
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
