// atom/LogoImage.tsx
import React from "react";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";
import LogoImageProps from "./props/logo.props";



const LogoImage: React.FC<LogoImageProps> = ({ src, alt }) => (
  <img src={src} alt={alt} className={styles.logoimage} />
);

export default LogoImage;
