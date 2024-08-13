import React, { useState, useEffect } from "react";
import UserSidebar from "../../components/SideBar/UserSidebar";
import {
  contentcontainer,
  maincontentcontainer,
  mainpagecontainer,
  section,
  usercontentcontainer,
} from "client/styles/admin/admindashboard.css";
import MainHeader from "client/components/common/header/mainheader";
import UserMainContent from "client/components/userMainPage/UserMainPage";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import { SessionData } from "client/ts/Interface/SessionData.interface";

const UserHome: React.FC = () => {
  // 사이드바에서 선택된 메뉴에 따라 표시할 컴포넌트 상태
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  const [currentComponent, setCurrentComponent] =
    useState<React.ReactNode>(null);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 기본 컴포넌트를 설정합니다.
    setCurrentComponent(<UserMainContent onclick={setCurrentComponent} />);

    //naviadev _ 2024/08/12
    //home이 load되면 기본적인 데이터를 모두 요청하여 기본적인 데이터를 반복적으로 요청하지 않도록 조정.
    const getProjectInfo = async () => {
      const response = await fetch(`${REQUEST_URL.__LOGIN}/session`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setSessionData(data.session);
      } else {
        console.error(response.statusText);
      }
    };
    getProjectInfo();
  }, []);

  // 사이드바에서 메뉴를 클릭할 때 호출되는 함수
  const handleMenuClick = (component: React.ReactNode) => {
    setCurrentComponent(component);
  };
  return (
    <div className={mainpagecontainer}>
      <UserSidebar
        onMenuItemClick={handleMenuClick}
        sessionData={sessionData}
      />
      <div className={usercontentcontainer}>
        <MainHeader sessionData={sessionData} setSessionData={setSessionData} />
        <>{currentComponent}</>
      </div>
    </div>
  );
};

export default UserHome;
