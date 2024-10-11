import React, { useState } from "react";
import {
  mainpagecontainer,
  contentcontainer,
  maincontentcontainer,
} from "client/styles/admin/admindashboard.css";
import AdminSidebar from "client/components/SideBar/AdminSidebar";

import MainHeader from "client/refactor_component/template/dash_board/dash_board";
import AdminMainContent from "client/refactor_component/template/main_content/admin/admin_main_content";

const Dash: React.FC = () => {
  // 함수 선언
  const handleMenuClick = (component: React.ReactNode) => {
    setCurrentComponent(component);
  };

  // 상태 훅 설정
  const [currentComponent, setCurrentComponent] = useState<React.ReactNode>(
    <AdminMainContent onclick={handleMenuClick} />
  );

  return (
    <div className={mainpagecontainer}>
      <AdminSidebar onMenuItemClick={handleMenuClick} />
      <div className={contentcontainer}>
        <MainHeader />
        <div className={maincontentcontainer}>{currentComponent}</div>
      </div>
    </div>
  );
};

export default Dash;
