import React, { useState, useEffect } from "react";

interface ListNotice {
  _id: string;
  title: string;
  user_id: string;
  createdAt: string;
}

const NoticeTextOnlyContent: React.FC<{ endpoint: string }> = ({
  endpoint,
}) => {
  const [notices, setNotices] = useState<ListNotice[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(endpoint);
        const data: ListNotice[] = await response.json();
        setNotices(data);
      } catch (err) {
        console.error("Failed to fetch notices:", err);
      }
    };

    fetchNotices();
  }, [endpoint]);

  return (
    <div>
      {notices.length > 0 ? (
        notices.map((notice, index) => (
          <div key={notice._id}>
            <h3>
              {index + 1}. {notice.title}
            </h3>
            <h3>작성자: {notice.user_id}</h3>
            <h3>작성일: {new Date(notice.createdAt).toLocaleDateString()}</h3>
          </div>
        ))
      ) : (
        <div>게시물 없음</div>
      )}
    </div>
  );
};

export default NoticeTextOnlyContent;
