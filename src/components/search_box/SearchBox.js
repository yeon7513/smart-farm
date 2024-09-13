import cn from 'classnames';
import React from 'react';
import styles from './SearchBox.module.scss';

function SearchBox({ className, placeholder, name, handleSearch = () => {} }) {
  return (
    <div className={cn(styles.search, className)}>
      <input type="text" placeholder={placeholder} />
      <button onClick={handleSearch}>
        <span>{name}</span>
      </button>
    </div>
  );
}

export default SearchBox;
