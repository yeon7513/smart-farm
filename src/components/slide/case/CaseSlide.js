import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./CaseSlide.scss";

// import required modules
import { Pagination } from "swiper/modules";
import CaseItem from "./caseItem/CaseItem";

export default function App({ items }) {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <CaseItem
              img={item.img}
              why={item.why}
              name={item.name}
              content={item.content}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
