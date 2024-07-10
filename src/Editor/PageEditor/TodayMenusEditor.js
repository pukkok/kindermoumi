import React from "react";
import ImgBox from "../../Components/ImgBox";

function TodayMenusEditor () {

    return(
        <section className="todaymenu-edit">
            <div className="summary">
                <h2>오늘의 식단</h2>
                <p>식단표 양식을 선택하여 넣을수 있습니다.</p>
                <span>*식단 등록과 알레르기정보를 입력할 수 있습니다.</span>
            </div>
            <div className="remote-btns">
                <p>타입</p><span></span>
                <button >저장</button>
                <button >초기화</button>
            </div>
            <div className="select-type mb">
                <div className="type-box">
                    <h1>타입 1 <button>선택</button></h1>
                    <ImgBox src={`${origin}/platform/todayMenu-type1.png`}/>
                </div>

            </div>
        </section>
    )
}

export default TodayMenusEditor