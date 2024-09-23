import React, { useEffect, useState } from 'react';
import { TbReportSearch } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import SearchBox from '../../../components/search_box/SearchBox';
import { fetchComplain } from '../../../store/complain/complainSlice';
import styles from './ComplaintsCare.module.scss';
import CpComment from './part/CpComment';
import CpPost from './part/CpPost';
import CpProfile from './part/CpProfile';

function ComplaintsCare() {
  const [sort, setSort] = useState('all');
  const [process, setProcess] = useState('');

  const dispatch = useDispatch();

  // 카테고리별 렌더링
  const handleSortClick = (sort) => {
    setSort(sort);
  };

  // 처리별 렌더링
  const handleStateClick = (state) => {
    setProcess(state);
  };

  useEffect(() => {
    dispatch(fetchComplain(process));
  }, [dispatch, process]);

  return (
    <div className={styles.complaints}>
      <SearchBox name={<TbReportSearch />} placeholder={'신고 검색'} />
      <div className={styles.header}>
        <div className={styles.state}>
          <div>
            <button onClick={() => handleStateClick('processing')}>
              처리중
            </button>
            <button onClick={() => handleStateClick('processed')}>
              처리완료
            </button>
          </div>
        </div>
        <div className={styles.category}>
          <div>
            <button
              className={sort === '' ? styles.active : ''}
              onClick={() => handleSortClick('all')}
            >
              전체
            </button>
            <button
              className={sort === '' ? styles.active : ''}
              onClick={() => handleSortClick('profile')}
            >
              프로필
            </button>
            <button
              className={sort === '' ? styles.active : ''}
              onClick={() => handleSortClick('post')}
            >
              게시글
            </button>
            <button
              className={sort === '' ? styles.active : ''}
              onClick={() => handleSortClick('comment')}
            >
              댓글
            </button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <CpProfile />
        <CpPost />
        <CpComment />
      </div>
    </div>
  );
}

export default ComplaintsCare;
