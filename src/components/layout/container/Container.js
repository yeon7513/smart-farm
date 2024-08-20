import cn from 'classnames';
import React from 'react';
import styles from '../Layout.module.scss';

function Container({ children, className }) {
  return <div className={cn(styles.container, className)}>{children}</div>;
}

export default Container;
