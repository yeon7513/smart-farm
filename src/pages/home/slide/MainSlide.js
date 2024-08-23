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
          <img src="/smartfarm2.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/content4.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/smartfarm4.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default MainSlide;
