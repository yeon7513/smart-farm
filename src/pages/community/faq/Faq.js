import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import down from "../../../../src/assets/arrow/down.png";
import up from "../../../../src/assets/arrow/up.png";
import styles from "./Faq.module.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../../api/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { setFaqData } from "../../../store/faq-data/faqDataSlice";
import FaqModify from "./FaqModify";
import FaqAdd from "./FaqAdd";

function Faq() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openId, setOpenId] = useState(null);
  const [sortOrder, setSortOrder] = useState("views");
  const faqData = useSelector((state) => state.faqDataSlice);
  const { isAuthenticated } = useSelector((state) => state.userSlice);
  const [isWriting, setIsWriting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [faqIdToEdit, setFaqIdToEdit] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

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
  }, [sortOrder, isAuthenticated, dispatch, auth.currentUser?.uid, faqData]);

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

  const handleSortClick = (sortName) => {
    setSortOrder(sortName);
    navigate("/community");
  };

  // 수정, 삭제 권한 여부(관리자 로그인)를 파악하기 위한 관리자의 uid를 가져옵니다.
  const adminUid = "SHGFkaurCeNMoBaeBMcKvc6XrX03";

  // 작성한 FAQ를 저장하는 함수입니다.
  const handleAdd = async () => {
    if (question.trim() && answer.trim()) {
      try {
        const newFaq = {
          question,
          answer,
          likes: 0,
          views: 0,
          liked: false,
        };

        // Firebase에 새로운 FAQ를 추가합니다.
        const docRef = await addDoc(collection(db, "faq"), newFaq);
        dispatch(setFaqData([...faqData, { id: docRef.id, ...newFaq }]));

        // 입력 필드 초기화
        setQuestion("");
        setAnswer("");
        setIsWriting(false);
      } catch (error) {
        console.error("FAQ 추가 중 오류가 발생했습니다. ", error);
      }
    }
  };

  // FAQ를 삭제하는 함수입니다.
  async function handleDelete(collectionName, id) {
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirmed) {
      return;
    }
    try {
      const faqRef = doc(db, collectionName, id.toString());
      await deleteDoc(faqRef);
      dispatch(setFaqData(faqData.filter((item) => item.id !== id)));
      console.log(`FAQ ${id} 삭제 성공`);
      return true;
    } catch (error) {
      console.error("FAQ 삭제 중 오류 발생: ", error);
      return false;
    }
  }

  // FAQ를 수정하는 페이지로 이동합니다.
  const handleEditClick = (id) => {
    setFaqIdToEdit(id);
    setIsEditing(true);
  };

  const getFaqById = async (collection, docId) => {
    try {
      // Firestore에서 특정 문서 참조를 생성
      const docRef = doc(db, collection, docId);

      // 문서 데이터를 가져오기
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // 문서가 존재할 경우 데이터를 반환합니다.
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching FAQ: ", error);
      throw error;
    }
  };

  // 수정한 FAQ를 적용하는 함수입니다.
  const handleFaqUpdate = async (id) => {
    try {
      const updateFaq = await getFaqById("faq", id);
      dispatch(
        setFaqData(faqData.map((item) => (item.id === id ? updateFaq : item)))
      );
      setIsEditing(false);
    } catch (error) {
      console.error("FAQ 업데이트 중 오류 발생: ", error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.faqIntro}>
        <div>
          <h1>FAQ</h1>
          <p>- 자주 묻는 질문을 확인해보세요 !</p>
        </div>
        <button
          className={
            auth.currentUser?.uid === adminUid ? styles.abled : styles.disabled
          }
          onClick={() => setIsWriting(true)}
        >
          FAQ 추가하기
        </button>
        <div>
          <button
            onClick={() => handleSortClick("views")}
            className={sortOrder === "views" ? styles.active : ""}
          >
            조회순
          </button>{" "}
          |{" "}
          <button
            onClick={() => handleSortClick("likes")}
            className={sortOrder === "likes" ? styles.active : ""}
          >
            좋아요순
          </button>
        </div>
      </div>

      <Container className={styles.container}>
        {isEditing ? (
          <FaqModify
            setIsEditing={setIsEditing}
            onFaqUpdate={handleFaqUpdate}
            faqId={faqIdToEdit}
          />
        ) : isWriting ? (
          <FaqAdd setIsWriting={setIsWriting} onFaqAdd={handleAdd} />
        ) : (
          <>
            {sortedFaqData.map(
              ({ id, question, answer, likes, views, liked }) => (
                <div key={id} className={styles.faq}>
                  <div className={styles.title}>
                    <h3>{`Q. ${question}`}</h3>
                    <div className={styles.editButtons}>
                      <Link to={`/community/faq/${id}`}>
                        <button
                          onClick={() => handleEditClick(id)}
                          className={
                            auth.currentUser?.uid === adminUid
                              ? styles.abled
                              : styles.disabled
                          }
                        >
                          수정
                        </button>
                      </Link>
                      <button
                        className={
                          auth.currentUser?.uid === adminUid
                            ? styles.abled
                            : styles.disabled
                        }
                        onClick={() => handleDelete("faq", id)}
                      >
                        삭제
                      </button>
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
              )
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default Faq;
