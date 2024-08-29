/**
 * @file logo_underline.tsx
 * @brief 로고 밑줄 컴포넌트 파일
 * @details 이 파일은 로고 이미지 아래에 밑줄을 표시하는 `LogoUnderline` 컴포넌트를 정의한다.
 *          스타일은 CSS 모듈을 사용하여 적용되며, 단순한 `div` 요소로 구성된다.
 *
 * @author @dalramjwi
 * @date 2024-08-28
 */

import React from "react";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";

/**
 * @brief 로고 밑줄 컴포넌트
 * @details 로고 이미지 아래에 표시될 밑줄을 렌더링하는 컴포넌트다. CSS 모듈을 사용하여 스타일을 적용하며, `div` 요소로 구성되어 있다.
 * @return 로고 이미지 아래에 밑줄을 렌더링하는 `div` 요소
 */
const LogoUnderline: React.FC = () => (
  <div className={styles.logounderline}></div>
);

export default LogoUnderline;
