import React, { useState } from "react";
import './styles/EditorPage.css'
import { SmartModalOpenAtom } from "../../../Recoil/AdminAtom";
import { useRecoilState } from "recoil";
import classNames from "classnames";

function EditorPage () {

    const [SmartModalOpen, setSmartModalOpen] = useRecoilState(SmartModalOpenAtom)
    const [active, setActive] = useState()

    const activeSelector = (e) => {
        setActive(e.target.parentElement.id)
    }
    
    const openSmartModal = () => {
        setSmartModalOpen(true)
    }


    return (
        <section className="page-edit" onClick={activeSelector}>
            {/* <button onClick={buildPageStarter}>작업 시작하기</button> */}
            <header id="h" className={classNames({active : active === 'h'})}>
                상단 영역
                <button className="add-btn" onClick={openSmartModal}>추가</button>
            </header>
            <main id="m" className={classNames({active : active === 'm'})}>
                컨텐츠 영역
                <button className="add-btn" onClick={openSmartModal}>추가</button>
            </main>
            <footer id="f" className={classNames({active : active === 'f'})}>
                하단 영역
                <button className="add-btn" onClick={openSmartModal}>추가</button>
            </footer>
        </section>
    )
}

export default EditorPage