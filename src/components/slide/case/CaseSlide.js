import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

import "./CaseSlide.scss";

// import required modules
import CaseItem from "./caseItem/CaseItem";

export default function App({ items }) {
  return (
    <>
      <Swiper slidesPerView={3} spaceBetween={30} navigation={true}>
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
