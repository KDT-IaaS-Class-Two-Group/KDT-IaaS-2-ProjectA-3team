import React, { useState, useEffect } from "react";
import {
  mainpagecontainer,
  contentcontainer,
  maincontentcontainer,
} from "client/styles/admin/admindashboard.css";
import { fullRowSection } from "client/styles/admin/greet/greet.css";
import AdminSidebar from "../../components/SideBar/AdminSidebar";
import MainHeader from "client/components/common/header/mainheader";
import AdminMainContent from "client/components/adminMainPage/AdminMainPage";
fullRowSection;
const Dash: React.FC = () => {
  const [currentComponent, setCurrentComponent] =
    useState<React.ReactNode>(null);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 기본 컴포넌트를 설정합니다.
    setCurrentComponent(<AdminMainContent onclick={setCurrentComponent} />);
  }, []);

  // 사이드바에서 메뉴를 클릭할 때 호출되는 함수입니다.
  const handleMenuClick = (component: React.ReactNode) => {
    setCurrentComponent(component);
  };

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
