import React from "react"
import './styles/TodayMenuBoxType.css'
import ImgBox from '../../Components/ImgBox'

const TodayMenuBox1 = () => {
    return (
        <section className="today-menu-box">
            <div className="today-title">
                <p className="line"></p>
                <span>오늘의 식단</span>
                <ImgBox src={`${origin}/platform/0007_btn_more02.png`}/>
            </div>
            <div className="today-menu">
                <p>금일 식단이 없습니다.</p>
                <ImgBox src={`${origin}/platform/0007_img_meal.png`}></ImgBox>
            </div>
        </section>
    )
}

export { TodayMenuBox1 }