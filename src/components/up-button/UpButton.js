import React, { useEffect, useState } from "react";
import styles from "./UpButton.module.scss";
import { FaAngleUp } from "react-icons/fa";

function UpButton(props) {
  const [up, setUp] = useState(false);

  const handleScroll = () => {
    if (window.scroll > 300) {
      setUp(true);
    } else {
      setUp(false);
    }
  };
  const scrollTotop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.main}>
      <button className={styles.btn} onClick={scrollTotop}>
        <FaAngleUp />
      </button>
    </div>
  );
}

export default UpButton;
