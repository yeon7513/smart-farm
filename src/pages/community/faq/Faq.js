import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import down from "../../../../src/assets/arrow/down.png";
import up from "../../../../src/assets/arrow/up.png";
import styles from "./Faq.module.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../../../api/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { setFaqData } from "../../../store/faq-data/faqDataSlice";
import { fetchOrder, setOrder } from "../../../store/order/orderSlice";

function Faq() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openId, setOpenId] = useState(null);
  const faqData = useSelector((state) => state.faqDataSlice || {});
  const { isAuthenticated } = useSelector((state) => state.userSlice);
  const { order } = useSelector((state) => state.orderSlice);

  const handleLoad = async (order) => {
    const queryOptions = {
      conditions: [], // 필요한 조건 추가
      orderBys: [{ field: order, direction: "desc" }],
    };
    dispatch(fetchOrder({ collectionName: "faq", queryOptions }));
  };

  useEffect(() => {
    handleLoad(order); // Load data when component mounts or order changes
  }, [order]);

  const toggleVisibility = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  // 조회수를 증가시키는 함수
  const incrementViews = async (id) => {
    const updatedData = faqData.map((item) =>
      item.id === id
        ? {
            ...item,
            views: (item.views || 0) + 1,
          }
        : item
    );

    // Firestore에 조회수를 업데이트합니다.
    const docRef = doc(db, "faq", id.toString());
    await updateDoc(docRef, {
      views: updatedData.find((item) => item.id === id).views,
    }).catch((error) => {
      console.error("문서 업데이트에 실패했습니다.: ", error);
    });

    dispatch(setFaqData(updatedData));
    localStorage.setItem("faqData", JSON.stringify(updatedData));
  };

  const toggleLike = async (id) => {
    if (!isAuthenticated) {
      youHaveToSignIn();
      return;
    }

    const updatedData = faqData.map((item) =>
      item.id === id
        ? {
            ...item,
            liked: !item.liked,
            likes: (item.likes || 0) + (item.liked ? -1 : 1),
          }
        : item
    );

    // Firestore에 좋아요 수를 업데이트합니다.
    const docRef = doc(db, "faq", id.toString());
    const userId = auth.currentUser?.uid;

    if (!userId) return;

    try {
      await updateDoc(docRef, {
        likes: updatedData.find((item) => item.id === id).likes,
      });

      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        [`liked.${id}`]: !faqData.find((item) => item.id === id).liked,
      });

      console.log("좋아요가 반영되었습니다.");
      dispatch(setFaqData(updatedData));
      localStorage.setItem("faqData", JSON.stringify(updatedData));
    } catch (error) {
      console.error("좋아요 반영 실패:", error);
    }
  };

  const youHaveToSignIn = () => {
    navigate("/login");
    console.log("로그인이 필요한 서비스입니다.");
  };

  const handleViewsClick = () => dispatch(setOrder("views"));

  const handleLikesClick = () => dispatch(setOrder("likes"));

  return (
    <div className={styles.page}>
      <div className={styles.faqIntro}>
        <div>
          <h1>FAQ</h1>
          <p>- 자주 묻는 질문을 확인해보세요 !</p>
        </div>
        <div>
          <button selected={order === "views"} onClick={handleViewsClick}>
            조회순
          </button>{" "}
          |{" "}
          <button selected={order === "likes"} onClick={handleLikesClick}>
            좋아요순
          </button>
        </div>
      </div>

      <Container className={styles.container}>
        {faqData.map(({ id, question, answer, likes, views, liked }) => (
          <div key={id} className={styles.faq}>
            <div className={styles.title}>
              <h3>{`Q. ${question}`}</h3>
              {openId === id ? (
                <button
                  onClick={() => {
                    incrementViews(id);
                    toggleVisibility(id);
                  }}
                >
                  <img src={up} alt="자세히 보기" />
                </button>
              ) : (
                <button onClick={() => toggleVisibility(id)}>
                  <img src={down} alt="간략히 보기" />
                </button>
              )}
            </div>
            {openId === id && (
              <div className={styles.description}>
                <h4>{`A. ${answer}`}</h4>
                <div className={styles.likes}>
                  {isAuthenticated ? (
                    <button onClick={() => toggleLike(id)}>
                      {liked ? (
                        <AiFillHeart
                          style={{ color: "red", fontSize: "30px" }}
                        />
                      ) : (
                        <AiOutlineHeart style={{ fontSize: "30px" }} />
                      )}
                      좋아요: {likes}
                    </button>
                  ) : (
                    <button onClick={youHaveToSignIn}>
                      <AiOutlineHeart style={{ fontSize: "30px" }} />
                      좋아요: {likes}
                    </button>
                  )}
                  <h5>조회수: {views}</h5>
                </div>
              </div>
            )}
          </div>
        ))}
      </Container>
    </div>
  );
}

export default Faq;
