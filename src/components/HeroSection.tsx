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
              backgroundImage: "url('https://www.getrael.com/cdn/shop/articles/December_Blog_Banners_Benefits_of_Organic_Skin_Care_Products.png?v=1641404707)",
            }}
          ></div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://www.globalrepublic.in/cdn/shop/articles/banner_1.jpg?v=1702639809&width=1500')",
            }}
          ></div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://assets-static.invideo.io/images/origin/Creative_Clothing_Advertisement_Ideas_To_Boost_Sales_revised_3_1_cefa9cda88.png')",
            }}
          ></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSection;
