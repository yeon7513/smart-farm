import cn from 'classnames';
import React from 'react';
import basicProfile from '../../assets/member/basic_profile.png';
import styles from './ImageBox.module.scss';

function ImageBox({ imgUrl, isSelected }) {
  return (
    <img
      className={cn(styles.imgBox, isSelected ? styles.selected : '')}
      src={imgUrl || basicProfile}
      alt=""
    />
  );
}

export default ImageBox;
