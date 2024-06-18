import classNames from "classnames";
import React, { useState } from "react";
import './styles/SideBar.css'

function SideBar ({ sideOpen, setSideOpen, setTheme, onMode, setOnMode }) {

    const sendTabInfo = (e, title) => {

        if(!e.target.className){ // 이상한 곳 클릭
            return
        }
        setTheme(title)
    }

    const tabList = [
        {className: 'logo', text: '메인 페이지'},
        {className: 'navigation', text: '네비게이션'},
        {className: 'bg', text: '배경'},
        {className: 'container', text: '컨테이너'},
        {className: 'content', text: '컨텐츠'}
    ]

    const changeType = () => {
        setOnMode(!onMode)
    }


    return (
        <section className={classNames("side-bar", {on : sideOpen})}>
            <div className="title">
                <h1>관리자 페이지 <button onClick={()=>setSideOpen(false)}>닫기</button></h1>
            </div>
            <div className="page-management ctrl">
                <h3 className="switch-box">페이지 관리
                <button onClick={changeType} className="switch-btn">{<span className={classNames({green : onMode})}></span>}</button>
                </h3>
                <ul onClick={(e)=>sendTabInfo(e, 'page')}>
                    {tabList.map((list, idx) =>{
                        return (
                            <React.Fragment key={idx}>
                                <li className={list.className}>{list.text}</li>
                            </React.Fragment>
                        )
                    })}
                </ul>
                <h3>교사 관리</h3>
                <ul onClick={(e)=>sendTabInfo(e, 'teacher')}>
                    <li>교사 인적사항</li>
                </ul>
                <h3>원아 관리</h3>
                <ul onClick={(e)=>sendTabInfo(e, 'child')}>
                    <li>원아 기록부</li>
                </ul>
                <h3>식단 관리</h3>
                <ul onClick={(e)=>sendTabInfo(e, 'menus')}>
                    <li className="menu-table">식단표</li>
                    <li className="allergy">알레르기</li>
                </ul>
            </div>
            
        </section>
    )
}

export default SideBar