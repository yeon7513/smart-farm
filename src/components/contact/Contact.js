import React, { useEffect, useRef, useState } from 'react';
import { IoChatbubbles, IoDocumentText, IoSettings } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Contact.module.scss';

function Contact() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);

  const showCallNumber = (e) => {
    e.stopPropagation();
    setIsTooltipVisible((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
      setIsTooltipVisible(false);
    }
  };

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
          <button onClick={() => navigate('/info/simulation')}>
            <IoSettings />
          </button>
        )}
        <button onClick={() => navigate('/customer-service-center/request')}>
          <IoDocumentText />
        </button>
        <button className={styles.call} onClick={showCallNumber}>
          <IoChatbubbles />
        </button>
        {isTooltipVisible && (
          <span id="tooltip" className={styles.tooltip} ref={tooltipRef}>
            042-000-0000
          </span>
        )}
      </div>
    </div>
  );
}

export default Contact;
