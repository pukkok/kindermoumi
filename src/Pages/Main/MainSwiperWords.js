import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css'

function MainSwiper () {
    return(
        <Swiper
        loop={true}
        centeredSlides={true}
        direction="vertical"
        autoplay={
            {
                delay: 1000,
                disableOnInteraction: false
            }
        }
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}>

            <SwiperSlide><strong>관리</strong></SwiperSlide>
            <SwiperSlide><strong>이용</strong></SwiperSlide>
            <SwiperSlide><strong>업무</strong></SwiperSlide>
        </Swiper>
    )
}

export default MainSwiper