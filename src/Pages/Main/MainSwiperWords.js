import React from "react";
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css'
import { Autoplay } from "swiper/modules";
import SwiperCore from 'swiper';

import 'swiper/swiper-bundle.css';
import 'swiper/css/autoplay'; 

// SwiperCore에 Autoplay 모듈 추가
SwiperCore.use([Autoplay]);


function MainSwiper () {
    return(
        <Swiper
        loop={true}
        centeredSlides={true}
        autoHeight={true}
        direction="vertical"
        autoplay={
            {
                delay: 2000,
                disableOnInteraction:false
            }
        }
        observer={true}
        observeParents={true}
        spaceBetween={20}
        slidesPerView={1}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper, '스와이프')}
        >
            <SwiperSlide><strong className="type-a">관리</strong></SwiperSlide>
            <SwiperSlide><strong className="type-b">이용</strong></SwiperSlide>
            <SwiperSlide><strong className="type-c">업무</strong></SwiperSlide>
        </Swiper>
    )
}

export default MainSwiper