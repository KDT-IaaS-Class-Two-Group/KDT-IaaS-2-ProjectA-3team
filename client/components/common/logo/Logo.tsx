import * as styles from "../../../styles/sidebar/SidebarStyles.css";

const Logo: React.FC = () => {
  return (
    <div className={styles.logocontainer}>
      <div className={styles.logocontent}>
        <img src="/delan.png" alt="DelaN Logo" className={styles.logoimage} />
        <span className={styles.logotext}>DelaN</span>
      </div>
      <div className={styles.logounderline}></div>
    </div>
  );
};
export default Logo;
