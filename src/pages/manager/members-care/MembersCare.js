import React, { useEffect } from 'react';
import { TbUserSearch } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../components/card/Card';
import SearchBox from '../../../components/search_box/SearchBox';
import { fetchItems } from '../../../store/user/UserSlice';
import styles from './MembersCare.module.scss';

function MembersCare() {
  const { items } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  console.log(items);

  useEffect(() => {
    dispatch(fetchItems({ collectionName: 'users' }));
  }, [dispatch]);

  return (
    <div>
      <SearchBox name={<TbUserSearch />} placeholder={'회원 검색'} />
      <div className={styles.members}>
        <Card className={styles.list}>회원정보</Card>
      </div>
    </div>
  );
}

export default MembersCare;
