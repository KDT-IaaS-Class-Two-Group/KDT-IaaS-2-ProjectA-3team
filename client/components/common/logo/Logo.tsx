import React from "react";
import Image from "next/image";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";

interface LogoProps {
  onClick: () => void;
}

const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <div
      className={styles.logocontainer}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <div className={styles.logocontent}>
        <Image
          src="/delan.png"
          alt="DelaN Logo"
          className={styles.logoimage}
          width={100}
          height={100}
        />
        <span className={styles.logotext}>DelaN</span>
      </div>
      <div className={styles.logounderline}></div>
    </div>
  );
};

export default Logo;
