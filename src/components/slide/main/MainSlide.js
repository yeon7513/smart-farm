import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './MainSlide.scss';

function MainSlide() {
  return (
    <>
      {/* <Swiper
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
          <img src="/img/smartfarm2.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/content4.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/smartfarm4.jpg" alt="" />
        </SwiperSlide>
      </Swiper> */}

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
