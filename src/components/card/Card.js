import cn from 'classnames';
import React from 'react';
import styles from './Card.module.scss';

function Card({ className, children }) {
  return <div className={cn(styles.card, className)}>{children}</div>;
}

export default Card;
