
import { Modal, StyledEngineProvider } from '@mui/material';
import React, { useState } from 'react'
import styles from './customModal.module.scss';
import cn from 'classnames';
import Footer from './../layout/footer/Footer';
 
function CustomModal({title, btnName, children, isOpen, handleClose, className}) {

    return (
    <div>
        <Modal className={styles.Modal}
        open={isOpen}
        onClose={handleClose}
        >    
        <div className={cn(styles.customModal, className)}>
           <div className={styles.header}>
<h2 className={styles.customTitle}>{title}</h2>
<button className={styles.closeBtn} onClick={handleClose}>닫기</button>
           </div>
           <div className={styles.content}>
           {children}

           </div>
           <div className={styles.footer}>
            <button className={styles.outBtn}>{btnName}</button>
            <button className={styles.cancelBtn} onClick={handleClose}>취소</button>
           </div>
            
            </div>   
        </Modal>

        </div>
  )
}

export default CustomModal