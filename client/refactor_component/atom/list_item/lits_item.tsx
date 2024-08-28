/**
 * @file list_item.tsx
 * @brief 리스트 아이템 컴포넌트 파일
 * @details 이 파일에는 사이드바나 목록 등에서 사용되는 리스트 아이템을 정의하는 React 컴포넌트가 포함되어 있다.
 *
 * @author @dalramjwi
 * @date 2024-08-28
 */

import React from "react";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";

interface ListItemProps {
  children: React.ReactNode;
}

/**
 * @brief 리스트 아이템 컴포넌트
 * @details 리스트 항목을 렌더링하는 컴포넌트로, `children`으로 전달된 내용을 리스트 아이템으로 출력한다.
 * @param {ListItemProps} props - 컴포넌트에 전달되는 props
 * @param {React.ReactNode} props.children - 리스트 아이템으로 표시할 내용
 * @return 리스트 아이템을 렌더링하는 컴포넌트
 */
const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return <li className={styles.userlistitem}>{children}</li>;
};

export default ListItem;
