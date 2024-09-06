import React, { useEffect, useState } from "react";
import styles from "./DiseasesItem.module.scss";
import BackButton from "../../../../components/back-button/BackButton";
import { useLocation } from "react-router-dom";

const apiKey = "2024570e96d7a69a9e49dfeb7fdc9739177c";

function DiseasesItem() {
  const { korName, cropName, selectedType, thumbImg } = useLocation().state;
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("selected type:", selectedType);
    console.log("korName:", korName);
    console.log("selectedType:", selectedType);
    const fetchData = async () => {
      try {
        // let serviceType = "AA003";
        let serviceCode = "";
        let detailKeyName = "";
        let detailKey = "";

        // 첫 번째 api호출-기본정보조회
        if (selectedType === "NP01") {
          serviceCode = "SVC01";
          detailKeyName = "sickNameKor";
          detailKey = "sickKey";
        } else if (selectedType === "NP03") {
          serviceCode = "SVC03";
          detailKeyName = "insectKorName";
          detailKey = "insectKey";
        }
        const response = await fetch(
          `/desease/?apiKey=${apiKey}&serviceCode=${serviceCode}&serviceType=AA003&cropName=${cropName}&${detailKeyName}=${korName}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        // console.log(result.service.list[0].sickKey);
        // console.log(result.service.list[0].insectKey);

        // 병/해충에 따라 키 값을 다르게 가져오기
        // if (selectedType === "NP01") {
        //   detailKey = result.serviceCode[detailKeyName]; // 병해의 상세 키 추출
        // } else if (selectedType === "NP03") {
        //   detailKey = result.serviceCode[detailKeyName]; // 해충의 상세 키 추출
        // }
        const detailKeyValue = result.service.list[0][detailKey];

        // 두번째 api 호출-상세정보조회
        if (selectedType === "NP01") {
          serviceCode = "SVC05";
        } else if (selectedType === "NP03") {
          serviceCode = "SVC07";
        }

        const detailResponse = await fetch(
          `/desease/?apiKey=${apiKey}&serviceCode=${serviceCode}&serviceType=AA003&${detailKey}=${detailKeyValue}`
        );
        if (!detailResponse.ok) {
          throw new Error(`HTTP error! status: ${detailResponse.status}`);
        }
        const detailResult = await detailResponse.json();
        console.log("api", detailResult);

        setData(detailResult.service);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [korName, selectedType, cropName]);

  const formatHtml = (html) => {
    if (!html) return "";
    return html.replace(/\r\n/gi, " <br />"); // Replace <br/> tags with space
  };
  return (
    <div>
      <BackButton />

      <div className={styles.main}>
        {/* <div> */}
        <img src={thumbImg} />
        {/* </div> */}
        <div className={styles.title}>
          <div>
            <span>해충명</span>
            <p>{korName}</p>
          </div>
          <div>
            <span>{selectedType === "NP01" ? "영문명" : "목/과명"}</span>
            <p>
              {" "}
              {data && data.insectOrder && data.insectFamily
                ? `${data.insectOrder}/${data.insectFamily}`
                : data
                ? data.sickNameEng
                : "Loading..."}
            </p>
          </div>
          <div>
            <span>작물명</span>
            <p>{data?.cropName}</p>
          </div>
        </div>
      </div>
      <div className={styles.title_item}>
        <div>
          <h1>일반정보</h1>
        </div>
        {data?.developmentCondition || data?.ecologyInfo ? (
          <div>
            <h4>{selectedType === "NP01" ? "발생환경" : "생태정보"}</h4>
            <p
              dangerouslySetInnerHTML={{
                __html: formatHtml(
                  data.developmentCondition || data.ecologyInfo || ""
                ),
              }}
            />
          </div>
        ) : null}
        {data?.symptoms || data?.damageInfo ? (
          <div>
            <h4>{selectedType === "NP01" ? "증상설명" : "피해정보"}</h4>
            <p
              dangerouslySetInnerHTML={{
                __html: formatHtml(data.symptoms || data.damageInfo || ""),
              }}
            />
          </div>
        ) : null}
        {data?.preventionMethod || data?.preventMethod ? (
          <div>
            <h4>방재방법</h4>
            <p
              dangerouslySetInnerHTML={{
                __html: formatHtml(
                  data.preventionMethod + data.preventMethod || ""
                ),
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default DiseasesItem;
