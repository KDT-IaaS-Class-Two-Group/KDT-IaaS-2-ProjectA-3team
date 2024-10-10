// template/AdminPageTemplate.tsx
import React from "react";
import AdminSidebar from "../../organism/admin_sidebar/admin_sidebar";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";

interface AdminPageTemplateProps {
  onMenuItemClick: (component: React.ReactNode) => void;
}

const AdminPageTemplate: React.FC<AdminPageTemplateProps> = ({
  onMenuItemClick,
}) => {
  return (
    <div className={styles.mainpagecontainer}>
      <div className={styles.sidebarcontainer}>
        <AdminSidebar onMenuItemClick={onMenuItemClick} />
      </div>
    </div>
  );
};

export default AdminPageTemplate;
