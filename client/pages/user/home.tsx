import React, { useState, useEffect } from "react";
import UserSidebar from "../../components/SideBar/UserSidebar";
import {
  contentcontainer,
  maincontentcontainer,
  mainpagecontainer,
  section,
} from "client/styles/admin/admindashboard.css";
import MainHeader from "client/components/common/header/mainheader";
import UserMainContent from "client/components/userMainPage/UserMainPage";

const UserHome: React.FC = () => {
  // 사이드바에서 선택된 메뉴에 따라 표시할 컴포넌트 상태
  const [currentComponent, setCurrentComponent] =
    useState<React.ReactNode>(null);
  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 기본 컴포넌트를 설정합니다.
    setCurrentComponent(<UserMainContent onclick={setCurrentComponent} />);
  }, []);
  // 사이드바에서 메뉴를 클릭할 때 호출되는 함수
  const handleMenuClick = (component: React.ReactNode) => {
    setCurrentComponent(component);
  };
  return (
    <div className={mainpagecontainer}>
      <UserSidebar onMenuItemClick={handleMenuClick} />
      <div className={contentcontainer}>
        <MainHeader />
        <>{currentComponent}</>
      </div>
    </div>
  );
};

export default UserHome;
