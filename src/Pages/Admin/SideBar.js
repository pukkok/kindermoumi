import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import './styles/SideBar.css'
import { useSetRecoilState } from "recoil";
import { adminThemeAtom, moveLinkAtom } from "../../Recoil/AdminAtom";

function SideBar ({ sideOpen, setSideOpen, onMode, setOnMode }) {

    const setAdminTheme = useSetRecoilState(adminThemeAtom)
    const setMoveLink = useSetRecoilState(moveLinkAtom)
    const sendTabInfo = (e, title) => {
        if(!e.target.className){ // 이상한 곳 클릭
            return
        }
        setAdminTheme(title)
        setMoveLink(e.target.className)
        setSideOpen(false)
    }

    const tabList = [
        {className: 'main', text: '메인 페이지'},
    ]

    const changeType = () => {
        setOnMode(!onMode)
    }

    const [loadingZIndex, setLoadingZIndex] = useState({zIndex: 0})
    const closeSideBar = (e) => {
        if(e.target.className === 'admin-side'){
            setSideOpen(false)
        }
    }

    useEffect(()=>{
        let timer
        if(sideOpen){
            setLoadingZIndex({zIndex: 100})
        }else{
            timer = setTimeout(() => {
               setLoadingZIndex({zIndex: 0}) 
            }, 400);
        }
        return () => clearTimeout(timer)
    },[sideOpen])

    return (
        <section className="admin-side" style={loadingZIndex} onClick={closeSideBar}>

        <div className={classNames("side-bar", {on : sideOpen})}>
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
            
        </div>

        </section>
    )
}

export default SideBar