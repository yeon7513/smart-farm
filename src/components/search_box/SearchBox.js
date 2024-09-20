import cn from "classnames";
import React, { useState } from "react";
import styles from "./SearchBox.module.scss";

function SearchBox({
  className,
  placeholder,
  name,
  // handleSearch = () => {}
  onChange,
  onClick,
}) {
  return (
    <div className={cn(styles.search, className)}>
      <input type="text" placeholder={placeholder} onChange={onChange} />
      <button onClick={onClick}>
        <span>{name}</span>
      </button>
    </div>
  );
}

export default SearchBox;
