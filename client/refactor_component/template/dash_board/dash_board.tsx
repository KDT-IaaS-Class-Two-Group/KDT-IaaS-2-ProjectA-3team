// DashboardTemplate.tsx
import React from "react";
import MainHeader from "client/refactor_component/organism/header/main_header";
import { section } from "client/styles/admin/admindashboard.css";

const DashboardTemplate: React.FC = () => {
  return (
    <>
      <MainHeader />
      {/* 다른 Organism들 (e.g., Sidebar, ContentArea 등)도 여기에 포함될 수 있습니다. */}
    </>
  );
};

export default DashboardTemplate;
