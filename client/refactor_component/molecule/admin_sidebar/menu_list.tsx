/**
 * @file menu_list.tsx
 * @brief 메뉴 목록 컴포넌트 파일
 * @details 이 파일은 여러 메뉴 아이템을 나열하는 `MenuList` 컴포넌트를 정의한다.
 *          각 메뉴 아이템을 클릭하면 해당 컴포넌트를 화면에 표시하기 위해 `onMenuItemClick` 콜백이 호출된다.
 *
 * @author @dalramjwi
 * @date 2024-08-28
 */

import React from "react";
import MenuItem from "client/components/MenuItem/MenuItem";
import UserSelection from "client/refactor_component/template/team/team";
import ProjectView from "client/components/project/info";
import NoticeMainPage from "client/pages/noticeMain";
import DBGUI from "../../template/dash_temp/db_gui";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";

interface MenuListProps {
  onMenuItemClick: (component: React.ReactNode) => void;
}
/**
 * @brief 메뉴 목록 컴포넌트
 * @details `MenuList`는 여러 `MenuItem`을 포함하여 사용자에게 선택할 수 있는 메뉴를 제공한다.
 *          각 메뉴 아이템을 클릭하면 `onMenuItemClick` 콜백이 호출되어 해당 컴포넌트를 화면에 표시할 수 있다.
 * @param {MenuListProps} props - 메뉴 목록 컴포넌트가 받는 속성들
 * @param {Function} props.onMenuItemClick - 메뉴 아이템 클릭 시 호출되는 콜백 함수. 클릭된 메뉴에 해당하는 컴포넌트를 매개변수로 받는다.
 * @return `nav` 요소 안에 `ul`로 감싼 메뉴 아이템들을 반환하여 네비게이션 메뉴를 제공
 */
const MenuList: React.FC<MenuListProps> = ({ onMenuItemClick }) => {
  return (
    <nav>
      <ul className={styles.menulist}>
        <MenuItem
          text="팀 제작"
          onClick={() => onMenuItemClick(<UserSelection />)}
        />
        <MenuItem
          text="프로젝트 제작"
          onClick={() => onMenuItemClick(<ProjectView />)}
        />
        <MenuItem
          text="게시판"
          onClick={() => onMenuItemClick(<NoticeMainPage />)}
        />
        <MenuItem text="DB GUI" onClick={() => onMenuItemClick(<DBGUI />)} />
      </ul>
    </nav>
  );
};

export default MenuList;
