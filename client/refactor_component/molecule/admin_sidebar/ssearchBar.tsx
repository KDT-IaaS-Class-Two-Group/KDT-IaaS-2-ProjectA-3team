/**
 * @file search_bar.tsx
 * @brief 검색 바 컴포넌트 파일
 * @details 이 파일은 사용자가 텍스트를 입력하여 검색할 수 있는 검색 바를 정의한다.
 *          입력 필드에 현재 검색어를 표시하고, 검색어가 변경되거나 키를 누를 때 핸들러를 호출한다.
 *
 * @author @dalramjwi
 * @date 2024-08-28
 */

import React from "react";
import Input from "../../atom/input/input";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * @brief 검색 바 컴포넌트
 * @details `SearchBar` 컴포넌트는 검색어를 입력할 수 있는 입력 필드를 제공한다.
 *          현재 검색어를 표시하며, 검색어가 변경될 때와 키가 눌릴 때 핸들러를 호출한다.
 * @param {SearchBarProps} props - 검색 바 컴포넌트가 받는 속성들
 * @param {string} props.searchTerm - 현재 입력된 검색어
 * @param {Function} props.onSearchChange - 검색어가 변경될 때 호출되는 핸들러 함수
 * @param {Function} props.onSearchKeyDown - 키보드 키가 눌릴 때 호출되는 핸들러 함수
 * @return 검색어 입력 필드를 포함하는 `div` 요소를 반환. 입력 필드는 스타일이 적용된 `Input` 컴포넌트를 사용하여 렌더링됨.
 */
const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onSearchKeyDown,
}) => (
  <div className={styles.searchcontainer}>
    <Input
      value={searchTerm}
      onChange={onSearchChange}
      onKeyDown={onSearchKeyDown}
      placeholder="Search"
      className={styles.searchinput}
      id={""} // input 요소의 ID. 현재 빈 문자열로 설정됨.
      type={""} // input 요소의 타입. 현재 빈 문자열로 설정됨.
    />
  </div>
);

export default SearchBar;
