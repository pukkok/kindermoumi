import React, { useEffect, useRef, useState } from "react";
import './styles/Preview.css'
import ImgBox from "../../../Components/ImgBox";
import Container from '../../../Components/Container'

import classNames from "classnames";

function Preview ({ active='', logo, mainMenu, bg, hideContainer, containerSize, previewSize, xyCount, gridZone }) {

    const [gridSize, setgridSize] = useState()
    // 윈도우 최대 넓이 : preview 넓이 = 전체 컨테이너 사이즈 : preview 컨테이너 사이즈
    // window.innerWidth : previewSize = containerSize : x

    useEffect(()=>{
        if(containerSize.unit === 'px'){
            let x = Math.floor(previewSize * containerSize.width / window.innerWidth) - 20 // padding 20
            return setgridSize(x)
        }
        if(containerSize.unit === '%'){
            return setgridSize(containerSize.width)
        }

    },[containerSize.width, previewSize])
    console.log(containerSize.unit)
    console.log(gridSize)

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

    const userGrid = {
        gridTemplateColumns: xyCount.col ? `repeat(${xyCount.col}, ${(gridSize / xyCount.col) + containerSize.unit})` : '1fr',
        gridTemplateRows: xyCount.row ? `repeat(${xyCount.row}, 1fr)` : '1fr'
    }

    return(
        <section className={"preview-page"} style={{}}>
            <div className={classNames("container-grid-viewer", 
            {active : active === 'container'},
            {hide: hideContainer}
            )} 
            style={{width : containerSize.unit === 'px' ? gridSize+'px' : containerSize.unit === '%' ? gridSize+'%' : ''}}
            >
            </div>
            <div className={classNames("nav", "default-option", {active : active === 'logo' || active === 'navigation'})}>
            <Container width={containerSize.unit === 'px' && gridSize} perWidth={containerSize.unit === '%' && gridSize}>
                <div className={"nav-bar"}>
                    <button className={classNames('logo', {active : active === 'logo'}, {clear: logo && logo !== 'notFound'})}>
                        {logo && logo !=='notFound' ? <ImgBox src={logo}/> : '로고'}
                    </button>
                    <ul>

                    </ul>
                    
                    <button className={classNames("navigation", {active : active === 'navigation'})}>
                    {mainMenu.length>0 && mainMenu[0].mainName ? 
                    <ul>
                    {mainMenu.map((menu, idx)=> {
                        return <li key={idx}>{menu.mainName}</li>
                    })} 
                    </ul> :
                    '네비게이션 바'}
                    </button>
                </div>
            </Container>
            </div>

            <div className={classNames("bg", 'default-option', {active : active === 'bg'})}>
                <button className={classNames('bg-preview', {clear : bg && bg !== 'notFound'})}>
                    {bg && bg !== 'notFound' ? <ImgBox src={bg}/> : '배경업로드' }
                </button>
            </div>

            <div className={classNames("content", "default-option", {active : active === 'content'})}>
            {count && xyCount ? 
            <Container width={containerSize.unit === 'px' && gridSize} perWidth={containerSize.unit === '%' && gridSize}>
                <div className="content-box" style={userGrid}>
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
            </Container>:
            <div className="content-box">
                <button>컨텐츠</button>
            </div>
            }
            </div>
        </section>
    )       
            
}

export default Preview