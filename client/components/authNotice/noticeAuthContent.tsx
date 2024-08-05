import React, { useState, useEffect } from 'react';

interface ListNotice {
  list_num: string;
  title: string;
  content: string;
}

const NoticeAuthContent = () => {
  const [authList, setAuthList] = useState<ListNotice[]>([]); // auth 서버에서 건너오는 게시물 데이터

  useEffect(() => {
    const fetchNotices = () => {
      fetch('http://localhost:3001/Authnotices')
        .then((response) => {
          return response.json();
        })
        .then((data: ListNotice[]) => {
          setAuthList(data);
        })
        .catch((err) => {
          console.error('데이터를 가져오는 중 오류 발생:', err);
        });
    };
    fetchNotices(); //컴포넌트가 처음 렌더링될 때 데이터 fetch
  }, []);

  return (
    <div>
      {authList.length > 0 ? (
        authList.map((notice) => (
          <div key={notice.list_num}>
            <h3>{notice.title}</h3>
          </div>
        ))
      ) : (
        <div>게시물 없음</div>
      )}
    </div>
  );
};

export default NoticeAuthContent;
