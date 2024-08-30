import React, { useState } from "react";
import Container from "../../layout/container/Container";
import style from "./Userout.module.scss";
import { Link } from "react-router-dom";
import { deleteDatas } from "../../../api/firebase";
import CustomModal from "../../modal/CustomModal";
import Maps from './../../map/Maps';
import { Box } from "@mui/material";

function Userout(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // const openPopup = () => {
  // setOpen(true)
    // const popupWidth = 600;
    // const popupHeight = 400;
    // const screenWidth = window.screen.width;
    // const screenHeight = window.screen.height;
    // const left = (screenWidth - popupWidth) / 2;
    // const top = (screenHeight - popupHeight) / 2;
    // // 새로운 창 열기 (URL, 창 이름, 창 속성)
    // const newWindow = window.open(
    //   "",
    //   "회원 탈퇴",
    //   `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
    // );
    // newWindow.document.write(`
    //     <html>
    //       <head>
    //         <title>회원 탈퇴</title>
    //       </head>
    //       <body>
    //         <p>회원 탈퇴시 회원님의 정보는 삭제됩니다.</p>
    //         <p>탈퇴하시겠습니까?</p>
    //         <input type="checkbox"/>
    //         <span>주의사항을 확인했습니다.</span>
    //         <button onclick=handleDelete()>회원탈퇴</button>
    //         <button onclick="window.close()">닫기</button>
    //         </body>
    //       <script>      
    // const handleDelete = async (docId) => {
    // alert("정말 회원 탈퇴 하시겠습니까?");
    // }
    //       </script>
    //     </html>
    //   `);
  // };
  return (
    <Container className={style.container}>
      <div>
        <div>비밀번호</div>
        <input />
        <button onClick={openModal}>확인</button>
        <CustomModal title={'회원탈퇴'} btnName={'탈퇴하기'} isOpen={isModalOpen} handleClose={closeModal}>
        <div>
        <p>회원 탈퇴시 회원님의 정보는 삭제됩니다.</p>
  <p>탈퇴하시겠습니까?</p>
         <input type="checkbox"/>
         <span>주의사항을 확인했습니다.</span>
        </div>

        </CustomModal>
      </div>
    </Container>
  );
}
export default Userout;
