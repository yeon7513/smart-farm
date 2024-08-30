
import { Modal } from '@mui/material';
import React, { useState } from 'react'
import styles from './customModal.module.scss';
 
function CustomModal({title, btnName, children, isOpen, handleClose}) {

    return (
    <div>
        <Modal className={styles.Modal}
        open={isOpen}
        onClose={handleClose}
        >    
        <div className={styles.customModal}>
           <div className='outExplain'>
<h2>{title}</h2>
<button onClick={handleClose}>닫기</button>
           </div>
           <div className='conten'>
           {children}

           </div>
           <div>
            <button>{btnName}</button>
            <button onClick={handleClose}>취소</button>
           </div>
            
            </div>   
        </Modal>

        </div>
  )
}

export default CustomModal