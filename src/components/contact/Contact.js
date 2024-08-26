import React, { useEffect, useRef, useState } from 'react';
// import { IoChatbubbles, IoDocumentText, IoSettings } from "react-icons/io5";
import cn from 'classnames';
import { IoIosCall, IoIosCreate, IoIosInformationCircle } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import UpButton from '../up-button/UpButton';
import styles from './Contact.module.scss';

function Contact() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);

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
          onClick={() => navigate('/customer-service-center/request')}
        >
          <IoIosCreate />
        </button>
        {/* 이 버튼에는 전화걸기 이벤트리스너 등록하기!! */}
        <button
          className={cn(styles.call, isTooltipVisible && styles.showTooltip)}
          ref={tooltipRef}
          onClick={showCallNumber}
        >
          <IoIosCall />
        </button>
        <UpButton />
      </div>
    </div>
  );
}

export default Contact;
