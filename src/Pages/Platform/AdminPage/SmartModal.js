import React, { useEffect, useRef, useState } from "react";
import './styles/SmartModal.css'
import classNames from "classnames";

import LogoEditor from './PageEditor/LogoEditor'
import NavigationEditor from './PageEditor/NavigationEditor'
import BackgroundEditor from './PageEditor/BackgroundEditor'
import ContentsEditor from './PageEditor/ContentsEditor'
import { useRecoilState } from "recoil";
import { SmartModalOpenAtom } from "../../../Recoil/AdminAtom";
import HeaderEditor from "./PageEditor/HeaderEditor";



function SmartModal ({ selectedTab, token }) {

    const [SmartModalOpen, setSmartModalOpen] = useRecoilState(SmartModalOpenAtom)

    const containerRef = useRef(null); // 드래그 할 영역 네모 박스 Ref
    const dragComponentRef = useRef(null); // // 움직일 드래그 박스 Ref
    const [originPos, setOriginPos] = useState({ x: 0, y: 0 }); // 드래그 전 포지션값 (e.target.offset의 상대 위치)
    const [clientPos, setClientPos] = useState({ x: 0, y: 0 }); // 실시간 커서위치인 e.client를 갱신하는값
    const [pos, setPos] = useState({ left: 400, top: 100 }); // 실제 drag할 요소가 위치하는 포지션값

    const closeModal = () => {
        setSmartModalOpen({...SmartModalOpen, isOpen: false})
    }
    
    const dragStartHandler = (e) => {

        let emptyImg = new Image();
        e.dataTransfer.setDragImage(emptyImg, 0, 0);
        // e.dataTransfer.effectAllowed = "move"; // 크롬의그린 +아이콘 제거

        const clientPosTemp = { ...clientPos };
        clientPosTemp["x"] = e.clientX;
        clientPosTemp["y"] = e.clientY;
        setClientPos(clientPosTemp);
    }

    const dragHandler = (e) => {
        const PosTemp = { ...pos };
        PosTemp["left"] = e.clientX;
        PosTemp["top"] = e.clientY;
        setPos(PosTemp);
    }
    
    const dragOverHandler = (e) => {
        e.preventDefault()
    }

    const dragEndHandler = (e) => {
        const PosTemp = { ...pos };
        PosTemp["left"] = e.clientX;
        PosTemp["top"] = e.clientY;
        setPos(PosTemp);
    }

    const [openOption, setOpenOption] = useState(false)
    const [active, setActive] = useState(0)
    const valueCheck = (e) => {
        if(!openOption){
            setOpenOption(true)
        }else{
            setActive(e.target.value)
            setOpenOption(false)
        }
    }

    

    return (
        <section className={classNames("smart-modal", {on : SmartModalOpen.isOpen})}
        ref={containerRef}>
            <div className="control-box" style={{ left: pos.left, top: pos.top }}>
                <div className="remote" ref={dragComponentRef}
                draggable
                onDragStart={(e) => dragStartHandler(e)}
                onDrag={(e) => dragHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}            
                >
                    {SmartModalOpen.selection === 'h' && 
                    <>
                        <p>상단 설정 <span className="material-symbols-outlined">arrow_forward_ios</span></p>
                        <div className="tab-box">
                            <ul className={classNames("tabs", {open: openOption})} onClick={valueCheck}>
                                <li className={classNames({active : active===0})} value={0}>선택</li>
                                <li className={classNames({active : active===1})} value={1}>로고</li>
                                <li className={classNames({active : active===2})} value={2}>네비게이션</li>
                            </ul>
                        </div>
                    </>}

                    {SmartModalOpen.selection === 'm' && 
                    <>
                        <p>컨텐츠 설정 <span className="material-symbols-outlined">arrow_forward_ios</span></p>
                        <div className="tab-box">
                            <ul className={classNames("tabs", {open: openOption})} onClick={valueCheck}>
                                <li className={classNames({active : active===0})} value={0}>선택</li>
                                <li className={classNames({active : active===1})} value={1}>컨텐츠 추가</li>
                                <li className={classNames({active : active===2})} value={2}>이미지 추가</li>
                            </ul>
                        </div>
                    </>}

                    {SmartModalOpen.selection === 'f' && 
                    <>
                        <p>하단 설정 <span className="material-symbols-outlined">arrow_forward_ios</span></p>
                        <div className="tab-box">
                            <ul className={classNames("tabs", {open: openOption})} onClick={valueCheck}>
                                <li className={classNames({active : active===0})} value={0}>선택</li>
                                <li className={classNames({active : active===1})} value={1}>로고</li>
                                <li className={classNames({active : active===2})} value={2}>네비게이션</li>
                            </ul>
                        </div>
                    </>}

                    <button onClick={closeModal}>닫기</button>
                </div>

                <div className="remote-option">
                {SmartModalOpen.selection === 'h' && 
                    <>
                        <HeaderEditor/>
                        {active === 1 && <LogoEditor token={token}/>}
                        {active === 2 && <NavigationEditor token={token}/>}
                    </>
                }
                {SmartModalOpen.selection === 'm' && 
                    <>
                        {/* <HeaderEditor/> */}
                        {active === 1 && <ContentsEditor token={token}/>}
                        {active === 2 && <BackgroundEditor token={token}/>}
                    </>
                }
                </div>
            </div>
        </section>
    )
}

export default SmartModal