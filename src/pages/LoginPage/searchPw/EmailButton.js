import { TextField } from "@mui/material";
import emailjs from "emailjs-com";
import { useState } from "react";
import styles from "./EmailButton.module.scss";

function EmailButton({
  user,
  renderring,
  getDataForm,
  setIsDisabled,
  isdisabled,
}) {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [state, setState] = useState();
  const sendVerificationEmail = () => {
    // 이메일 보내기
    // 여기서 정의해야하는 것은 위에서 만든 메일 템플릿에 지정한 변수({{ }})에 대한 값을 담아줘야한다.
    const templateParams = {
      to_email: user.email, // 수신 이메일 ex) test@test.gmail.com,
      from_name: "ManageMent",
      message: `비밀 번호입니다, ${getDataForm}`,
    };
    emailjs
      .send(
        "Ifarm_772", // 서비스 ID
        "Ifarm_772", // 템플릿 ID
        templateParams,
        "nUuOMUNrcRNTWsYZB" // public-key
      )
      .then((response) => {
        console.log("이메일이 성공적으로 보내졌습니다:", response);
        setIsEmailSent(true);
      })
      .catch((error) => {
        console.error("이메일 보내기 실패:", error);
      });
  };
  console.log(user);
  const handleVerification = () => {
    sendVerificationEmail();
  };
  const handleConfirmButton = () => {
    if (state === getDataForm) {
      setIsDisabled(true);
    }
  };
  const handleChangeInput = (e) => {
    setState(e.target.value);
  };
  return (
    <>
      <div className={styles.container}>
        {renderring ? (
          <div className={styles.nav}>
            <h2>이메일 인증</h2>
            {isEmailSent ? (
              <div>
                <h5>
                  인증 이메일이 성공적으로 발송되었습니다. 이메일을
                  확인해주세요!
                </h5>
                {isdisabled ? "인증에 성공하셨습니다!" : "인증이 필요합니다."}
                <div className={styles.configMail}>
                  <TextField
                    onChange={handleChangeInput}
                    type="text"
                    label={"인증코드를 입력해주세요."}
                    disabled={isdisabled}
                  />
                  <button onClick={handleConfirmButton}>확인</button>
                </div>
              </div>
            ) : (
              <div className={styles.transfort}>
                <h5>❗ 가입하신 Email로 전송됩니다. </h5>
                <button onClick={handleVerification}>인증 메일 보내기</button>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default EmailButton;
