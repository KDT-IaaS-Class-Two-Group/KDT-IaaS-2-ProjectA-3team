// atom/LogoImage.tsx
import React from "react";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";

interface LogoImageProps {
  src: string;
  alt: string;
}

const LogoImage: React.FC<LogoImageProps> = ({ src, alt }) => (
  <img src={src} alt={alt} className={styles.logoimage} />
);

export default LogoImage;
