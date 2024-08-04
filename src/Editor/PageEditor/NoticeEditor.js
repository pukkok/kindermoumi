import React from "react";
import ImgBox from "../../Components/ImgBox";

function NoticeEditor () {
    return(
        <section className="notice-edit">
            <div className="summary">
                <h2>공지사항</h2>
                <p>공지사항, 가정통신문 등을 보여주는 컨텐츠입니다.</p>
                <span>*공지사항 탭에서 컨텐츠 등록이 가능합니다.</span>
            </div>
            <div className="remote-btns">
                <p>타입</p><span></span>
                <button >저장</button>
                <button >초기화</button>
            </div>
            <div className="select-type">
                <div className="type-box">
                    <h1>타입 1 <button>선택</button></h1>
                    <ImgBox src={`${origin}/platform/notice-type1.png`}/>
                </div>
            </div>
        </section>
    )
}

export default NoticeEditor