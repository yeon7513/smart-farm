import React from "react";
import styles from "./InfoInput.module.scss";
import { CiSearch } from "react-icons/ci";
function InfoInput(props) {
  return (
    <div className={styles.main}>
      <div className={styles.menu}>
        <div className={styles.input}>
          <div className={styles.input_item}>
            <span>병/작물</span>
            <input type="text" />
          </div>
        </div>
        {/* <div className={styles.btn}>
        <button>
          <CiSearch /> 조회
        </button>
      </div> */}

        <div className={styles.select_box}>
          <div className={styles.select_box_item}>
            <span>작물</span>
            <select className={styles.big}>
              <option value="" title="대분류">
                ::전체::
              </option>
              <option value="">채소</option>
              <option value="">과수</option>
            </select>
            <select className={styles.middle}>
              <option value="">::전체::</option>
              <option value="">과채류</option>
              <option value="">소과류</option>
              {/* <option value="">::전체::</option> */}
            </select>
            <select className={styles.Small}>
              <option value="">::전체::</option>
              <option value="">딸기</option>
              <option value="">참외</option>
              <option value="">토마토</option>
              <option value="">파프리카</option>
              <option value="">블루베리</option>
              {/* 블루베리-과수,소과류 */}
            </select>
          </div>

          <div className={styles.btn}>
            <button>
              <CiSearch /> 조회
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoInput;
