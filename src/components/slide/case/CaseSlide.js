import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./CaseSlide.scss";

// import required modules
import CaseItem from "./caseItem/CaseItem";
import { Autoplay, FreeMode, Scrollbar } from "swiper/modules";

export default function App({ items }) {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        scrollbar={{
          hide: false,
        }}
        breakpoints={{
          276: {
            slidesPerView: 1,
          },
          676: {
            slidesPerView: 3,
          },
        }}
        modules={[Autoplay, FreeMode, Scrollbar]}
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
