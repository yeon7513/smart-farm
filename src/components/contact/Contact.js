import React, { useState } from 'react';
import { IoIosCreate, IoIosInformationCircle } from 'react-icons/io';
import { IoChatbubbles } from 'react-icons/io5';
import { PiFarmFill } from 'react-icons/pi';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserAuth } from '../../api/firebase';
import { useComponentContext } from '../../context/ComponentContext';
import ChatRoom from '../chat-room/ChatRoom';
import styles from './Contact.module.scss';

function Contact({ className, isResponsive = false }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const auth = getUserAuth();
  const { setCurrComp } = useComponentContext();
  const [isShow, setIsShow] = useState(false);

  const user = localStorage.getItem('user');

  const handleClickShow = () => {
    setIsShow(!isShow);
  };

  const gotoSimulation = () => {
    setCurrComp('Simulation');
    navigate('/info');
  };

  return (
    <div className={isResponsive ? className : styles.contact}>
      <div className={styles.btns}>
        {!pathname.includes('my-farm') && auth && user && (
          <button
            className={styles.gotoMyFarm}
            onClick={() => navigate('/my-farm')}
          >
            <PiFarmFill />
          </button>
        )}
        {!pathname.includes('info') && (
          <button className={styles.gotoSimul} onClick={gotoSimulation}>
            <IoIosInformationCircle />
          </button>
        )}
        <button
          className={styles.gotoRequest}
          onClick={() => navigate('/request')}
        >
          <IoIosCreate />
        </button>
        {/* 1:1 문의 채팅방 버튼 */}
        <button onClick={handleClickShow}>
          <IoChatbubbles />
        </button>
      </div>
      {isShow && <ChatRoom />}
    </div>
  );
}

export default Contact;
