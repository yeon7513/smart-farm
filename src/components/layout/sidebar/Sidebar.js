import cn from 'classnames';
import React from 'react';
import { useComponentContext } from '../../../context/ComponentContext';
import styles from './Sidebar.module.scss';

function Sidebar({ comp, name, className, handleClick }) {
  const { currComp } = useComponentContext();

  return (
    <li className={cn(styles.menu, className)}>
      <button
        className={currComp === comp ? styles.active : ''}
        onClick={() => handleClick(comp)}
      >
        {name}
      </button>
    </li>
  );
}

export default Sidebar;
