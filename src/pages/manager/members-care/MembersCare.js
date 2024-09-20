import React, { useEffect, useState } from 'react';
import { TbUserSearch } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from '../../../components/search_box/SearchBox';
import { fetchItems } from '../../../store/user/UserSlice';
import CustomModal from './../../../components/modal/CustomModal';
import styles from './MembersCare.module.scss';
import MemberList from './member-list/MemberList';
import MemberListItem from './member-list/member-list-item/MemberListItem';

function MembersCare() {
  const [isOpen, setIsOpen] = useState(false);
  const [userDetail, setUserDetail] = useState();

  const { items } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  const handleClose = () => {
    setIsOpen(false);
  };

  // 회원 목록에서 관리자 제외
  const filteredUsers = items.filter((user) => !user.email.includes('admin'));

  useEffect(() => {
    dispatch(fetchItems({ collectionName: 'users' }));
  }, [dispatch]);

  return (
    <>
      <SearchBox
        className={styles.memberSearch}
        name={<TbUserSearch />}
        placeholder={'회원 검색'}
      />
      <ul className={styles.members}>
        {filteredUsers // createdAt으로 오름차순 => 신규 가입자가 위로 옵니다.
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((item, idx) => (
            <MemberList
              key={idx}
              data={item}
              setIsOpen={setIsOpen}
              setUserDetail={setUserDetail}
            />
          ))}
      </ul>
      {isOpen && (
        <CustomModal
          isOpen={isOpen}
          handleClose={handleClose}
          title={<>{userDetail.name} 님 상세 정보</>}
        >
          <MemberListItem detail={userDetail} />
        </CustomModal>
      )}
    </>
  );
}

export default MembersCare;
