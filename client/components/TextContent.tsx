import React, { useState, useEffect } from "react";
import Link from "next/link";
interface ListNotice {
  _id: string;
  title: string;
  user_id: string;
  createdAt: string;
}

const NoticeAuthAllContent = () => {
  const [userList, setUserList] = useState<ListNotice[]>([]); // admin 서버에서 건너오는 게시물 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const itemsPerPage = 10; // 한 페이지당 항목 수

  useEffect(() => {
    const fetchNotices = () => {
      fetch(
        `http://localhost:3001/authallnotices?page=${currentPage}&limit=${itemsPerPage}`
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
    fetchNotices(); //컴포넌트가 처음 렌더링될 때 데이터 fetch
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 페이지 변경
  };

  return (
    <div>
      {userList.length > 0 ? (
        userList.map((notice, index) => (
          <div key={notice._id}>
            <h3>{index + 1 + (currentPage - 1) * itemsPerPage}</h3>
            <h3>{notice.title}</h3>
            <h3>{notice.user_id}</h3>
            <h3>{notice.createdAt}</h3>
          </div>
        ))
      ) : (
        <div>게시물 없음</div>
      )}
      {/* 페이징 버튼 UI */}
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default NoticeAuthAllContent;
