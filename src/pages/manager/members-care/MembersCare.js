import React, { useEffect, useState } from "react";
import { TbUserSearch } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import PaginationButton from "../../../components/pagination-button/PaginationButton";
import SearchBox from "../../../components/search_box/SearchBox";
import { fetchItems } from "../../../store/user/UserSlice";
import CustomModal from "./../../../components/modal/CustomModal";
import styles from "./MembersCare.module.scss";
import MemberList from "./member-list/MemberList";
import MemberListEdit from "./member-list/member-list-edit/MemberListEdit";
import MemberListItem from "./member-list/member-list-item/MemberListItem";

const PAGE_SIZE_DESKTOP = 6;
const PAGE_SIZE_MOBILE = 4;

function MembersCare() {
  const [isOpen, setIsOpen] = useState(false);
  const [userDetail, setUserDetail] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());

  const { items } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  // 현제 페이지 사이즈
  function getPageSize() {
    return window.innerWidth >= 992 ? PAGE_SIZE_DESKTOP : PAGE_SIZE_MOBILE;
  }

  const handleClose = () => {
    setIsEdit(false);
    setIsOpen(false);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const filteredUsers = items
    .filter((user) => !user.email.includes("admin"))
    .filter(
      (user) =>
        searchValue === "" || // 검색어가 빈 문자열인 경우 모든 사용자 포함
        user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.nickname.toLowerCase().includes(searchValue.toLowerCase())
    )
    .sort((a, b) => b.createdAt - a.createdAt);

  // 관리자를 제외한 회원 목록
  const getCurrentUsers = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredUsers.slice(startIndex, startIndex + pageSize);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 윈도우 크기 변경 핸들러
  const handleResize = () => {
    const newSize = getPageSize();
    if (newSize !== pageSize) {
      setPageSize(newSize);
      setCurrentPage(1);
    }
  };

  const handleChangeSearchUsers = (e) => {
    let value = !e.target[0] ? e.target.value : e.target[0].value;
    setSearchValue(value);
  };

  // users 컬렉션 전체 불러오기
  useEffect(() => {
    dispatch(fetchItems({ collectionName: "users" }));
  }, [dispatch]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredUsers.length / pageSize);
    setTotalPage(totalPages);
  }, [filteredUsers, pageSize]);

  // 윈도우 크기 변경 이벤트 리스너 등록 및 삭제
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <SearchBox
        className={styles.memberSearch}
        name={<TbUserSearch />}
        value={searchValue}
        onChange={handleChangeSearchUsers}
        placeholder={"회원 검색"}
      />
      <ul className={styles.members}>
        {getCurrentUsers() // createdAt으로 오름차순 => 신규 가입자가 위로 옵니다.
          .map((item, idx) => (
            <MemberList
              key={idx}
              data={item}
              setIsOpen={setIsOpen}
              setUserDetail={setUserDetail}
            />
          ))}
      </ul>
      <PaginationButton
        className={styles.pagination}
        currentPage={currentPage}
        totalPage={totalPage}
        onPageChange={handlePageChange}
      />
      {isOpen && (
        <CustomModal
          isOpen={isOpen}
          handleClose={handleClose}
          title={
            !isEdit ? (
              <>{userDetail.name} 님 상세 정보</>
            ) : (
              <>{userDetail.name} 님 정보 수정</>
            )
          }
        >
          <>
            {!isEdit ? (
              <>
                <MemberListItem
                  docId={userDetail.docId}
                  handleEdit={handleEdit}
                />
              </>
            ) : (
              <MemberListEdit
                docId={userDetail.docId}
                cancelEdit={handleClose}
              />
            )}
          </>
        </CustomModal>
      )}
    </>
  );
}

export default MembersCare;
