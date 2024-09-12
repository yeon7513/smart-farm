import React from 'react';
import { TbReportSearch } from 'react-icons/tb';
import SearchBox from '../../../components/search_box/SearchBox';
import styles from './ComplaintsCare.module.scss';

function ComplaintsCare() {
  return (
    <div className={styles.complaints}>
      <SearchBox name={<TbReportSearch />} placeholder={'신고 검색'} />
      ComplaintsCare
    </div>
  );
}

export default ComplaintsCare;
