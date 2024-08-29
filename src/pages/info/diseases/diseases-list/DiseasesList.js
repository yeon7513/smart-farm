import React, { useState } from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';
import image from '../../../../assets/abou/식2.png';
import SearchBox from '../../../../components/search_box/SearchBox';
import styles from './DiseasesList.module.scss';

const diseasesList = [
  {
    id: 1,
    path: 'dddd1',
    name: '감자수염진딧물',
    a: '증상',
    b: '대처법 또는 방제법',
    image: image,
  },
  {
    id: 2,
    path: 'dddd2',
    name: '병해충이름2',
    a: '증상',
    b: '대처법 또는 방제법',
    image: image,
  },
  {
    id: 3,
    path: 'dddd3',
    name: '병해충이름3',
    a: '증상',
    b: '대처법 또는 방제법',
    image: image,
  },
  {
    id: 4,
    path: 'dddd4',
    name: '병해충이름4',
    a: '증상',
    b: '대처법 또는 방제법',
    image: image,
  },
  {
    id: 5,
    path: 'dddd5',
    name: '병해충이름5',
    a: '증상',
    b: '대처법 또는 방제법',

    image: image,
  },
  {
    id: 6,
    path: 'dddd6',
    name: '병해충이름6',
    a: '증상',
    b: '대처법 또는 방제법',

    image: image,
  },
  // {
  //   id: 7,
  //   path: "dddd7",
  //   name: "병해충이름7",
  //   a: "증상",
  //   b: "대처법 또는 방제법",
  //   image: image,
  // },
  // {
  //   id: 8,
  //   path: "dddd8",
  //   name: "병해충이름8",
  //   a: "증상",
  //   b: "대처법 또는 방제법",
  //   image: image,
  // },
  // {
  //   id: 9,
  //   path: "dddd9",
  //   name: "병해충이름9",
  //   a: "증상",
  //   b: "대처법 또는 방제법",
  //   image: image,
  // },
];

function DiseasesList() {
  const [data, setData] = useState(null); // API 데이터를 저장할 상태
  const [error, setError] = useState(null); // 에러 메시지를 저장할 상태
  const [loading, setLoading] = useState(true);
  // // const [more,setMore]=useState(5);
  // // const handleLoadMore=()=>{
  // //   setMore
  // // }

  // useEffect(() => {
  //   const apiKey = "2024570e96d7a69a9e49dfeb7fdc9739177c";
  //   const apiUrl = `/api1?apiKey=${apiKey}&serviceCode=SVC01&serviceType=AA003&dtlSrchFlag=kncr1`;
  //   // console.log(apiUrl);
  //   const fetchData = async () => {
  // try {
  //   const response = await fetch(apiUrl);
  //   if (!response.ok) {
  //     throw new Error("데이터 불러오기 실패");
  //   }
  //   const result = await response.json(); // JSON 데이터를 파싱
  //   setData(result);
  //   console.log(result); // 데이터를 상태에 저장
  // } catch (error) {
  //   setError(error.message); // 에러 메시지를 상태에 저장
  // } finally {
  //   setLoading(false); // 로딩 상태를 false로 설정
  // }
  // 석민님코드
  //     try {
  //       fetch(apiUrl)
  //         .then((response) => response.json())
  //         .then((result) => {
  //           console.log(result);
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <SearchBox />
      <div className={styles.items}>
        {diseasesList.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.title}>
              <div className={styles.item_img}>
                <img src={item.image} alt="" />
              </div>

              <div className={styles.item_name}>
                <div className={styles.item_list}>
                  {/* <p>작물:</p> */}
                  <p>
                    <span>(병&해충)</span>
                    가지
                  </p>
                </div>

                {/* <div className={styles.item_list}> */}
                <p>해충</p>
                {/* <p>해충</p> */}
                {/* </div> */}
                <div className={styles.item_list}>
                  {/* <p> 이름 : </p> */}
                  <Link to={`/info/${item.path}`}>
                    <p className={styles.name}>{item.name}</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.more}>
        <button>FIRST</button>
        <button>
          <GrFormPrevious />
        </button>
        <button>1</button>
        <button>2</button>
        <button>
          {' '}
          <MdOutlineNavigateNext />
        </button>
        <button>END</button>
      </div>
    </>
  );
}

export default DiseasesList;
