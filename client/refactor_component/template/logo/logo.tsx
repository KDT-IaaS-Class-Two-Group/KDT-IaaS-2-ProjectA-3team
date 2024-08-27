// template/HeaderTemplate.tsx
import React from "react";
import Logo from "client/refactor_component/organism/logo/logo";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";

interface HeaderTemplateProps {
  onClick: () => void;
}

const HeaderTemplate: React.FC<HeaderTemplateProps> = ({ onClick }) => (
  <header className={styles.logocontainer}>
    <Logo onClick={onClick} />
    {/* 추가적인 헤더 요소들 (예: 네비게이션 바, 검색 바 등) */}
  </header>
);

export default HeaderTemplate;
