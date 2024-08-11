import React from "react";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";
interface LogoProps {
  onClick: () => void;
}
const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <div className={styles.logocontainer} onClick={onClick}>
      <div className={styles.logocontent}>
        <img src="/delan.png" alt="DelaN Logo" className={styles.logoimage} />
        <span className={styles.logotext}>DelaN</span>
      </div>
      <div className={styles.logounderline}></div>
    </div>
  );
};
export default Logo;
