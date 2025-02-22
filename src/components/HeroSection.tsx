import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2000 }}
        pagination={{ clickable: true }}
        className="absolute top-0 left-0 w-full h-[70vh] -z-10"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://i.imghippo.com/files/Nh5963E.png')",
            }}
          ></div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://i.ytimg.com/vi/3JceH0t2rVA/hqdefault.jpg')",
            }}
          ></div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://i.imghippo.com/files/eFgX8767yhg.png')",
            }}
          ></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSection;
