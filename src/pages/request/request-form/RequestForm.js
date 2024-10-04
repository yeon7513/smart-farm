import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../api/firebase";
import SearchAddr from "../../../components/search-addr/SearchAddr";
import FacilitiesHorticulture from "../FacilitiesHorticulture";
import OpenGround from "../OpenGround";
import { convertingAddressToGeoCode } from "./../../../api/geoCode";
import styles from "./RequestForm.module.scss";
import { renameOptionsEn } from "../../../utils/renameOptions";

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
  const [selectedOptions, setSelectedOptions] = useState(
    Array.from({ length: 8 }, () => ({})) // 8개의 농장에 대해 초기화
  );
  const navigate = useNavigate();

  const facilitiesHorticultureOptions = {
    "환경 제어": [
      {
        id: "thermostat",
        value: "온도 조절기",
        label: "온도 조절기",
      },
      {
        id: "ventilationSystem",
        value: "환기 장치",
        label: "환기 장치",
      },
      { id: "shadingFilm", value: "차광막", label: "차광막" },
    ],
    "조명 시스템": [
      {
        id: "LEDGrowLights",
        value: "인공 조명",
        label: "인공 조명",
      },
      {
        id: "automaticLightingRegulator",
        value: "자동 조명 조절기",
        label: "자동 조명 조절기",
      },
    ],
    "관수 시스템": [
      {
        id: "automaticIrrigationSystem",
        value: "자동 관수 시스템",
        label: "자동 관수 시스템",
      },
      {
        id: "positiveLiquidMachine",
        value: "양액기",
        label: "양액기",
      },
    ],
    "센서 및 모니터링": [
      {
        id: "temperatureHumiditySensor",
        value: "온도 및 습도 센서",
        label: "온도 및 습도 센서",
      },
      {
        id: "CO2Sensor",
        value: "CO2 센서",
        label: "CO2 센서",
      },
      { id: "cctv", value: "cctv", label: "cctv" },
    ],
    "기타 장비": [
      {
        id: "positiveSolutionMeasurementSensor",
        value: "양액 측정 센서",
        label: "양액 측정 센서",
      },
      {
        id: "insectRepellect",
        value: "해충 퇴치기",
        label: "해충 퇴치기",
      },
      {
        id: "pestDigitalTrap",
        value: "해충 디지털 트랩",
        label: "해충 디지털 트랩",
      },
      { id: "birdRepellent", value: "조류 퇴치기", label: "조류 퇴치기" },
    ],
  };

  const openGroundOptions = {
    "관수 시스템": [
      {
        id: "dripIrrigationSystem",
        value: "드립 관수 시스템",
        label: "드립 관수 시스템",
      },
      {
        id: "sprinklerSystem",
        value: "스프링클러 시스템",
        label: "스프링클러 시스템",
      },
    ],
    "토양 관리": [
      {
        id: "soilPhMeter",
        value: "토양 ph 측정기",
        label: "토양 ph 측정기",
      },
      {
        id: "soilHumiditySensor",
        value: "토양 습도 센서",
        label: "토양 습도 센서",
      },
    ],
    "비료 및 농약 관리": [
      {
        id: "fertilizerApplicationMachine",
        value: "비료 살포기",
        label: "비료 살포기",
      },
      {
        id: "pesticideSprayer",
        value: "농약 살포기",
        label: "농약 살포기",
      },
    ],
    모니터링: [
      {
        id: "weatherStation",
        value: "기상 스테이션",
        label: "기상 스테이션",
      },
      {
        id: "cctv",
        value: "cctv",
        label: "cctv",
      },
    ],
    "지상용 드론": [
      {
        id: "quadcopter",
        value: "쿼드콥터",
        label: "쿼드콥터",
      },
      {
        id: "hexacopter",
        value: "헥사콥터",
        label: "헥사콥터",
      },
    ],
    트랙터: [
      {
        id: "MT7",
        value: "MT7",
        label: "MT7",
      },
      {
        id: "MT5",
        value: "MT5",
        label: "MT5",
      },
      {
        id: "MT4",
        value: "MT4",
        label: "MT4",
      },
    ],
    "기타 장비": [
      {
        id: "insectRepellect",
        value: "해충 퇴치기",
        label: "해충 퇴치기",
      },
      {
        id: "pestDigitalTrap",
        value: "해충 디지털 트랩",
        label: "해충 디지털 트랩",
      },
      { id: "birdRepellent", value: "조류 퇴치기", label: "조류 퇴치기" },
    ],
  };

  // 농장 동 수 선택 핸들러 수정
  const handleFarmEquivalentChange = (e) => {
    setFarmEquivalent(Number(e.target.value));
  };

  // 회원가입이 되어있지 않은 경우 견적 의뢰를 할 수 없습니다.
  useEffect(() => {
    if (!user) {
      navigate(-1);
      return;
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
  }, [farmEquivalent]);

  function onClickPayment() {
    const merchant_uid = `order_${new Date().getTime()}`;

    if (!isIamportLoaded) {
      console.error("IAMPORT 라이브러리가 로드되지 않았습니다.");
      return;
    }

    // 문자열로 되어있는 농장 면적과 농장 동 수를 숫자로 변환합니다.
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
      merchant_uid: merchant_uid,
      amount: 100,
      name: "아이팜 결제",
      buyer_name: user.name,
      buyer_number: user.number,
      buyer_email: user.email,
      buyer_address: user.address,
    };

    IMP.request_pay(data, (response) => callback(response, merchant_uid));
  }

  // 결제하고 결제 결과를 표시합니다.
  const callback = async (response, merchant_uid) => {
    const { success, error_msg, imp_uid } = response;
    if (success && imp_uid) {
      try {
        await handleSubmit(imp_uid, merchant_uid); // handleSubmit에 merchant_uid 전달
        navigate("/mypage");
      } catch (error) {
        console.error("데이터 저장 중 오류 발생: ", error.message);
      }
    } else {
      console.log(`결제 실패: ${error_msg}`);
    }
  };

  // 농장 주소의 값을 변경하는 함수입니다.
  const handleChange = (e) => {
    const value = e.target.value;

    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{0,8}$/;

    if (regex.test(value)) {
      setFarmName(value);
    }
  };

  // 농장 종류를 변경합니다.
  const handleFacilityTypeChange = (e) => {
    setFacilityType(e.target.value);
    setSelectedOptions(Array.from({ length: 8 }, () => ({})));
  };

  // 부가 옵션을 변경합니다.
  const handleAdditionalOptionsChange = (index, category, value) => {
    setSelectedOptions((prevOptions) => {
      const updatedOptions = { ...prevOptions };

      // 인덱스가 없으면 초기화합니다.
      if (!updatedOptions[index]) {
        updatedOptions[index] = {};
      }

      // 인덱스의 카테고리가 없으면 초기화 합니다.
      if (!updatedOptions[index][category]) {
        updatedOptions[index][category] = {};
      }

      // 현재 값을 토글합니다.
      updatedOptions[index][category][value] = updatedOptions[index][category][
        value
      ]
        ? undefined // "Y" 대신 undefined로 설정하여 값을 제거
        : "Y";

      console.log(updatedOptions);
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

    const { lat, lng } = await convertingAddressToGeoCode(farmAddress);

    try {
      // "estimate" 컬렉션에 새로운 문서 추가
      const estimateCollectionRef = collection(db, "estimate");
      await addDoc(estimateCollectionRef, {
        amount: 100,
        userId: user.uid,
        address: user.address,
        phoneNumber: user.number,
        facilityType: facilityType,
        farmArea: Number(farmArea),
        crop: cropType,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      });

      // "payments" 컬렉션에 새로운 문서 추가
      const paymentCollectionRef = collection(db, "payments");
      const paymentDocRef = await addDoc(paymentCollectionRef, {
        amount: 100,
        uid: user.uid,
        email: user.email,
        name: user.name,
        nick: user.nickname,
        number: user.number,
        address: user.address,
        farmAddress: farmAddress,
        lat: lat,
        lng: lng,
        cropType: cropType,
        facilityType: facilityType,
        farmArea: Number(farmArea),
        farmName: farmName,
        farmEquivalent: Number(farmEquivalent),
        createdAt: new Date().getTime(),
        paymentMethod: paymentMethod,
        cashReceipt: cashReceipt,
        imp_uid: imp_uid,
        merchant_uid: merchant_uid,
      });

      // "sector" 하위 컬렉션 추가
      const sectorCollectionRef = collection(paymentDocRef, "sector");

      // 각 농장 동에 대한 부가 옵션 저장
      await Promise.all(
        Array.from({ length: farmEquivalent }, async (_, index) => {
          const additionalOptionsForCurrentSector = selectedOptions[index];
          const control = {};

          // 선택된 옵션을 control 객체에 저장합니다.
          Object.entries(additionalOptionsForCurrentSector).forEach(
            ([category, options]) => {
              Object.keys(options).forEach((option) => {
                // 선택된 옵션에 한해 "Y"로 설정됩니다.
                if (options[option] === "Y") {
                  control[renameOptionsEn(option)] = "Y";
                }
              });
            }
          );

          const sectorData = {
            부가옵션: Object.keys(control).length > 0 ? control : {},
            id: index + 1,
          };

          await addDoc(sectorCollectionRef, sectorData);
          console.log(`${index + 1}동에 대한 부가 옵션이 저장되었습니다.`);
        })
      );

      // dashboard로 넘겨서 승인여부(useYn)를 검사합니다. (기본값: n)
      const dashboardObj = {
        name: user.name,
        createdAt: new Date().getTime(),
        crop: cropType,
        deleteYn: "N",
        userDocId: user.uid,
        farmName: farmName,
        lat: lat,
        lng: lng,
        type: facilityType,
        updatedAt: new Date().getTime(),
        useYn: "N",
        userId: user.email,
        imp_uid: imp_uid,
        merchant_uid: merchant_uid,
        paymentsDocId: paymentDocRef.id,
      };

      const dashboardDocRef = await addDoc(
        collection(db, "dashboard"),
        dashboardObj
      );

      // "dashboard" 하위 컬렉션인 "sector" 추가
      const dashboardSectorCollectionRef = collection(
        dashboardDocRef,
        "sector"
      );

      // 각 동의 정보를 저장
      await Promise.all(
        Array.from({ length: farmEquivalent }, async (_, index) => {
          const additionalOptionsForCurrentSector = selectedOptions[index];
          const control = {};

          // 선택된 옵션을 control 객체에 저장합니다.
          Object.entries(additionalOptionsForCurrentSector).forEach(
            ([category, options]) => {
              Object.keys(options).forEach((option) => {
                if (options[option] === "Y") {
                  control[renameOptionsEn(option)] = "Y";
                }
              });
            }
          );

          const sectorData = {
            control: Object.keys(control).length > 0 ? control : {},
            createdAt: new Date().getTime(),
            deleteYn: "N",
            growthInfo: {
              flwrCo: 0,
              frmhsld: 0,
              grwLt: 0,
              hvstCo: 0,
            },
            humidity: 0,
            id: index + 1,
            sunlight: 0,
            temperature: 0,
            updatedAt: new Date().getTime(),
            wind: 0,
          };

          await addDoc(dashboardSectorCollectionRef, sectorData);
          console.log(
            `${index + 1}동에 대한 대시보드 섹터 옵션이 저장되었습니다.`
          );
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
          <SearchAddr getAddr={setFarmAddress} className={styles.addr} />
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
          {Array.from({ length: farmEquivalent }).map((_, index) => (
            <div key={index}>
              <h3>{index + 1}번째 농장 부가 옵션 선택: </h3>
              {facilityType === "시설원예" ? (
                <FacilitiesHorticulture
                  additionalOptions={selectedOptions[index] || {}}
                  handleAdditionalOptionsChange={(category, value) =>
                    handleAdditionalOptionsChange(index, category, value)
                  }
                  options={facilitiesHorticultureOptions}
                />
              ) : (
                <OpenGround
                  additionalOptions={selectedOptions[index] || {}}
                  handleAdditionalOptionsChange={(category, value) =>
                    handleAdditionalOptionsChange(index, category, value)
                  }
                  options={openGroundOptions}
                />
              )}
            </div>
          ))}
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
