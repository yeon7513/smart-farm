import React, { useEffect, useState } from 'react';
import { FaAngleUp } from 'react-icons/fa';
import styles from './UpButton.module.scss';

function UpButton(props) {
  const [up, setUp] = useState(false);

  const handleScroll = () => {
    if (window.scroll > 300) {
      setUp(true);
    } else {
      setUp(false);
    }
  };
  const scrollTotop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.up}>
      <button className={styles.upBtn} onClick={scrollTotop}>
        <FaAngleUp />
      </button>
    </div>
  );
}

export default UpButton;
