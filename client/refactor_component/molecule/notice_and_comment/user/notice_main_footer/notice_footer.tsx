import React from 'react';
import Link from 'next/link';
import { greenButton } from "client/styles/templatebutton.css";
import * as styles from "client/styles/notice/notice.css";
/**
 * @component WriteButton
 * @description
 * '작성하기' 버튼을 렌더링하는 컴포넌트입니다. 버튼을 클릭하면 "/notice" 경로로 이동하며,
 * 스타일링은 `greenButton`과 `writeButton` 클래스를 사용합니다.
 * 
 * @returns {JSX.Element} - '작성하기' 버튼이 포함된 링크 요소
 */
const WriteButton = () => {
  return (
    <Link href="/notice" passHref className={styles.uploadbutton}>
      <div className={styles.writeButton}>
        <button className={greenButton}>작성하기</button>
      </div>
    </Link>
  );
};

export default WriteButton;
