import * as FaIcons from "react-icons/fa";
import styles from './FooterLiveChatting.module.scss';
import { useState } from "react";

function FooterLiveChatting() {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <div className={styles.chatForm} onSubmit={onsubmit}>
        <input
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        />
        <button className={styles.chatBtn} 
        type="submit"
        disabled={!inputValue}
        >
          <FaIcons.FaPaperPlane />
        </button>
      </div>
    </>
  );
}

export default FooterLiveChatting;
