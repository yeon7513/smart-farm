import React from 'react';
import { TbSettingsSearch } from 'react-icons/tb';
import SearchBox from '../../../components/search_box/SearchBox';
import styles from './AfterServiceCare.module.scss';

function AfterServiceCare(props) {
  return (
    <div className={styles.afterService}>
      <SearchBox name={<TbSettingsSearch />} placeholder={'A/S 검색'} />
      AfterServiceCare
    </div>
  );
}

export default AfterServiceCare;
