import React from 'react';
import Logo from '../../template/logo/logo';
import Profile from './profile';
import UserSearchPage from '../../template/nav/user_search_template';
import * as styles from '../../../styles/sidebar/SidebarStyles.css';
import AdminMainContent from 'client/refactor_component/template/main_content/admin/admin_main_content';

interface SidebarProps {
  onMenuItemClick: (component: React.ReactNode) => void;
  loading: boolean;
  sessionData: { user_id: string } | null;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuItemClick, loading, sessionData }) => {
  return (
    <div className={styles.sidebarcontainer}>
      <Logo onClick={() => onMenuItemClick(<AdminMainContent onclick={() => {}} />)} />
      <Profile loading={loading} userId={sessionData?.user_id || null} onMenuItemClick={onMenuItemClick} />
      <UserSearchPage />
    </div>
  );
};

export default Sidebar;
