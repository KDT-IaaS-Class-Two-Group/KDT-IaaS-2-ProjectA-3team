/**
 * @file search_bar.tsx
 * @brief 검색 바 컴포넌트 파일
 * @details 이 파일은 사용자가 검색어를 입력할 수 있는 `SearchBar` 컴포넌트를 정의한다.
 *          이 컴포넌트는 `Input` 컴포넌트를 사용하여 검색 입력 필드를 렌더링하고,
 *          검색어 입력과 키보드 이벤트를 처리하는 핸들러를 받는다.
 * @author @dalramjwi
 * @date 2024-08-29
 */
import React from "react";
import Input from "../../atom/input/input"; // Input 컴포넌트를 사용
import * as styles from "../../../styles/sidebar/SidebarStyles.css"; // 스타일 파일 가져오기

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
/**
 * @brief 검색 바 컴포넌트
 * @details 검색어를 입력할 수 있는 입력 필드와 관련 이벤트 핸들러를 포함한다.
 *          `Input` 컴포넌트를 사용하여 입력 필드를 렌더링하며, 검색어와 이벤트 핸들러를 props로 받는다.
 * @param {SearchBarProps} props 컴포넌트에 전달되는 속성들
 * @param {string} props.searchTerm - 현재 검색어
 * @param {function} props.onSearchChange - 입력 값이 변경될 때 호출되는 함수
 * @param {function} props.onSearchKeyDown - 키보드 이벤트가 발생할 때 호출되는 함수
 * @return {JSX.Element} 검색 바를 포함하는 JSX 요소
 */
const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onSearchKeyDown,
}) => (
  <div className={styles.searchcontainer}>
    {" "}
    {/* 동일한 CSS 클래스 사용 */}
    <Input
      value={searchTerm}
      onChange={onSearchChange}
      onKeyDown={onSearchKeyDown}
      placeholder="Search"
      className={styles.searchinput}
      id="search-input"
      type="text"
    />
  </div>
);

export default SearchBar;
