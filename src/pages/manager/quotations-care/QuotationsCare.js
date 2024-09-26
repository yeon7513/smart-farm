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
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState(commonInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPayments("payments"));
    dispatch(fetchCommonInfo("dashboard"));
  }, [dispatch]);

  // 각 버튼 클릭 시 호출될 함수
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
          return `${optionCategory}: ${selectedOptions.join(", ")}`;
        }
      ),
    }));
    console.log(testPayments);
  }, [payments]);

  // firebase의 데이터를 excel로 불러옵니다.
  const exportToExcel = () => {
    // 데이터 변환
    // "payments" 컬렉션에 배열로 저장되어 있는 additionalOptions의 내용들을 문자열로 변환합니다.
    const processedData = payments.map((payment) => ({
      ...payment,
      additionalOptions: Object.entries(payment.additionalOptions).map(
        ([optionCategory, options]) => {
          const selectedOptions = Object.entries(options)
            .filter(([_, selected]) => selected)
            .map(([optionName]) => optionName);
          return `${optionCategory}: ${selectedOptions.join(", ")}`;
        }
      ),
    }));
    const worksheet = XLSX.utils.json_to_sheet(processedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "결제 내역");

    // 엑셀 파일 생성
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // 파일 다운로드
    saveAs(file, "결제 내역.xlsx");
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    //   // 전체 데이터를 가지고 있는 listItems를 활용해
    //   // 사용자가 입력한 키워드를 데이터에 포함하고 있는 객체를 원소로 가지는 배열을 만든다.
    //   // 만들어진 배열을 items state에 set 합니다.
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
    // 승인 처리 로직 구현
    if (selectedItem && selectedItem.useYn === "N") {
      try {
        const result = await dispatch(
          updateCommonInfo({
            collectionName: "dashboard",
            docId: selectedItem.docId,
            updateObj: { ...selectedItem, useYn: "Y", deleteYn: "N" },
          })
        ).unwrap();

        console.log(`문서 ${selectedItem}가 승인되었습니다!`, result);

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
    // 거절 처리 로직 구현
    if (selectedItem && selectedItem.deleteYn === "N") {
      try {
        const result = await dispatch(
          updateCommonInfo({
            collectionName: "dashboard",
            docId: selectedItem.docId,
            updateObj: { ...selectedItem, deleteYn: "Y", useYn: "N" },
          })
        ).unwrap();

        console.log(`문서 ${selectedItem}가 거절되었습니다!`, result);

        dispatch(fetchCommonInfo("dashboard"));
        setModalOpen(false);
      } catch (error) {
        console.error("거절 처리 중 오류 발생: ", error);
      }
    } else {
      console.error("거절할 수 없는 항목입니다.");
    }
  };

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
            <option value="pending">대기 중인 내역</option>
            <option value="all">전체 내역</option>
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
                  {filteredInfo.map((item) => {
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
                <p>이름: {selectedItem.name}</p>
                <p>작물 종류: {selectedItem.crop}</p>
                <p>농장 종류: {selectedItem.type}</p>
                <p>주문번호: {selectedItem.createdAt}</p>
                <p>승인여부: {selectedItem.useYn}</p>
              </div>
            )}
          </CustomModal>
          <div className={styles.pagination}>
            <PaginationButton
            // currentPage={currentPage}
            // totalPage={totalPages}
            // onPageChange={(page) => setCurrentPage(page)} // 페이지 변경
            />
          </div>
        </>
      )}
    </div>
  );
}

export default QuotationsCare;
