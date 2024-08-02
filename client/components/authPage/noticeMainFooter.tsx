import Link from 'next/link';
import React, { useState } from 'react';

const NoticeMainFooter = () => {
  return (
    <div>
      <Link href="/notice" passHref>
        <button>작성하기</button>
      </Link>
    </div>
  );
};

export default NoticeMainFooter;
