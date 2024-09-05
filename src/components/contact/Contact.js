import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosCreate, IoIosInformationCircle } from 'react-icons/io';
import { IoChatbubbles } from 'react-icons/io5';
import { PiFarmFill } from 'react-icons/pi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getUserAuth } from '../../api/firebase';
import styles from './Contact.module.scss';
import ChatRoom from '../chat-room/ChatRoom';

function Contact() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const auth = getUserAuth();
  const [isShow, setIsShow] = useState(false);

 const handleClickShow = () => {
  setIsShow(!isShow) 
 }

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
        <button onClick={handleClickShow}

        >
          <IoChatbubbles />
        </button>
      </div>
      {isShow &&<ChatRoom/>}
    </div>
  );
}

export default Contact;
