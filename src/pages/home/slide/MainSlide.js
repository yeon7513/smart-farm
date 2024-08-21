import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./MainSlide.scss";

function MainSlide() {
  //   const slideImg = [
  //     {
  //       img: "../../../assets/main/house.jpg",
  //     },
  //     {
  //       img: "../../../assets/main/content4.jpg",
  //     },
  //     {
  //       img: "../../../assets/main/strawberry.jpg",
  //     },
  //   ];

  //   const [current, setCurrent] = useState(0);

  //   const nextSlide = () => {
  //     setCurrent(current === slideImg.length - 1 ? 0 : current + 1);
  //   };

  //   const prevSlide = () => {
  //     setCurrent(current === 0 ? slideImg.length - 1 : current - 1);
  //   };

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/smartfarm2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/content4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/smartfarm4.jpg" />
        </SwiperSlide>
      </Swiper>
    </>

    // <div className={styles.container}>
    //   <div className={styles.img_container}>
    //     <button onClick={prevSlide}>
    //       <IoIosArrowBack />
    //     </button>
    //     <div className={styles.img_box}>
    //       <img src={slideImg[current].img} />
    //     </div>
    //     <button onClick={nextSlide}>
    //       <IoIosArrowForward />
    //     </button>
    //   </div>
    //   <div className={styles.circle_box}></div>
    // </div>
  );
}

export default MainSlide;
