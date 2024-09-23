import cn from 'classnames';
import React from 'react';
import basicProfile from '../../assets/member/profile.webp';
import styles from './ImageBox.module.scss';

function ImageBox({ imgUrl, isSelected }) {
  console.log(imgUrl);
  return (
    <img
      className={cn(styles.imgBox, isSelected ? styles.selected : '')}
      src={imgUrl[0] || basicProfile}
      alt=""
    />
  );
}

export default ImageBox;
