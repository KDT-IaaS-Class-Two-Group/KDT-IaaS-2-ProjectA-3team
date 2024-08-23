import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as styles from "../../styles/notice/notice.css";
import { centeredflexrowcontainergap } from "client/styles/standardcontainer.css";
import { ListNotice } from "./noticeMainContentModule/interfaceType";
import fetchNotices from "./noticeMainContentModule/fetchNotice";

/**
 * * Function : NoticeMainContent
 * 작성자 : @yun-21 / 2024-08-01
 * 편집자 : @yun-21 / 2024-08-23
 * Issue : 
 * @function NoticeMainContent
 * @description 

 */
const NoticeMainContent = () => {
  const [userList, setUserList] = useState<ListNotice[]>([]); // empolyee 서버에서 건너오는 게시물 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const itemsPerPage = 5; // 한 페이지당 항목 수

  useEffect(() => {
    fetchNotices(currentPage, itemsPerPage, setUserList, setTotalPages);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 페이지 변경
  };

  return (
    <>
      <div className={styles.usercontentdiv}>
        {userList.length > 0 ? (
          userList.map((notice, index) => (
            <div key={notice._id}>
              <Link
                href={`/notice/${notice._id}`}
                className={styles.uploadbutton}
              >
                <div className={styles.noticelengh}>
                  <p className={styles.TagSize}>
                    {index + 1 + (currentPage - 1) * itemsPerPage + "."}
                  </p>
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
      <div className={centeredflexrowcontainergap}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
              className={styles.pagebutton}
            >
              {page}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default NoticeMainContent;
