// organism/Logo.tsx
import React from "react";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";
import LogoContent from "../../molecule/logo/logo_content";
import LogoUnderline from "../../atom/logo/logo_underline";
import LogoProps from "./props/logo.props";

const Logo: React.FC<LogoProps> = ({ onClick }) => (
  <div className={styles.logocontainer} onClick={onClick}>
    <LogoContent src="/delan.png" alt="DelaN Logo" text="DelaN" />
    <LogoUnderline />
  </div>
);

export default Logo;
