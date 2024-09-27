/**
 * @file logo_content.tsx
 * @brief 로고와 관련된 콘텐츠를 표시하는 컴포넌트 파일
 * @details 이 컴포넌트는 로고 이미지와 함께 텍스트를 표시하는 역할을 한다.
 *          로고 이미지는 `LogoImage` 컴포넌트를 사용하여 렌더링되며, 텍스트는 `Text` 컴포넌트를 사용하여 표시된다.
 * @author @dalramjwi
 * @date 2024-08-29
 */

import React from "react";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";
import LogoImage from "client/refactor_component/atom/logo/logo_image";
import LogoContentProps from "./props/logo.props";
import Text from "client/refactor_component/atom/ttext/text";

/**
 * @brief 로고와 텍스트를 포함하는 콘텐츠 컴포넌트
 * @details 로고 이미지를 렌더링하고, 그 아래에 주어진 텍스트를 표시한다.
 *          로고 이미지는 `LogoImage` 컴포넌트를 통해 렌더링되며, 텍스트는 `Text` 컴포넌트를 통해 렌더링된다.
 * @param {LogoContentProps} props 컴포넌트에 전달되는 속성들
 * @param {string} props.src - 로고 이미지의 URL
 * @param {string} props.alt - 로고 이미지의 대체 텍스트
 * @param {string} props.text - 로고 아래에 표시될 텍스트
 * @return {JSX.Element} 로고와 텍스트를 포함하는 JSX 요소
 */
const LogoContent: React.FC<LogoContentProps> = ({ src, alt, text }) => (
  <div className={styles.logocontent}>
    <LogoImage src={src} alt={alt} />
    <Text content={text} className={styles.logotext} />
  </div>
);

export default LogoContent;
