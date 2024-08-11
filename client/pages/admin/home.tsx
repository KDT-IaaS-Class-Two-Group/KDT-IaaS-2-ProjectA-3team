import React, { useState } from "react";
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
  // 사이드바에서 선택된 메뉴에 따라 표시할 컴포넌트 상태
  const [currentComponent, setCurrentComponent] = useState<React.ReactNode>(
    <AdminMainContent />
  );

  // 사이드바에서 메뉴를 클릭할 때 호출되는 함수
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
