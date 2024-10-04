import { saveAs } from "file-saver";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { TbPencilSearch } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import * as XLSX from "xlsx";
import { fetchPayments } from "../../../store/payment/paymentsSlice";
import { db } from "../../../api/firebase";
import CustomModal from "../../../components/modal/CustomModal";
import PaginationButton from "../../../components/pagination-button/PaginationButton";
import SearchBox from "../../../components/search_box/SearchBox";
import {
  fetchCommonInfo,
  updateCommonInfo,
} from "../../../store/dashboard/dashboardSlice";
import styles from "./QuotationsCare.module.scss";
import { renameOptionsKor } from "../../../utils/renameOptions";

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

  // 페이지가 렌더링 될 때마다 최신화된 "payments"와 "dashboard"의 내용을 화면에 표시합니다.
  useEffect(() => {
    dispatch(fetchPayments("payments")); // 결제 데이터 가져오기
    dispatch(fetchCommonInfo("dashboard")); // 공통 정보 가져오기
  }, []);

  // 필터링된 데이터 처리(대기 및 승인여부)
  const filterData = (status) => {
    let filtered;

    if (status === "pending") {
      filtered = commonInfo.filter(
        (item) => item.useYn === "N" && item.deleteYn === "N"
      );
    } else if (status === "approved") {
      filtered = commonInfo.filter(
        (item) => item.useYn === "Y" && item.deleteYn === "N"
      );
    } else if (status === "rejected") {
      filtered = commonInfo.filter(
        (item) => item.deleteYn === "Y" && item.useYn === "N"
      );
    } else {
      filtered = commonInfo;
    }

    // 검색어에 따라 필터링
    if (keyword) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    setFilteredInfo(filtered);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 초기화
  };
  // listItems에 데이터를 저장하는 함수 (QuotationsCare에서 호출)
  const setListItems = (data) => {
    listItems = data; // 데이터 저장
  };

  // "payments"의 하위 컬렉션 "sector"의 데이터를 불러오는 함수입니다.
  const fetchSectorData = async (paymentId) => {
    try {
      const sectorRef = collection(db, "payments", paymentId, "sector");
      const sectorSnapshot = await getDocs(sectorRef);

      const additionalOptions = [];
      sectorSnapshot.forEach((doc) => {
        const data = doc.data();
        additionalOptions.push({
          동수: data.id, // 동수 추가
          부가옵션: data.부가옵션, // 부가옵션 추가
        });
      });
      return additionalOptions;
    } catch (error) {
      console.error("Error fetching sector data: ", error);
      return null;
    }
  };

  // payments를 listItems에 저장
  useEffect(() => {
    const fetchData = async () => {
      if (payments.length > 0) {
        // payments가 비어있지 않을 때만 호출
        const allSectorData = [];
        for (const payment of payments) {
          const sectorData = await fetchSectorData(payment.docId);
          const detailedInformation = [];

          // 각 sectorData에서 동수와 부가옵션을 추출합니다.
          Object.entries(sectorData).forEach(([key, value]) => {
            const equivalentNumber = value.동수;
            const additionalOptions = value.부가옵션;

            // 상세정보 배열에 객체를 추가합니다.
            detailedInformation.push({
              동수: equivalentNumber,
              부가옵션: additionalOptions,
            });
          });

          // 결제 정보와 상세 정보를 결합합니다.
          allSectorData.push({
            docId: payment.docId,
            상세내역: detailedInformation,
          });
        }
        setListItems(allSectorData);
      }
    };
    fetchData();
  }, []);

  // firebase의 데이터를 excel로 불러옵니다.
  const exportToExcel = async () => {
    const processedData = [];

    for (const payment of payments) {
      const sectorDataItem = listItems.find(
        (item) => item.docId === payment.docId
      );
      const additionalOptions = sectorDataItem ? sectorDataItem.상세내역 : [];

      // 부가옵션을 문자열로 변환
      const formattedOptions = additionalOptions.map((option) => ({
        동수: option.동수,
        부가옵션: Object.entries(option.부가옵션)
          .map(([key, value]) => (value === "Y" ? renameOptionsKor(key) : null))
          .filter(Boolean)
          .join(", "),
      }));

      formattedOptions.forEach((option) => {
        processedData.push({
          ...payment,
          동수: option.동수,
          부가옵션: option.부가옵션,
        });
      });
    }

    const worksheet = XLSX.utils.json_to_sheet(processedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "결제 내역");

    // excel 파일을 생성하고 다운로드하는 함수입니다.
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
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
    filterData("all");
  };

  // 검색 실행 핸들러
  const handleSearch = (e) => {
    e.preventDefault();
    const filteredItems = listItems.filter(({ name }) =>
      name.includes(keyword)
    );
    setItems(filteredItems);
  };

  // 모달을 여는 함수
  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  // 요청을 승인하는 함수입니다.
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

  // 요청을 거절하는 함수입니다.
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

  // filteredInfo를 createdAt 기준으로 내림차순 정렬
  const sortedInfo = [...filteredInfo].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const currentItems = sortedInfo.slice(indexOfFirstItem, indexOfLastItem);

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
                    <th>주문번호</th>
                    <th>이름</th>
                    <th>작물 종류</th>
                    <th>농장 종류</th>
                    <th>주문 날짜</th>
                    <th>승인여부</th>
                    <th>상세정보</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((item) => {
                      let approvalStatus;
                      if (item.useYn === "Y" && item.deleteYn === "N") {
                        approvalStatus = "승인";
                      } else if (item.deleteYn === "Y" && item.useYn === "N") {
                        approvalStatus = "거절";
                      } else {
                        approvalStatus = "대기";
                      }

                      return (
                        <tr key={item.docId || item.id} className={styles.main}>
                          <td>{item.createdAt}</td>
                          <td>{item.name}</td>
                          <td>{item.crop}</td>
                          <td>{item.type}</td>
                          <td>
                            {new Date(item.createdAt).toLocaleDateString(
                              "ko-KR"
                            )}
                          </td>
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
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        주문 내역이 없습니다.
                      </td>
                    </tr>
                  )}
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
                <p>
                  주문 날짜:{" "}
                  {new Date(selectedItem.createdAt).toLocaleDateString("ko-KR")}
                </p>
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
