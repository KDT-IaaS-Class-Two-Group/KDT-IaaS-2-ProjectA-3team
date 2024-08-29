/**
 * @file logo_image.tsx
 * @brief 로고 이미지 컴포넌트 파일
 * @details 이 파일은 로고 이미지를 렌더링하는 `LogoImage` 컴포넌트를 정의한다. `src`와 `alt` 속성을 통해 로고 이미지를 설정하며, 스타일은 CSS 모듈을 사용하여 적용한다.
 *
 * @author @dalramjwi
 * @date 2024-08-28
 */

import React from "react";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";
import LogoImageProps from "./props/logo.props";

/**
 * @brief 로고 이미지 컴포넌트
 * @details `src`와 `alt` 속성을 받아 로고 이미지를 렌더링하는 컴포넌트다.
 * @param {LogoImageProps} props - 로고 이미지 컴포넌트에 전달되는 속성들
 * @param {string} props.src - 로고 이미지의 URL
 * @param {string} props.alt - 로고 이미지의 대체 텍스트
 * @return 로고 이미지를 렌더링하는 `img` 요소
 */
const LogoImage: React.FC<LogoImageProps> = ({ src, alt }) => (
  <img src={src} alt={alt} className={styles.logoimage} />
);

export default LogoImage;
