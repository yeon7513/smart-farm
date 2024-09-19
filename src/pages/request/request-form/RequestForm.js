import React, { useEffect, useState } from "react";
import SearchAddr from "../../../components/search-addr/SearchAddr";
import styles from "./RequestForm.module.scss";
import FacilitiesHorticulture from "../FacilitiesHorticulture";
import OpenGround from "../OpenGround";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../api/firebase";
import { useNavigate } from "react-router-dom";

function RequestForm({ user, onSubmit }) {
  const [cropType, setCropType] = useState("딸기");
  const [farmAddress, setFarmAddress] = useState("");
  const [facilityType, setFacilityType] = useState("시설원예");
  const [farmName, setFarmName] = useState("");
  const [farmArea, setFarmArea] = useState("");
  const [farmEquivalent, setFarmEquivalent] = useState("");
  const [additionalOptions, setAdditionalOptions] = useState({});
  // const [paymentMethod, setPaymentMethod] = useState("");
  // const [accountHolder, setAccountHolder] = useState("");
  const [IMP, setIMP] = useState(null);
  const { uid } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();

  // 회원가입이 되어있지 않은 경우 농장 주소는 공백이 됩니다.
  useEffect(() => {
    if (user) {
      setFarmAddress(user.farmAddress || "");
    }
  }, [user]);

  // 포트원의 라이브러리를 추가합니다.
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.onload = () => {
      setIMP(window.IMP);
      const IMP = window.IMP;
      IMP.init("INIBillTst"); // 스크립트가 로드된 후 초기화
      setIMP(IMP);
    };
    document.body.appendChild(script);
  }, []);

  // 결제가 진행되는 창을 띄웁니다.
  const onclickPay = (pgValue = "inicis", payMethod = "card") => {
    if (!IMP) return;

    const data = {
      pg: pgValue,
      pay_method: payMethod,
      merchant_uid: `merchant_${Date.now()}`,
      name: "견적 비용",
      amount: 1,
      buyer_email: user.email,
      buyer_name: user.name,
      buyer_number: user.number,
      buyer_address: user.address,
      m_redirect_url: "",
    };

    console.log("결제 요청 데이터:", data);

    IMP.request_pay(
      {
        amount: 1000,
        buyer_name: user.name,
        name: "견적 비용",
      },
      function (response) {
        //결제 후 호출되는 callback함수
        if (response.success) {
          //결제 성공
          console.log(response);
        } else {
          console.log("결제실패 : " + response.error_msg);
        }
      }
    );
    const handleChange = (e) => {
      const value = e.target.value;

      const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{0,8}$/;

      if (regex.test(value)) {
        setFarmName(value);
      } else {
        return false;
      }
    };

    // 주소를 받아옵니다.
    const handleGetAddr = (addr) => {
      setFarmAddress(addr);
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

    // 결제 방식을 변경합니다.
    // const handlePaymentMethodChange = (e) => {
    //   setPaymentMethod(e.target.value);
    // };

    // 견적 내용을 저장합니다.
    const handleSubmit = async (e) => {
      e.preventDefault();

      const farmAreaNum = Number(farmArea);
      const farmEquivalentNum = Number(farmEquivalent);

      // 입력 사항을 입력하지 않았을 경우 견적 제출을 할 수 없습니다.
      if (
        isNaN(farmAreaNum) ||
        farmAreaNum <= 0 ||
        isNaN(farmEquivalentNum) ||
        farmEquivalentNum <= 0 ||
        farmAddress.trim() === "" ||
        farmName.trim() === ""
        // paymentMethod === "" ||
        // (paymentMethod === "무통장 입금" && accountHolder.trim() === ""
      ) {
        // )
        console.log(
          "농장 면적과 동 수는 최소 1 이상, 농장 주소와 이름, 결제내역은 반드시 설정해주시기 바랍니다."
        );
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
        name: user.name,
        nick: user.nick,
        number: user.number,
        address: user.address,
        farmAddress: farmAddress,
        cropType: cropType,
        facilityType: facilityType,
        additionalOptions: Object.keys(additionalOptions).filter(
          (key) => additionalOptions[key]
        ),
        farmArea: farmArea,
        farmName: farmName,
        farmEquivalent: farmEquivalent,
        createdAt: createdAt,
        // paymentMethod: paymentMethod,
      };
      // onSubmit(dataObj);

      try {
        if (uid) {
          // 사용자의 결제내역에 데이터를 추가합니다.
          // 'payments' 컬렉션에 새로운 데이터 추가
          const paymentCollectionRef = collection(db, "payments");
          await addDoc(paymentCollectionRef, dataObj);
          console.log("데이터가 성공적으로 추가되었습니다.");

          // 폼 데이터 초기화
          setFarmAddress("");
          setFarmName("");
          setFarmArea("");
          setFarmEquivalent("");
          setAdditionalOptions({});
          // setPaymentMethod("");
          // setAccountHolder("");
          // 이전 페이지로 돌아갑니다.
          navigate(-1);
        } else {
          console.error("사용자 ID가 설정되지 않았습니다.");
        }
      } catch (error) {
        console.error("에러가 발생하였습니다: ", error);
      }
    };

    return (
      <form className={styles.requestForm} onSubmit={handleSubmit}>
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
              <button>평</button>
            </div>
            <div className={styles.farmEquivalent}>
              <h3>농장 동 수:</h3>
              <select
                value={farmEquivalent}
                onChange={(e) => setFarmEquivalent(Number(e.target.value))}
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
          {/* <div className={styles.paymentMethod}>
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
              value="가상계좌"
              name="paymentMethod"
              onChange={handlePaymentMethodChange}
            />
            가상계좌
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
          <label>
            <input
              type="radio"
              value="핸드폰 결제"
              name="paymentMethod"
              onChange={handlePaymentMethodChange}
            />
            핸드폰 결제
          </label>
          <label>
            <input
              type="radio"
              value="카카오페이"
              name="paymentMethod"
              onChange={handlePaymentMethodChange}
            />
            카카오페이
          </label>
          <div>
            {paymentMethod === "" ? (
              "결제 방식을 선택하여 주시기 바랍니다."
            ) : paymentMethod === "신용카드" ? (
              "신용카드 결제"
            ) : paymentMethod === "가상계좌" ? (
              "가상계좌 결제"
            ) : paymentMethod === "무통장 입금" ? (
              <>
                <div>
                  <select>
                    <option>농협은행: 355-08-37955 예금주명</option>
                  </select>
                </div>
                <div>
                  {user ? (
                    <input type="text" value={user.name} readOnly />
                  ) : (
                    <input
                      type="text"
                      placeholder="예금주명을 입력하여 주십시오."
                      onChange={(e) => setAccountHolder(e.target.value)}
                    />
                  )}
                </div>
              </>
            ) : paymentMethod === "핸드폰 결제" ? (
              <>
                <select>
                  <option value="SKT">SKT</option>
                  <option value="KT">KT</option>
                  <option value="LG U+">LG U+</option>
                  <option value="SKT 알뜰폰">SKT 알뜰폰</option>
                  <option value="KT 알뜰폰">KT 알뜰폰</option>
                  <option value="LG U+ 알뜰폰">LG U+ 알뜰폰</option>
                </select>
                <div>
                  {user ? (
                    <input type="text" value={user.number} readOnly />
                  ) : (
                    <input type="text" />
                  )}
                </div>
              </>
            ) : (
              "카카오페이 결제"
            )}
          </div> */}
          <button onClick={() => onclickPay("inicis", "card")}>결제하기</button>
        </div>
        <div className={styles.btns}>
          <button className={styles.submit} type="submit">
            저장
          </button>
          <button
            type="button"
            className={styles.cancel}
            onClick={() => navigate(-1)}
          >
            취소
          </button>
        </div>
        {/* </div> */}
      </form>
    );
  };
}

export default RequestForm;
