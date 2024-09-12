import React from 'react';

import { TbPencilSearch } from 'react-icons/tb';
import SearchBox from '../../../components/search_box/SearchBox';
import styles from './QuotationsCare.module.scss';

function QuotationsCare() {
  return (
    <div className={styles.quotations}>
      <SearchBox name={<TbPencilSearch />} placeholder={'견적 의뢰서 검색'} />
      QuotationsCare
    </div>
  );
}

export default QuotationsCare;
