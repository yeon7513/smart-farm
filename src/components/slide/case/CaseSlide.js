import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

import "./CaseSlide.scss";

// import required modules
import { Scrollbar } from "swiper/modules";
import CaseItem from "./caseItem/CaseItem";

export default function App({ items }) {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
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
