import React, { useState } from "react";
import './styles/EditorPage.css'
import { LogoAtom, LogoSizeAtom, SmartModalOpenAtom, mainMenuAtom, subMenuAtom } from "../../../Recoil/AdminAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import classNames from "classnames";
import {Link} from 'react-router-dom';
import Container from "../../../Components/Container";

function EditorPage () {

    const [SmartModalOpen, setSmartModalOpen] = useRecoilState(SmartModalOpenAtom)

    const logo = useRecoilValue(LogoAtom)
    const logoSize = useRecoilValue(LogoSizeAtom)
    const mainMenu = useRecoilValue(mainMenuAtom)
    const subMenu = useRecoilValue(subMenuAtom)

    const activeSelector = (e) => {

    }
    
    const openSmartModal = (e) => {
        setSmartModalOpen({isOpen: true, selection: e.target.parentElement.id})
    }

    return (
        <section className="page-edit kinder-page" onClick={activeSelector}>
            <header id="h" className={classNames({active : SmartModalOpen.selection === 'h'})}>
                <Container>
                <div className="nav-bar">
                    {logo && 
                    <div className="logo" style={{width : logoSize.width+'px', height: logoSize.height+'px'}}>
                        <Link to={`/kinder/`}>
                            <img src={`${logo}`}/>
                        </Link>
                    </div>}
                    {mainMenu && <nav className="navigation">
                    <ul className="depth1">
                    {mainMenu.map((mainData, mainIdx)=>{
                        return (
                            <li key={mainIdx}><Link>{mainData.mainName}</Link>
                                {subMenu &&  
                                    subMenu[mainIdx] && 
                                    <ul className="depth2">    
                                    {subMenu[mainIdx].map((data, subIdx) => {
                                        return <li key={subIdx}><Link to={`${mainData.mainPath}/${data.subPath}`}>{data.subName}</Link></li>
                                    })}
                                    </ul>
                                }
                            </li>
                        )
                    })}
                    </ul>
                    </nav>}
                </div>
                </Container>
                <button className="add-btn" onClick={openSmartModal}>설정</button>
            </header>
            <main id="m" className={classNames({active : SmartModalOpen.selection === 'm'})}>
                컨텐츠 영역
                <button className="add-btn" onClick={openSmartModal}>설정</button>
            </main>
            <footer id="f" className={classNames({active : SmartModalOpen.selection === 'f'})}>
                하단 영역
                <button className="add-btn" onClick={openSmartModal}>설정</button>
            </footer>
        </section>
    )
}

export default EditorPage