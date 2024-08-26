import React, { useState, useEffect } from "react";
import {
  mainpagecontainer,
  contentcontainer,
  maincontentcontainer,
} from "client/styles/admin/admindashboard.css";
import { fullRowSection } from "client/styles/admin/greet/greet.css";
import AdminSidebar from "../../components/SideBar/AdminSidebar";
import MainHeader from "client/components/common/header/mainheader";
import AdminMainContent from "client/refactor_component/template/admin_main_content/admin_main_content";

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
