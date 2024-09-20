import React, { useState } from 'react'
import * as FaIcons from "react-icons/fa";
import styles from './FooterChattingForm.module.scss'


function FooterChattingForm() {
    const [inputValue, setInputValue] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message submitted: ", inputValue);
    setInputValue(""); // 입력 후 초기화 
}


  return (
    <>
<form className={styles.FooterChattingForm} onSubmit={handleSubmit}>
<input
className={styles.chatInput}
type='text'
placeholder='메세지를 입력하세요'
onChange={(e) => setInputValue(e.target.value)}
value={inputValue} 
/>
<button 
className={styles.chatBtn}
type='submit'
disabled={!inputValue}>
    <FaIcons.FaPaperPlane />
</button>

</form>
</>
  )
}

export default FooterChattingForm
