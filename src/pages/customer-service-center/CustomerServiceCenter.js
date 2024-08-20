import React, { useState } from "react";
import styles from "./CustomerServiceCenter.module.scss";
import up from "../../../src/assets/arrow/up.png";
import down from "../../../src/assets/arrow/down.png";
import RequestForQuote from "./RequestForQuote";

function CustomerServiceCenter() {
  // down 버튼을 누르면 description(내용)이 보이고
  // up 버튼을 누르면 description(내용)이 보이지 않게 됩니다.
  const [isVisible, setIsVisible] = useState(false);

  // up, down버튼 클릭에 따라 description(내용)표시 여부를 변경합니다.
  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    // <RequestForQuote />
    <h1>FAQ</h1>
    // <div className={styles.page}>
    //   <div className={styles.faq}>
    //     <div className={styles.title}>
    //       <h3>tasukete</h3>
    //       {!isVisible ? (
    //         <button onClick={toggleVisibility}>
    //           <img src={down} alt="자세히 보기" />
    //         </button>
    //       ) : (
    //         <button onClick={toggleVisibility}>
    //           <img src={up} alt="간략히 보기" />
    //         </button>
    //       )}
    //     </div>
    //     {isVisible && (
    //       <div className={styles.description}>
    //         <h4>됬은 없는 단어입니다. 됀은 없는 단어입니다.</h4>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
}

export default CustomerServiceCenter;
