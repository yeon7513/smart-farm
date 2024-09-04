import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import down from "../../../../src/assets/arrow/down.png";
import up from "../../../../src/assets/arrow/up.png";
import styles from "./Faq.module.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../../../api/firebase";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function Faq() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [openId, setOpenId] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.userSlice);

  useEffect(() => {
      fetchFaqData();
  }, [isAuthenticated]);
    

  const fetchFaqData = async () => {
    try {
      const cachedData = localStorage.getItem("faqData");
      if (cachedData) {
        setFaqData(JSON.parse(cachedData));
        console.log("캐시된 FAQ 데이터가 로드되었습니다.");
      } else {
        const faqCollectionRef = collection(db, "faq");
        const faqSnapshot = await getDocs(faqCollectionRef);
        const faqList = faqSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));


        // Firestore에서 사용자의 좋아요 상태를 가져와서 데이터에 추가합니다.
        if (isAuthenticated) {
          const userId = auth.currentUser?.uid;
          if (userId) {
            const userRef = doc(db, "users", userId);
            const userDoc = await getDoc(userRef);
            const userLikes = userDoc.data()?.liked || {};
  
            const updatedFaqList = faqList.map(faq => ({
              ...faq,
              liked: !!userLikes[faq.id],
            }));
  
            setFaqData(updatedFaqList);
            localStorage.setItem("faqData", JSON.stringify(updatedFaqList));
          } else {
            setFaqData(faqList);
            localStorage.setItem("faqData", JSON.stringify(faqList));
          }
        } else {
          setFaqData(faqList);
          localStorage.setItem("faqData", JSON.stringify(faqList));
        }
        
        console.log("FAQ 데이터가 Firestore에서 성공적으로 로드되었습니다.");
      }
    } catch (error) {
      console.error("FAQ 데이터 로드 중 오류 발생:", error);
    }
  };

  const toggleVisibility = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  // 조회수를 증가시키는 함수
  const incrementViews = async (id) => {
    setFaqData((prevData) => {
      const updatedData = prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              views: item.views + 1,
            }
          : item
      );

      // Firestore에 조회수를 업데이트합니다.
      const docRef = doc(db, "faq", id.toString());
      updateDoc(docRef, {
        views: updatedData.find((item) => item.id === id).views,
      })
        .then(() => {
          console.log("값이 성공적으로 반영되었습니다.");
        })
        .catch((error) => {
          console.error("문서 업데이트에 실패했습니다.: ", error);
        });

      return updatedData;
    });
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
            likes: item.liked ? item.likes - 1 : item.likes + 1,
          }
        : item
    );

    // Firestore에 좋아요 수를 업데이트합니다.
    const docRef = doc(db, "faq", id.toString());
    const userId = auth.currentUser?.uid;

if(!userId) return;

try {
  await updateDoc(docRef, { likes: updatedData.find(item => item.id === id).likes });

  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { [`liked.${id}`]: !faqData.find(item => item.id === id).liked });

  console.log("좋아요가 반영되었습니다.");
  setFaqData(updatedData);
} catch (error) {
  console.error("좋아요 반영 실패:", error);
}
};

  const youHaveToSignIn = () => {
    navigate("/login");
    console.log("로그인이 필요한 서비스입니다.");
  };

  return (
    <div className={styles.page}>
      <h1>FAQ</h1>
      <p>- 자주 묻는 질문을 확인해보세요 !</p>

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
                    <button>
                      <AiOutlineHeart
                        style={{ fontSize: "30px" }}
                        onClick={youHaveToSignIn}
                      />
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
