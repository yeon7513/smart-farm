import React, { useState } from 'react';
import SearchAddr from '../../../components/search-addr/SearchAddr';
import styles from './RequestForm.module.scss';

function RequestForm() {
  const [farmAddr, setFarmAddr] = useState('');

  const handleGetAddr = (addr) => {
    setFarmAddr(addr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataObj = {
      farmAddress: farmAddr,
    };

    console.log(dataObj);
  };

  return (
    <div className={styles.requestForm}>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>견적 정보</h3>
        </div>
        <div className={styles.id}>
          <h3>견적 의뢰 아이디</h3>
          <input type="text" />
        </div>
        <div className={styles.paymentDate}>
          <h3>결제 날짜</h3>
        </div>

        <div className={styles.farmAddress}>
          <h3>농장 주소</h3>
          <SearchAddr getAddr={handleGetAddr} />
        </div>
        <div className={styles.farmName}>
          <h3>농장 이름</h3>
          <input type="text" placeholder={'농장 이름을 입력해주세요.'} />
        </div>
        <div>
          <h3>시설원예 혹은 노지 선택</h3>
          {/* <select value={facilityType} onChange={handleFacilityTypeChange}> */}
          <select>
            <option value="시설원예">시설원예</option>
            <option value="노지">노지</option>
          </select>
        </div>
        <div className={styles.farmArea}>
          <h3>농장 면적</h3>
          <input type="number" min="1" />
          {/*  */}
          <button>평</button>
        </div>
        <div className={styles.farmEquivalent}>
          <h3>농장 동 수</h3>
          <select type="number">
            <option value="0">값을 선택하여 주시기 바랍니다.</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
          동
        </div>
        <div>
          <h3>부가 옵션 선택</h3>
          {/* 옵션 렌더링 */}
        </div>
        <button>결제</button>
      </form>
    </div>
  );
}

export default RequestForm;
