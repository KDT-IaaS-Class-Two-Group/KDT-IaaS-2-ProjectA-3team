// template/HeaderTemplate.tsx
import React from "react";
import Logo from "client/refactor_component/organism/logo/logo";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";
import LogoProps from "client/refactor_component/organism/logo/props/logo.props";

const HeaderTemplate: React.FC<LogoProps> = ({ onClick }) => (
  <header className={styles.logocontainer}>
    <Logo onClick={onClick} />
  </header>
);

export default HeaderTemplate;
