import React from 'react';
import styles from './Diseases.module.scss';
import DiseasesList from './diseases-list/DiseasesList';

function Diseases(props) {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.list}>
          <DiseasesList />
        </div>
      </div>
    </>
  );
}

export default Diseases;
