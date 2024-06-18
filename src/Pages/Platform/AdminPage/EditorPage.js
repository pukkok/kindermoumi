import React, { useState, useEffect } from "react";
import './styles/EditorPage.css'
import { HeaderAtom, LogoAtom, LogoSizeAtom, SmartModalOpenAtom, bgAtom, containerSizeAtom, gridZoneAtom, mainMenuAtom, subMenuAtom, xyCountAtom, HeaderFlexAtom } from "../../../Recoil/AdminAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import classNames from "classnames";
import {Link} from 'react-router-dom';
import Container from "../../../Components/Container";
import ImgBox from "../../../Components/ImgBox";

function EditorPage ({onMode}) {

    const [SmartModalOpen, setSmartModalOpen] = useRecoilState(SmartModalOpenAtom)
    const headerHeight = useRecoilValue(HeaderAtom)
    const containerSize = useRecoilValue(containerSizeAtom)
    const xyCount = useRecoilValue(xyCountAtom)
    const gridZone = useRecoilValue(gridZoneAtom)
    const bg = useRecoilValue(bgAtom)
    const logo = useRecoilValue(LogoAtom)
    const logoSize = useRecoilValue(LogoSizeAtom)
    const mainMenu = useRecoilValue(mainMenuAtom)
    const subMenu = useRecoilValue(subMenuAtom)

    const activeSelector = (e) => {

    }
    
    const openSmartModal = (e) => {
        setSmartModalOpen({isOpen: true, selection: e.target.parentElement.id})
    }

    const [count, setCount] = useState(0) // 컨텐츠 그리드 개수
    useEffect(()=>{
        let {row, col} = xyCount
        if(row==='' && col===''){
            return setCount(0)
        }
        if(row){
            if(col){
               return setCount(row * col)
            }else{
                return setCount(row * 1)
            }
        }

        if(col){
            if(row){
                setCount(row * col)
            }else{
                setCount(col * 1)
            }
        }
    },[xyCount])

    const contentsGrid = {
        gridTemplateColumns: xyCount.col ? `repeat(${xyCount.col}, 1fr)` : '1fr',
        gridTemplateRows: xyCount.row ? `repeat(${xyCount.row}, 1fr)` : '1fr'
    }

    const pageGrid = {
        gridTemplateRows: `${headerHeight > 60 ? headerHeight : 60}px 1fr 200px` 
    }


    const [headerFlex, setHeaderFlex] = useRecoilState(HeaderFlexAtom)

    console.log(headerFlex)

    const flexStyle = {
        justifyContent : headerFlex ? headerFlex : 'flex-start'
    }


    return (
        <section className="page-edit kinder-page" onClick={activeSelector} style={pageGrid}>
            <header id="h" className={classNames({active : SmartModalOpen.selection === 'h'})}>
                <Container>
                <div className="nav-bar" >
                    {logo && 
                    <div className="logo" style={{width : logoSize.width+'px', height: logoSize.height+'px'}}>
                        <Link to={`/kinder/`}>
                            <img src={`${logo}`}/>
                        </Link>
                    </div>}
                    {mainMenu && <nav className="navigation" >
                    <ul className="depth1" style={flexStyle}>
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
                    {!logo && !mainMenu && '상단 영역'}
                </div>
                </Container>
                {onMode && <button className="add-btn" onClick={openSmartModal}>설정</button>}
            </header>
            <main id="m" className={classNames({active : SmartModalOpen.selection === 'm'})}>
                {bg && <ImgBox addClass={'bg-img'} src={bg}/>}
                
                <div className={classNames("content", "default-option")}>
                    {count && xyCount &&
                    <Container width={containerSize.unit === 'px' && containerSize.width} perWidth={containerSize.unit === '%' && containerSize.width}>
                        <div className="content-box" style={contentsGrid}>
                        {Array(count).fill(0).map((_,idx)=>{
                            return <div className="grid-line" key={idx}>
                                {gridZone && 
                                gridZone['zone'+(idx+1)] === 'eventDate' && 
                                gridZone['eventDate'] === 1 ? <ImgBox addClass={'grid-img-box'} src={`${origin}/platform/event-date-type1.png`}/> :
                                gridZone['zone'+(idx+1)] === 'eventDate' && 
                                gridZone['eventDate'] === 2 ? <ImgBox addClass={'grid-img-box'} src={`${origin}/platform/event-date-type2.png`}/> : 

                                gridZone['zone'+(idx+1)] === 'photoBox' &&
                                gridZone['photoBox'] === 1 ? <ImgBox addClass={'grid-img-box'} src={`${origin}/platform/photobox-type1.png`}/> :

                                gridZone['zone'+(idx+1)] === 'notice' &&
                                gridZone['notice'] === 1 ? <ImgBox addClass={'grid-img-box'} src={`${origin}/platform/notice-type1.png`}/> :

                                gridZone['zone'+(idx+1)] === 'todayMenu' &&
                                gridZone['todayMenu'] === 1 ? <ImgBox addClass={'grid-img-box'} src={`${origin}/platform/todayMenu-type1.png`}/> 

                                : `구역${idx+1}`}
                                </div>
                        })}
                        </div>
                    </Container>}
                </div>

                {!bg && '컨텐츠 영역'}
                {onMode && <button className="add-btn" onClick={openSmartModal}>설정</button>}
            </main>
            <footer id="f" className={classNames({active : SmartModalOpen.selection === 'f'})}>
                하단 영역
                {onMode && <button className="add-btn" onClick={openSmartModal}>설정</button>}
            </footer>
        </section>
    )
}

export default EditorPage