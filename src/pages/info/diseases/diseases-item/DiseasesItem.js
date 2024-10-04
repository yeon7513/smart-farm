import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import BackButton from "../../../../components/back-button/BackButton";
import styles from "./DiseasesItem.module.scss";

const apiKey = process.env.REACT_APP_DISEASESLIST_API_KEY;

function DiseasesItem() {
  const location = useLocation();
  const state = location.state || {};
  const { korName, cropName, selectedType, thumbImg } = state;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
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

        // 병/해충에 따라 키 값을 다르게 가져오기
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

        setData(detailResult.service);
      } catch (error) {}
      setIsLoading(false);
    };
    fetchData();
  }, [korName, selectedType, cropName]);

  const formatHtml = (html) => {
    if (!html) return "";
    return html.replaceAll(" <br />", ""); // Replace <br/> tags with space
  };

  useEffect(() => {
    const { korName, cropName, selectedType, thumbImg } = state || {};

    if (!korName || !cropName || !selectedType || !thumbImg) {
      navigate("/404", { replace: true });
    }
  }, [navigate]);

  return (
    <div>
      <BackButton />
      {isLoading ? (
        <div className={styles.loader}>
          <BarLoader size={15} color={"#669900"} loading={isLoading} />
        </div>
      ) : (
        <>
          <div className={styles.main}>
            {/* <div> */}
            <img src={thumbImg} alt="" />
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
            {selectedType === "NP01" ? (
              // 병해의 경우
              <div className={styles.text_item}>
                <h4>발생환경</h4>
                {data?.developmentCondition ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: formatHtml(data.developmentCondition),
                    }}
                  />
                ) : (
                  <p className={styles.no_explanation}>조사중입니다...</p>
                )}
              </div>
            ) : (
              // 해충의 경우
              <div className={styles.text_item}>
                <h4>생태정보</h4>
                {data?.ecologyInfo ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: formatHtml(data.ecologyInfo),
                    }}
                  />
                ) : (
                  <p className={styles.no_explanation}>조사중입니다...</p>
                )}
              </div>
            )}
            {selectedType === "NP01" ? (
              // 병해의 경우
              <div className={styles.text_item}>
                <h4>증상설명</h4>
                {data?.symptoms ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: formatHtml(data.symptoms),
                    }}
                  />
                ) : (
                  <p className={styles.no_explanation}>조사중입니다...</p>
                )}
              </div>
            ) : (
              // 해충의 경우
              <div className={styles.text_item}>
                <h4>피해정보</h4>
                {data?.damageInfo ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: formatHtml(data.damageInfo),
                    }}
                  />
                ) : (
                  <p className={styles.no_explanation}>조사중입니다...</p>
                )}
              </div>
            )}

            {data?.preventionMethod || data?.preventMethod ? (
              <div className={styles.text_item}>
                <h4>방재방법</h4> {/* 제목은 항상 "방재방법"으로 고정 */}
                <p
                  dangerouslySetInnerHTML={{
                    __html: formatHtml(
                      data.preventionMethod || data.preventMethod || ""
                    ),
                  }}
                />
              </div>
            ) : (
              <div className={styles.text_item}>
                <h4>방재방법</h4>
                <p className={styles.no_explanation}>조사중입니다...</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default DiseasesItem;
