import React, { useEffect, useState } from "react";
import styles from "./Disaster.module.scss";
import DisasterList from "./disaster-list/DisasterList";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import DisasterButton from "./disaster-button/DisasterButton";
import DisasterItem from "./disasteritem/DisasterItem";

function Disaster(props) {
  return (
    <div className={styles.main}>
      <div className={styles.list}>
        <DisasterItem />
        <ul>
          <DisasterList />
        </ul>
      </div>

      <div className={styles.more}>
        <button>FIRST</button>
        <button>
          <GrFormPrevious />
        </button>
        <button>1</button>
        <button>2</button>
        <button>
          <MdOutlineNavigateNext />
        </button>
        <button>END</button>
      </div>
    </div>
  );
}

export default Disaster;
