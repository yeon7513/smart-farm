import React from 'react';
import { TbMessageSearch } from 'react-icons/tb';
import SearchBox from '../../../components/search_box/SearchBox';
import styles from './ChatbotCare.module.scss';

function ChatbotCare() {
  return (
    <div className={styles.chatbot}>
      <SearchBox name={<TbMessageSearch />} placeholder={'챗봇 검색'} />
      ChatbotCare
    </div>
  );
}

export default ChatbotCare;
