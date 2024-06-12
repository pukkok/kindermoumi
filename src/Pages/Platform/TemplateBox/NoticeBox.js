import React from "react";
import ImgBox from "../../../Components/ImgBox";
import './styles/NoticeBoxType.css'

function NoticeBox1 ({noticeInfo}) {

    const dummyNotice = [
        {text: '2024학년도 출결관리안내 및 질병결석확인서', date: '2024.05.22'},
        {text: '2024 푹곡유치원 규칙 개정 안내 (2024.4.15.)', date: '2024.05.22'},
        {text: '2024년 주민참여예산제 안내', date: '2024.05.22' },
        {text: '2024년 주민참여예산제 안내', date: '2024.05.22' }
    ]

    return(
        <section className="notice-box">
            <div className="notice-title">
                <p>공지사항</p>
                <ImgBox src={`${origin}/platform/0007_btn_more02.png`}/>
            </div>
            <div className="notice-menu">
                {noticeInfo ? noticeInfo.map((item, idx) => {
                    return <p key={idx}>{item.text} <span>{item.date}</span></p>
                }):
                dummyNotice.map((item, idx) => {
                    return <p key={idx}>{item.text} <span>{item.date}</span></p>
                })
                }
            </div>
        </section>
    )
}

export { NoticeBox1 }