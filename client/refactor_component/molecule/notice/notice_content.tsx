import React, { useState, useEffect } from "react";
import Link from "next/link";

interface NoticeContentProps {
  apiEndpoint: string;
}

interface ListNotice {
  _id: string;
  title: string;
  user_id: string;
  createdAt: string;
}

const NoticeContent: React.FC<NoticeContentProps> = ({ apiEndpoint }) => {
  const [notices, setNotices] = useState<ListNotice[]>([]);

  useEffect(() => {
    fetchNotices(apiEndpoint);
  }, [apiEndpoint]);

  const fetchNotices = async (endpoint: string) => {
    try {
      const response = await fetch(endpoint);
      const data: ListNotice[] = await response.json();
      setNotices(data);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    }
  };

  const displayedNotices = notices.slice(0, 3);

  return (
    <div className="">
      {displayedNotices.length > 0 ? (
        displayedNotices.map((notice, index) => (
          <div key={notice._id}>
            <Link href={`/notice/${notice._id}`} className="">
              <div className="">
                <p>{index + 1}.</p>
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

export default NoticeContent;
