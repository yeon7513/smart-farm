import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";
import { TbPencilSearch } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import * as XLSX from "xlsx";
import SearchBox from "../../../components/search_box/SearchBox";
import { fetchPayments } from "../../../store/payment/paymentsSlice";
import styles from "./QuotationsCare.module.scss";
import {
  fetchCommonInfo,
  updateCommonInfo,
} from "../../../store/dashboard/dashboardSlice";
import CustomModal from "../../../components/modal/CustomModal";
import PaginationButton from "../../../components/pagination-button/PaginationButton";

// listItems 변수는 firebase에서 데이터를 가져와서 메모리에 저장합니다.
// 이를 기반으로 검색 기능 구현 및 초기 데이터를 렌더링 합니다.
let listItems;

function QuotationsCare() {
  const { payments, isLoading } = useSelector((state) => state.paymentsSlice);
  const { commonInfo } = useSelector((state) => state.dashboardSlice);
  const [items, setItems] = useState([]); // 검색 결과용 상태
  const [keyword, setKeyword] = useState(""); // 검색어 상태
  const [selectedItem, setSelectedItem] = useState(null); // 모달용 선택된 아이템
  const [modalOpen, setModalOpen] = useState(false); // 모달 열기/닫기 상태
  const [filteredInfo, setFilteredInfo] = useState(commonInfo); // 필터링된 정보 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 10; // 페이지당 항목 수

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPayments("payments")); // 결제 데이터 가져오기
    dispatch(fetchCommonInfo("dashboard")); // 공통 정보 가져오기
  }, [dispatch]);

  // 필터링된 데이터 처리
  const filterData = (status) => {
    if (status === "pending") {
      setFilteredInfo(
        commonInfo.filter((item) => item.useYn === "N" && item.deleteYn === "N")
      );
    } else if (status === "approved") {
      setFilteredInfo(
        commonInfo.filter((item) => item.useYn === "Y" && item.deleteYn === "N")
      );
    } else if (status === "rejected") {
      setFilteredInfo(commonInfo.filter((item) => item.deleteYn === "Y"));
    } else {
      setFilteredInfo(commonInfo);
    }
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 초기화
  };

  // listItems에 데이터를 저장하는 함수 (QuotationsCare에서 호출)
  const setListItems = (data) => {
    listItems = data; // 데이터 저장
  };

  // payments를 listItems에 저장
  useEffect(() => {
    setListItems(payments);
    const testPayments = payments.map((payment) => ({
      ...payment,
      additionalOptions: Object.entries(payment.additionalOptions).map(
        ([optionCategory, options]) => {
          const selectedOptions = Object.entries(options)
            .filter(([_, selected]) => selected)
            .map(([optionName]) => optionName);
          return `${selectedOptions.join(", ")}`;
        }
      ),
    }));
    testPayments.forEach((payment) => {
      console.log(payment.additionalOptions);
    });
  }, [payments]);

  // firebase의 데이터를 excel로 불러옵니다.
  const exportToExcel = () => {
    const processedData = payments.map((payment) => ({
      ...payment,
      // additionalOptions 객체의 키(옵션 카테고리)-값(옵션) 쌍을 배열로 변환
      // 이 때, 키(옵션 카테고리) 값은 출력하지 않습니다.
      additionalOptions: Object.entries(payment.additionalOptions)
        .map(([optionCategory, options]) => {
          const selectedOptions = Object.entries(options)
            .filter(([_, selected]) => selected)
            .map(([optionName]) => optionName);
          return `${selectedOptions.join(", ")}`;
        })
        .join(", "),
    }));
    processedData.forEach((payment) => {
      console.log(payment.additionalOptions);
    });
    const worksheet = XLSX.utils.json_to_sheet(processedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "결제 내역");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "결제 내역.xlsx");
  };

  // 검색어 변경 핸들러
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  // 검색 실행 핸들러
  const handleSearch = (e) => {
    e.preventDefault();
    setItems(listItems.filter(({ name }) => name.includes(keyword)));
  };

  // 일반 사용자와 관리자의 기능을 다르게 부여하기 위한 함수입니다.
  const userData = JSON.parse(localStorage.getItem("user"));
  const userUid = userData.uid;
  const isAdmin = userData.email === "admin@gmail.com";

  // 관리자가 아닌 경우 자신의 데이터만 보이게 합니다.
  const filteredCommonInfo = isAdmin
    ? commonInfo
    : commonInfo.filter((item) => item.docId === userUid);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleApproval = async () => {
    if (selectedItem && selectedItem.useYn === "N") {
      try {
        const result = await dispatch(
          updateCommonInfo({
            collectionName: "dashboard",
            docId: selectedItem.docId,
            updateObj: { ...selectedItem, useYn: "Y", deleteYn: "N" },
          })
        ).unwrap();

        console.log(`문서 ${selectedItem.name}가 승인되었습니다!`, result);

        dispatch(fetchCommonInfo("dashboard"));
        setModalOpen(false); // 모달 닫기
      } catch (error) {
        console.error("승인 처리 중 오류 발생: ", error);
      }
    } else {
      console.error("승인할 수 없는 항목입니다.");
    }
  };

  const handleRejection = async () => {
    if (selectedItem && selectedItem.deleteYn === "N") {
      try {
        const result = await dispatch(
          updateCommonInfo({
            collectionName: "dashboard",
            docId: selectedItem.docId,
            updateObj: { ...selectedItem, deleteYn: "Y", useYn: "N" },
          })
        ).unwrap();

        console.log(`문서 ${selectedItem.name}가 거절되었습니다!`, result);

        dispatch(fetchCommonInfo("dashboard"));
        setModalOpen(false);
      } catch (error) {
        console.error("거절 처리 중 오류 발생: ", error);
      }
    } else {
      console.error("거절할 수 없는 항목입니다.");
    }
  };

  // 현재 페이지에 맞는 데이터 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInfo.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredInfo.length / itemsPerPage);

  return (
    <div className={styles.quotations}>
      {isLoading ? (
        <BeatLoader color="#9a9a9a" />
      ) : (
        <>
          <SearchBox
            name={<TbPencilSearch />}
            placeholder={"견적 의뢰서 검색"}
            onChange={handleKeywordChange}
            onClick={handleSearch}
          />
          <button onClick={exportToExcel} className={styles.exp_btn}>
            견적 내역 다운로드
          </button>
          <select
            onChange={(e) => filterData(e.target.value)}
            className={styles.select}
          >
            <option value="all">전체 내역</option>
            <option value="pending">대기 중인 내역</option>
            <option value="approved">승인 된 내역</option>
            <option value="rejected">거절 된 내역</option>
          </select>
          <div>
            {commonInfo.length > 0 ? (
              <table className={styles.table_main}>
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>작물 종류</th>
                    <th>농장 종류</th>
                    <th>주문번호</th>
                    <th>승인여부</th>
                    <th>상세정보</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => {
                    let approvalStatus;
                    if (item.useYn === "Y" && item.deleteYn === "N") {
                      approvalStatus = "승인";
                    } else if (item.deleteYn === "Y" && item.useYn === "N") {
                      approvalStatus = "거절";
                    } else {
                      approvalStatus = "대기";
                    }

                    return (
                      <tr key={item.id} className={styles.main}>
                        <td>{item.name}</td>
                        <td>{item.crop}</td>
                        <td>{item.type}</td>
                        <td>{item.createdAt}</td>
                        <td>{approvalStatus}</td>
                        <td>
                          <button
                            className={styles.button}
                            onClick={() => openModal(item)}
                          >
                            자세히 보기
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>주문 내역이 없습니다.</p>
            )}
          </div>

          <CustomModal
            title="견적 내역"
            isOpen={modalOpen}
            handleClose={() => setModalOpen(false)}
            onApprove={handleApproval}
            onReject={handleRejection}
          >
            {selectedItem && (
              <div className={styles.selected_main}>
                <div>
                  <p>이름: {selectedItem.name}</p>
                </div>
                <div>
                  <p>작물 종류: {selectedItem.crop}</p>
                </div>
                <p>농장 종류: {selectedItem.type}</p>
                <p>주문번호: {selectedItem.createdAt}</p>
                <p>승인여부: {selectedItem.useYn}</p>
                <div className={styles.btn}>
                  <div className={styles.ok_btn}>
                    <button className={styles.outBtn} onClick={handleApproval}>
                      승인
                    </button>
                    <button className={styles.outBtn} onClick={handleRejection}>
                      거절
                    </button>
                  </div>
                  <div className={styles.closeBtn}>
                    <button onClick={() => setModalOpen(false)}>닫기</button>
                  </div>
                </div>
              </div>
            )}
          </CustomModal>
          <div className={styles.pagination}>
            <PaginationButton
              currentPage={currentPage}
              totalPage={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default QuotationsCare;
