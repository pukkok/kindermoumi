import React, { useEffect, useRef, useState } from "react";
import './styles/SmartModal.css'
import classNames from "classnames";

import LogoEditor from './PageEditor/LogoEditor'
import BackgroundEditor from './PageEditor/BackgroundEditor'
import { useRecoilState } from "recoil";
import { SmartModalOpenAtom } from "../../../Recoil/AdminAtom";


function SmartModal ({ selectedTab }) {
    console.log(selectedTab)
    const [SmartModalOpen, setSmartModalOpen] = useRecoilState(SmartModalOpenAtom)

    const [{left, top}, setCoord] = useState({left:0, top:0})
    const boxRef = useRef()
    const prevRef = useRef({left, top})

    useEffect(()=>{
        if(selectedTab){
            setSmartModalOpen(true)
        }
    },[selectedTab])

    const closeModal = () => {
        setSmartModalOpen(!SmartModalOpen)
    }

    const dragStarter = (e) => {
        prevRef.current.left = e.pageX
        prevRef.current.top = e.pageY
    }

    const dragEnder = (e) => {
        let left
        let Top
        const boxWidth = boxRef.current.offsetWidth
        const boxHeight = boxRef.current.offsetHeight
        const prevLeft = prevRef.current.left
        const prevTop = prevRef.current.top

        if(prevLeft < e.pageX){
            left = e.pageX
        }else{
            left = prevLeft - e.pageX
        }

        setCoord({left : e.clientX, top : e.clientY})
    }

    return (
        <section className={classNames("smart-modal", {on : SmartModalOpen})} 
        style={{top : top + 'px', left : left + 'px'}} ref={boxRef}
        onDragStart={dragStarter}
        onDragEnd={dragEnder}
        draggable>
            <div>컨트롤러 <button onClick={closeModal}>닫기</button></div>
            <div> 요소 선택
                이미지, 선, 박스, 텍스트, 리스트, 컨텐츠 선택
            </div>
            {selectedTab === 'logo' && <LogoEditor/>}
            {selectedTab === 'bg' && <BackgroundEditor/>}
        </section>
    )
}

export default SmartModal