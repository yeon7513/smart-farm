import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import down from "../../../../src/assets/arrow/down.png";
import up from "../../../../src/assets/arrow/up.png";
import styles from "./Faq.module.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../../../api/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { setFaqData } from "../../../store/faq-data/faqDataSlice";

function Faq() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openId, setOpenId] = useState(null);
  const [sortOrder, setSortOrder] = useState("views");
  const faqData = useSelector((state) => state.faqDataSlice);
  const { isAuthenticated } = useSelector((state) => state.userSlice);

  const fetchfaqData = async ({ collectionName, orderByField }) => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, orderBy(orderByField));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchfaqData({
          collectionName: "faq",
          orderByField: sortOrder,
        });

        if (!Array.isArray(fetchedData)) {
          throw new Error("Fetched data is not an array");
        }

        if (isAuthenticated) {
          const userRef = doc(db, "users", auth.currentUser?.uid);
          const userDoc = await getDoc(userRef);
          const userLikes = userDoc.data()?.liked || {};

          const updatedData = fetchedData.map((item) => ({
            ...item,
            liked: userLikes[item.id] || false,
          }));

          dispatch(setFaqData(updatedData));
        } else {
          dispatch(setFaqData(fetchedData));
        }
      } catch (error) {
        console.error("FAQ 데이터 로드 오류:", error);
      }
    };

    fetchData();
  }, [sortOrder, isAuthenticated, dispatch, auth.currentUser?.uid]);

  const sortedFaqData = Array.isArray(faqData)
    ? [...faqData].sort((a, b) => {
        if (sortOrder === "views") {
          return b.views - a.views;
        } else if (sortOrder === "likes") {
          return b.likes - a.likes;
        }
        return 0;
      })
    : [];

  // 화살표를 누르면 게시글이 보이고 다시 화살표를 누르면 게시글이 보이지 않습니다.
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
  };

  // 좋아요 기능을 활성화 및 비활성화 하는 함수입니다.
  const toggleLike = async (id) => {
    if (!isAuthenticated) {
      navigate("/login");
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

    await updateDoc(docRef, {
      likes: updatedData.find((item) => item.id === id).likes,
    });

    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      [`liked.${id}`]: !faqData.find((item) => item.id === id).liked,
    });

    dispatch(setFaqData(updatedData));
  };

  const handleViewsClick = () => {
    setSortOrder("views");
  };

  const handleLikesClick = () => {
    setSortOrder("likes");
  };

  return (
    <div className={styles.page}>
      <div className={styles.faqIntro}>
        <div>
          <h1>FAQ</h1>
          <p>- 자주 묻는 질문을 확인해보세요 !</p>
        </div>
        <div>
          <button selected={sortOrder === "views"} onClick={handleViewsClick}>
            조회순
          </button>{" "}
          |{" "}
          <button selected={sortOrder === "likes"} onClick={handleLikesClick}>
            좋아요순
          </button>
        </div>
      </div>

      <Container className={styles.container}>
        {sortedFaqData.map(({ id, question, answer, likes, views, liked }) => (
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
                    <button onClick={() => toggleLike(id)}>
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
