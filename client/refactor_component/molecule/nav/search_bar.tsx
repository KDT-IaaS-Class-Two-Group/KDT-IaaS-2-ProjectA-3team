// SearchBar.tsx
import React from 'react';
import Input from '../../atom/input/input';  // Input 컴포넌트를 사용
import * as styles from '../../../styles/sidebar/SidebarStyles.css';  // 스타일 파일 가져오기

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, onSearchKeyDown }) => (
  <div className={styles.searchcontainer}>  {/* 동일한 CSS 클래스 사용 */}
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
