import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addComplete } from "../../../store/as-service/asSlice";
import styles from "./AsPost.module.scss";

const INITIAL_VALUE = {
  title: "🔒 문의합니다.",
  count: 0,
  summary: "",
  createdAt: new Date().toISOString().split("T")[0],
  imgUrl: null,
  completeYn: "N",
  photoUrl: "",
};

function AsPost({ onClick, onSubmit, initialValue = INITIAL_VALUE }) {
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const [values, setValues] = useState(initialValue);
  const [file, setFile] = useState(null);
  const [postPassword, setPostPassword] = useState(null);
  const navigate = useNavigate();
  const [isSubmitting] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFileChange = (e) => {
    const imgFile = e.target.files[0];
    setFile(imgFile);
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    if (value.length <= 4 && !isNaN(value)) {
      setPostPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addObj = {
      ...values,
      imgUrl: file || "",
      nick: loginUser?.nickname,
      email: loginUser?.email,
      password: postPassword,
      photoUrl: loginUser?.photoUrl,
    };

    dispatch(addComplete({ collectionName: "as", addObj }))
      .then((result) => {
        setValues(INITIAL_VALUE);
        setFile(null);
        navigate(`/community/as/${result.payload.id}`, {
          state: result.payload,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <div>
        <h3>게시글 작성하기</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.title}>
          <p>제목:</p>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className={styles.content}>
          <p>내용:</p>
          <textarea
            name="summary"
            placeholder="내용을 입력해주세요."
            value={values.summary || ""}
            onChange={handleChange}
          />
        </div>
        <b>
          ※ 부적절한 콘텐츠가 포함될 경우 관리자에 의해 게시글이 삭제될 수
          있으며, 해당 아이디가 정지 처리될 수 있습니다.
        </b>
        <div className={styles.file}>
          <p>첨부:</p>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className={styles.password}>
          <p>암호:</p>
          <input
            type="number"
            value={postPassword || ""}
            onChange={handlePassword}
          />
        </div>
        <div>
          <b>
            비밀번호는 숫자 4자리로 설정 가능합니다. 게시글 확인 시 비밀번호
            입력이 필요하오니, 설정한 비밀번호를 기억해주세요.
          </b>
        </div>

        <div className={styles.btn}>
          <div>
            <button
              type="submit"
              className={styles.sub}
              disabled={isSubmitting || !values.summary || !postPassword}
            >
              작성완료
            </button>
            <button className={styles.delete} onClick={onClick}>
              취소하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AsPost;
