import React from 'react';
import Input from '../../atom/input/input';
import * as styles from '../../../styles/sidebar/SidebarStyles.css';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, onSearchKeyDown }) => (
  <div className={styles.searchcontainer}>
    <Input
            value={searchTerm}
            onChange={onSearchChange}
            onKeyDown={onSearchKeyDown}
            placeholder="Search"
            className={styles.searchinput} id={''} type={''}    />
  </div>
);

export default SearchBar;
