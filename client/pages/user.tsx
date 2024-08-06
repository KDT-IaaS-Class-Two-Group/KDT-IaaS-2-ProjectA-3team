import UserHome from "../components/userMainPage/mainHeader";

import LeftContent from "../components/userMainPage/userLeftContent";

import * as styles from "../styles/user.css";

const UserPage: React.FC = () => {
  return (
    <div className={styles.mainPage}>
      <div className={styles.mainLeft}>
        <LeftContent />
      </div>
      <div className={styles.mainContent}>
        <UserHome />
      </div>
    </div>
  );
};

export default UserPage;
