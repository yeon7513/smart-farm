import cn from "classnames";
import styles from "./SearchBox.module.scss";

function SearchBox({
  className,
  placeholder,
  name,
  onChange,
  onClick,
  onKeyDown,
}) {
  return (
    <div className={cn(styles.search, className)}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button onClick={onClick}>
        <span>{name}</span>
      </button>
    </div>
  );
}

export default SearchBox;
