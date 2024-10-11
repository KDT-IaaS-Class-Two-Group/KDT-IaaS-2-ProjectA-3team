/**
 * !!SPA로, Link는 사용하지 않기에 로직 변경 필요
 * @file menu_item.tsx
 * @brief 메뉴 아이템 컴포넌트 파일
 * @details 이 파일은 사이드바 메뉴에서 사용될 수 있는 메뉴 아이템 컴포넌트를 정의한다.
 *          메뉴 아이템은 클릭 시 이벤트를 처리할 수 있으며, 주어진 링크로 네비게이션할 수 있다.
 *
 * @author @dalramjwi
 * @date 2024-08-28
 */
import React from "react";
import Link from "next/link";
import * as styles from "../../styles/sidebar/SidebarStyles.css";

interface MenuItemProps {
  text: string;
  onClick?: () => void;
  link?: string;
}
/**
 * @brief 메뉴 아이템 컴포넌트
 * @details 메뉴 아이템은 텍스트와 선택적으로 클릭 이벤트 핸들러 및 링크를 받을 수 있다.
 *          링크가 제공되면, `Link` 컴포넌트를 사용하여 네비게이션을 지원하고, 그렇지 않으면 단순히 텍스트를 표시한다.
 * @param {MenuItemProps} props - 메뉴 아이템 컴포넌트가 받는 속성들
 * @param {string} props.text - 메뉴 아이템에 표시될 텍스트
 * @param {Function} [props.onClick] - 메뉴 아이템 클릭 시 호출될 선택적 클릭 핸들러 함수
 * @param {string} [props.link] - 메뉴 아이템이 링크를 제공할 경우 사용할 URL
 * @return `li` 요소를 반환하며, 클릭 시 이벤트 처리 및 링크 네비게이션을 지원
 */
const MenuItem: React.FC<MenuItemProps> = ({ text, onClick, link }) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <li className={styles.menuitem} onClick={onClick}>
      <span className={styles.menuitemicon}></span>
      {link ? (
        <Link href={link} className={styles.atagmenuitem}>
          {text}
        </Link>
      ) : (
        <span>{text}</span>
      )}
    </li>
  );
};

export default MenuItem;
