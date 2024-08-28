// molecule/LogoContent.tsx
import React from "react";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";
import LogoImage from "client/refactor_component/atom/logo/logo_image";
import LogoContentProps from "./props/logo.props";
import Text from "client/refactor_component/atom/Text/text";

const LogoContent: React.FC<LogoContentProps> = ({ src, alt, text }) => (
  <div className={styles.logocontent}>
    <LogoImage src={src} alt={alt} />
    <Text content={text} className={styles.logotext} />
  </div>
);

export default LogoContent;
