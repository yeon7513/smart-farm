import React from 'react';
import { CiSearch } from 'react-icons/ci';
import SearchBox from '../../../../components/search_box/SearchBox';
import styles from './DisasterList.module.scss';

function DisasterList(props) {
  return (
    <>
      {/* <div> */}
      <SearchBox
        placeholder={'검색어를 입력해주세요.'}
        name={
          <>
            <CiSearch /> 조회
          </>
        }
      />
      {/* </div> */}
      <div className={styles.menu}>
        <div className={styles.menu_bar}>
          <div className={styles.menu_number}>
            <p>번호</p>
          </div>
          <div className={styles.title}>
            <p>제목</p>
          </div>
          <div className={styles.date}>
            <p>등록일</p>
          </div>
          <div className={styles.check}>
            <p>조회수</p>
          </div>
        </div>
        <div>
          <li>
            <div className={styles.menu_list}>
              <div className={styles.menu_number}>
                <p>1</p>
              </div>
              <div className={styles.title}>
                <p>2022년 농작물 고온해(폭염) 위험 예측보고(7.25)</p>
              </div>
              <div className={styles.date}>
                <p>2022-07-18</p>
              </div>
              <div className={styles.check}>
                <p>55</p>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.menu_list}>
              <div className={styles.menu_number}>
                <p>1</p>
              </div>
              <div className={styles.title}>
                <p>2022년 농작물 고온해(폭염) 위험 예측보고(7.25)</p>
              </div>
              <div className={styles.date}>
                <p>2022-07-18</p>
              </div>
              <div className={styles.check}>
                <p>55</p>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.menu_list}>
              <div className={styles.menu_number}>
                <p>1</p>
              </div>
              <div className={styles.title}>
                <p>2022년 농작물 고온해(폭염) 위험 예측보고(7.25)</p>
              </div>
              <div className={styles.date}>
                <p>2022-07-18</p>
              </div>
              <div className={styles.check}>
                <p>55</p>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.menu_list}>
              <div className={styles.menu_number}>
                <p>1</p>
              </div>
              <div className={styles.title}>
                <p>2022년 농작물 고온해(폭염) 위험 예측보고(7.25)</p>
              </div>
              <div className={styles.date}>
                <p>2022-07-18</p>
              </div>
              <div className={styles.check}>
                <p>55</p>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.menu_list}>
              <div className={styles.menu_number}>
                <p>1</p>
              </div>
              <div className={styles.title}>
                <p>2022년 농작물 고온해(폭염) 위험 예측보고(7.25)</p>
              </div>
              <div className={styles.date}>
                <p>2022-07-18</p>
              </div>
              <div className={styles.check}>
                <p>55</p>
              </div>
            </div>
          </li>
        </div>
      </div>
    </>
  );
}

export default DisasterList;
