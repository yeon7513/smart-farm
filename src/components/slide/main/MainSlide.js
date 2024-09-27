import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./MainSlide.scss";

function MainSlide() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/img/mainslide1.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/mainslide2.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/mainslide3.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default MainSlide;
