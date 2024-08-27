import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosCreate, IoIosInformationCircle } from 'react-icons/io';
import { IoChatbubbles } from 'react-icons/io5';
import { PiFarmFill } from 'react-icons/pi';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserAuth } from '../../api/firebase';
import styles from './Contact.module.scss';

function Contact() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);
  const auth = getUserAuth();

  // 툴팁보이기
  const showCallNumber = (e) => {
    e.stopPropagation();
    setIsTooltipVisible((prev) => !prev);
  };

  // 바깥클릭하면 툴팁 없어짐
  const handleClickOutside = (e) => {
    if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
      setIsTooltipVisible(false);
    }
  };

  // 스크롤해도 툴팁 없어짐
  const handleScroll = () => {
    setIsTooltipVisible(false);
  };

  useEffect(() => {
    if (isTooltipVisible) {
      document.addEventListener('click', handleClickOutside);
      window.addEventListener('scroll', handleScroll);
    } else {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTooltipVisible]);

  return (
    <div className={styles.contact}>
      <div className={styles.btns}>
        {!pathname.includes('my-farm') && auth ? (
          <button
            className={styles.gotoMyFarm}
            onClick={() => navigate('/my-farm')}
          >
            <PiFarmFill />
          </button>
        ) : (
          ''
        )}
        {!pathname.includes('info') && (
          <button
            className={styles.gotoSimul}
            onClick={() => navigate('/info/simulation')}
          >
            <IoIosInformationCircle />
          </button>
        )}
        <button
          className={styles.gotoRequest}
          onClick={() => navigate('/request')}
        >
          <IoIosCreate />
        </button>
        {/* 1:1 문의 챗봇 버튼 */}
        <button
          className={cn(styles.call, isTooltipVisible && styles.showTooltip)}
          ref={tooltipRef}
          onClick={showCallNumber}
        >
          <IoChatbubbles />
        </button>
      </div>
    </div>
  );
}

export default Contact;
