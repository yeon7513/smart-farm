import React, { useEffect, useState } from "react";
import SearchAddr from "../../../components/search-addr/SearchAddr";
import styles from "./RequestForm.module.scss";
import FacilitiesHorticulture from "../FacilitiesHorticulture";
import OpenGround from "../OpenGround";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../api/firebase";
import { useNavigate } from "react-router-dom";
import { convertingAddressToGeoCode } from "./../../../api/geoCode";

function RequestForm({ user }) {
  const [cropType, setCropType] = useState("딸기");
  const [farmAddress, setFarmAddress] = useState("");
  const [facilityType, setFacilityType] = useState("시설원예");
  const [farmName, setFarmName] = useState("");
  const [farmArea, setFarmArea] = useState("");
  const [farmEquivalent, setFarmEquivalent] = useState(0);
  const [additionalOptions, setAdditionalOptions] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [cashReceipt, setCashReceipt] = useState("현금영수증 ×");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [isIamportLoaded, setIsIamportLoaded] = useState(false);
  const { uid } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();

  // 농장 동 수 선택 핸들러 수정
  const handleFarmEquivalentChange = (e) => {
    setFarmEquivalent(Number(e.target.value));
  };

  // 회원가입이 되어있지 않은 경우 농장 주소는 공백이 됩니다.
  useEffect(() => {
    if (user) {
      setFarmAddress(user.farmAddress || "");
    }
  }, [user]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // 스크립트가 로드된 후의 동작을 여기에 작성할 수 있습니다.
      console.log("IAMPORT 라이브러리가 로드되었습니다.");
      setIsIamportLoaded(true);
    };

    script.onerror = () => {
      console.error("IAMPORT 라이브러리 로드 실패");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function onClickPayment() {
    const merchant_uid = `order_${new Date().getTime()}`;

    if (!isIamportLoaded) {
      console.error("IAMPORT 라이브러리가 로드되지 않았습니다.");
      return;
    }

    const farmAreaNum = Number(farmArea);
    const farmEquivalentNum = Number(farmEquivalent);

    // 입력 사항을 입력하지 않았을 경우 견적 제출을 할 수 없습니다.
    if (
      isNaN(farmAreaNum) ||
      farmAreaNum <= 0 ||
      isNaN(farmEquivalentNum) ||
      farmEquivalentNum <= 0 ||
      farmAddress.trim() === "" ||
      farmName.trim() === "" ||
      paymentMethod === ""
    ) {
      console.log("필수 항목을 모두 입력하여 주시기 바랍니다.");
      return;
    }

    if (typeof window.IMP === "undefined") {
      console.error("결제 라이브러리가 로드되지 않았습니다.");
      return;
    }

    const { IMP } = window;
    // 가맹점 식별코드를 이용하여 IMP 객체를 초기화합니다.
    IMP.init("imp68411640");

    const data = {
      // pg의 값은 PG Provider.MID 의 값입니다.
      pg: "html5_inicis.INIpayTest",
      pay_method: "card",
      merchant_uid: `order_${new Date().getTime()}`,
      amount: 10,
      name: "아이팜 결제",
      buyer_name: user.name,
      buyer_number: user.number,
      buyer_email: user.email,
      buyer_address: user.address,
    };

    IMP.request_pay(data, (response) => callback(response, merchant_uid));
  }

  const callback = async (response, merchant_uid) => {
    const { success, error_msg, imp_uid } = response;
    if (success && imp_uid) {
      try {
        await handleSubmit(imp_uid, merchant_uid); // handleSubmit에 merchant_uid 전달
        navigate(-1);
      } catch (error) {
        console.error("데이터 저장 중 오류 발생: ", error.message);
      }
    } else {
      console.log(`결제 실패: ${error_msg}`);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{0,8}$/;

    if (regex.test(value)) {
      setFarmName(value);
    }
  };

  // 주소를 받아옵니다.
  const handleGetAddr = async (addr) => {
    setFarmAddress(addr);

    try {
      // 주소의 위도, 경도 값을 가져옵니다.
      const { lat = null, lng = null } =
        (await convertingAddressToGeoCode(addr)) || {};
      setLat(lat);
      setLng(lng);
    } catch (error) {
      console.error("주소 변환 중 오류 발생: ", error.message);
    }
  };

  // 농장 종류를 변경합니다.
  const handleFacilityTypeChange = (e) => {
    setFacilityType(e.target.value);
    setAdditionalOptions({});
  };

  // 부가 옵션을 변경합니다.
  const handleAdditionalOptionsChange = (e) => {
    const value = e.target.value;
    setAdditionalOptions((prevOptions) => {
      // 옵션이 이미 존재하는 경우 제거하고, 그렇지 않으면 추가합니다.
      const updatedOptions = { ...prevOptions };
      if (updatedOptions[value]) {
        delete updatedOptions[value];
      } else {
        updatedOptions[value] = value;
      }
      return updatedOptions;
    });
  };

  // 현금영수증 발행 여부를 결정하는 함수입니다.
  const handleCashReceipt = (e) => {
    setCashReceipt(e.target.checked ? "현금영수증 ○" : "현금영수증 ×");
  };

  // 결제 방식을 변경합니다.
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    if (e.target.value === "신용카드") {
      setCashReceipt("현금영수증 ×");
    }
  };

  // 견적 내용을 저장합니다.
  const handleSubmit = async (imp_uid, merchant_uid) => {
    if (!imp_uid) {
      console.error("imp_uid가 필요합니다.");
      return;
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    // 주문번호입니다.
    const createdAt = `${year}${month}${day}${new Date().getTime()}`;

    const dataObj = {
      uid: user.uid,
      email: user.email,
      name: user.name,
      nick: user.nickname,
      number: user.number,
      address: user.address,
      farmAddress: farmAddress,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      cropType: cropType,
      facilityType: facilityType,
      additionalOptions: Object.keys(additionalOptions).filter(
        (key) => additionalOptions[key]
      ),
      farmArea: Number(farmArea),
      farmName: farmName,
      farmEquivalent: Number(farmEquivalent),
      createdAt: createdAt,
      paymentMethod: paymentMethod,
      cashReceipt: cashReceipt,
      imp_uid: imp_uid,
      merchant_uid: merchant_uid,
    };

    // dashboard로 넘겨서 승인여부(useYn)를 검사합니다. (기본값: n)
    const dashboardObj = {
      name: user.name,
      createdAt: `${new Date().getTime()}`,
      crop: cropType,
      deleteYn: "N",
      userDocId: user.uid,
      farmName: farmName,
      latitude: lat,
      longitude: lng,
      type: facilityType,
      updatedAt: `${new Date().getTime()}`,
      useYn: "N",
      userId: user.email,
      imp_uid: imp_uid,
      merchant_uid: merchant_uid,
    };

    try {
      await Promise.all(
        Array.from({ length: farmEquivalent }, async () => {
          const paymentCollectionRef = collection(db, "payments");
          const dashboardObjCollectionRef = collection(db, "dashboard");

          await addDoc(paymentCollectionRef, dataObj);
          await addDoc(dashboardObjCollectionRef, dashboardObj);
        })
      );
      console.log("데이터가 성공적으로 추가되었습니다.");
      resetForm();
    } catch (error) {
      console.error("에러가 발생하였습니다: ", error.message);
    }
  };

  // 폼 데이터 초기화하는 함수입니다.
  const resetForm = () => {
    setFarmAddress("");
    setFarmName("");
    setFarmArea("");
    setFarmEquivalent("");
    setAdditionalOptions({});
    setPaymentMethod("");
    setAccountHolder("");
    setCashReceipt("현금영수증 ×");
    setLat(null);
    setLng(null);
  };

  return (
    <form className={styles.requestForm} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.userContainer}>
        <div className={styles.user}>
          <div>
            <h3>신청인: </h3>
            <p>{user.name}</p>
          </div>
          <div>
            <h3>연락처: </h3>
            <p>{user.number}</p>
          </div>
        </div>
        <div className={styles.farmAddress}>
          <h3>농장 주소: </h3>
          <SearchAddr getAddr={handleGetAddr} className={styles.addr} />
        </div>
        <div className={styles.farmName}>
          <h3>농장 이름: </h3>
          <input
            type="text"
            placeholder={"최대 8자 입력 가능합니다."}
            onChange={handleChange}
            value={farmName}
          />
        </div>
      </div>

      <div className={styles.farm}>
        <div className={styles.cropType}>
          <div>
            <h3>작물 종류: </h3>
            <select
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
            >
              <option value="딸기">딸기</option>
              <option value="블루베리">블루베리</option>
              <option value="파프리카">파프리카</option>
              <option value="토마토">토마토</option>
              <option value="참외">참외</option>
            </select>
          </div>
          <div>
            <h3>농장 선택: </h3>
            <select value={facilityType} onChange={handleFacilityTypeChange}>
              <option value="시설원예">시설원예</option>
              <option value="노지">노지</option>
            </select>
          </div>
          <div className={styles.farmArea}>
            <h3>농장 면적:</h3>
            <input
              type="number"
              onChange={(e) => setFarmArea(Number(e.target.value))}
              min="1"
              value={farmArea}
            />
            <span>평</span>
          </div>
          <div className={styles.farmEquivalent}>
            <h3>농장 동 수:</h3>
            <select
              value={farmEquivalent}
              onChange={handleFarmEquivalentChange}
            >
              <option value="0">값을 선택하여 주시기 바랍니다.</option>
              {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            동
          </div>
        </div>

        <div className={styles.option}>
          <h3>부가 옵션 선택: </h3>
          {facilityType === "시설원예" ? (
            <FacilitiesHorticulture
              additionalOptions={additionalOptions}
              handleAdditionalOptionsChange={handleAdditionalOptionsChange}
            />
          ) : (
            <OpenGround
              additionalOptions={additionalOptions}
              handleAdditionalOptionsChange={handleAdditionalOptionsChange}
            />
          )}
        </div>
        <div className={styles.paymentMethod}>
          <h3>결제 방식: </h3>
          <label>
            <input
              type="radio"
              value="신용카드"
              name="paymentMethod"
              onChange={handlePaymentMethodChange}
            />
            신용카드
          </label>
          <label>
            <input
              type="radio"
              value="무통장 입금"
              name="paymentMethod"
              onChange={handlePaymentMethodChange}
            />
            무통장 입금
          </label>
          <div>
            {paymentMethod === "" ? (
              "결제 방식을 선택하여 주시기 바랍니다."
            ) : paymentMethod === "신용카드" ? (
              <>
                <div>결제 버튼을 누르시면 결제 창으로 이동합니다.</div>
              </>
            ) : (
              <>
                <div>
                  <select>
                    <option>농협은행: 355-08-37955 {user.name}</option>
                  </select>
                </div>
                {/* 비회원의 경우 예금주명을 따로 적어주어야 합니다. */}
                <div>
                  {user ? (
                    ""
                  ) : (
                    <input
                      type="text"
                      placeholder="예금주명을 입력하여 주십시오."
                      onChange={(e) => setAccountHolder(e.target.value)}
                      value={accountHolder}
                    />
                  )}
                </div>
                <label>
                  <input
                    type="checkbox"
                    value="현금영수증"
                    onClick={handleCashReceipt}
                  />
                  {cashReceipt}
                </label>
              </>
            )}
          </div>
        </div>
        <div className={styles.btns}>
          <button
            className={styles.submit}
            type="button"
            onClick={onClickPayment}
          >
            결제
          </button>
          <button
            type="button"
            className={styles.cancel}
            onClick={() => navigate(-1)}
          >
            취소
          </button>
        </div>
      </div>
    </form>
  );
}

export default RequestForm;
