// template/UserSidebar.tsx
import React, { useState } from "react";
import Sidebar from "client/refactor_component/organism/user_sidebar/user_sidebar";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";
interface SidebarProps {
  onMenuItemClick: (component: React.ReactNode) => void;
}
const UserSidebar: React.FC<SidebarProps> = ({ onMenuItemClick }) => {
  const [currentComponent, setCurrentComponent] = useState<React.ReactNode>();

  const handleMenuItemClick = (component: React.ReactNode) => {
    setCurrentComponent(component);
  };

  return (
    <div className={styles.mainpagecontainer}>
      <Sidebar onMenuItemClick={handleMenuItemClick} />
      <div className={""}>{currentComponent}</div>
    </div>
  );
};

export default UserSidebar;
