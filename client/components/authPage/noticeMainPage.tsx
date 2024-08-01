import Link from "next/link";
import React, { useState } from "react";

const NoticeMain = () => {
  return (
    <div>
      <div>게시판</div>
      <Link href="/notice" passHref>
        <button>작성하기</button>
      </Link>
    </div>
  );
};

export default NoticeMain;
