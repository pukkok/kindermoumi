import React, { useEffect, useRef, useState } from "react";
import './styles/PlatformPage.css'
import { Link, Outlet, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import ImgBox from "../../Components/ImgBox";
import NotFoundPage from "../NotFoundPage";
import Container from "../../Components/Container";
import { EventDateBox1, EventDateBox2 } from "./TemplateBox/EventDateBox";
import { PhotoBox1 } from "./TemplateBox/PhotoBox";
import { TodayMenuBox1 } from "./TemplateBox/TodayMenuBox";
import { NoticeBox1 } from "./TemplateBox/NoticeBox";

function PlatformPage () {

    const { kinderUrl } = useParams()
    const [loadData, setLoadData] = useState()

    useEffect(()=>{ // 로드된 데이터가 있는지 체크
        const getPageData = async () => {
            const {data} = await axios.get(`user/kinderData/${kinderUrl}`)
            if(data.code !== 200){
                return alert(data.msg)
            }
            setLoadData(data.result)
        }
        getPageData()
    },[])

    const contentGrid = loadData && loadData.data.gridMatrix && {
        gridTemplateColumns: loadData.data.gridMatrix.col ? 
        `repeat(${loadData.data.gridMatrix.col}, 1fr)` : '1fr',
    }

    const Tester = ({item}) => {
        return(<p>{item}</p>)
    }

    const location = useLocation()

    return(
        <section className={"platform"}>
            {!loadData && 
                <NotFoundPage/>
            }
            {loadData && 
            <div className="kinder-page">
                {/* 헤더 part */}
                <div className="header">
                    <Container 
                    width={loadData.data.headerContainer && loadData.data.headerContainer.unit === 'px' && loadData.data.headerContainer.width}
                    perWidth={loadData.data.headerContainer ? loadData.data.headerContainer.unit === '%' && loadData.data.headerContainer.width : 100}>
                    <div className="nav-bar">
                        <div className="logo" style={{width : loadData.data.logoWidth+'px', height: loadData.data.logoHeight+'px'}}>
                            <Link to={`/kinder/${loadData.originUrl}`}>
                                <img src={`${loadData.data.logoPath}`}/>
                            </Link>
                        </div>
                        <nav className="navigation" style={{width : `calc(100% - ${loadData.data.logoWidth+'px'})`}}>
                            <ul className="depth1" style={{justifyContent : loadData.data.navFlexStyle.style, gap: loadData.data.navFlexStyle.gap + 'px'}}>
                            {loadData.data.navDepth1 && loadData.data.navDepth1.map((mainData, mainIdx)=>{
                                if(loadData.data.navDepth2 && !loadData.data.navDepth2[mainIdx]){
                                    return <li key={mainIdx}><Link to={`${mainData.mainPath}`}>{mainData.mainName}</Link></li>
                                }else{
                                    return (
                                        <li key={mainIdx}><Link to={`${mainData.mainPath}/${loadData.data.navDepth2[mainIdx][0].subPath}`}>{mainData.mainName}</Link>
                                            {loadData.data.navDepth2 &&  
                                                loadData.data.navDepth2[mainIdx] && 
                                                <ul className="depth2">    
                                                {loadData.data.navDepth2[mainIdx].map((data, subIdx) => {
                                                    return <li key={subIdx}><Link to={`${mainData.mainPath}/${data.subPath}`}>{data.subName}</Link></li>
                                                })}
                                                </ul>
                                            }
                                        </li>
                                    )
                                }
                            })}
                            </ul>
                        </nav>
                    </div>
                    </Container>
                </div>
                
                {/* 배경 파트 */}
                <div className="bg">
                    <ImgBox src={loadData.data.selectBgSrc} imgSize={{height : loadData.data.bgHeight}}/>
                </div>

                <Routes>
                {loadData && loadData.data.navDepth1 && loadData.data.navDepth1.map((mainData, mainIdx)=>{
                    if(loadData.data.navDepth2 && !loadData.data.navDepth2[mainIdx]){
                        return <Route key={mainIdx} path={`/${mainData.mainPath}`} element={<Tester item={mainData.mainName}></Tester>}></Route>
                    }else{
                        return (
                            <Route key={mainIdx} path={`/${mainData.mainPath}/`}>
                                {loadData.data.navDepth2 && loadData.data.navDepth2[mainIdx] &&       
                                    loadData.data.navDepth2[mainIdx].map((data, subIdx) => {
                                        return <Route key={subIdx} path={`${data.subPath}`} element={<Tester item={data.subName}/>}></Route>
                                    })
                                }
                            </Route>
                        )
                    }
                })}
                </Routes>

                {decodeURIComponent(location.pathname) === `/kinder/${kinderUrl}` && <Container
                width={loadData.data.contentsContainer && loadData.data.contentsContainer.unit === 'px' && loadData.data.contentsContainer.width}
                perWidth={loadData.data.contentsContainer ? loadData.data.contentsContainer.unit === '%' && loadData.data.contentsContainer.width : 100}>
                    <div className="content" style={contentGrid}>
                        {loadData.data.gridMatrix && 
                        Array(loadData.data.gridMatrix.row * loadData.data.gridMatrix.col).fill(0).map((_, idx) => {
                            let key = loadData.data.zoneData['zone'+(idx+1)]
                            let type = loadData.data.zoneData[key]
                            return <div key={idx} className="content-item">
                                {key === 'eventDate' && type === 1 && <EventDateBox1/>}
                                {key === 'eventDate' && type === 2 && <EventDateBox2/>}
                                {key === 'photoBox' && type === 1 && <PhotoBox1/>}
                                {key === 'todayMenu' && type === 1 && <TodayMenuBox1/>}
                                {key === 'notice' && type === 1 && <NoticeBox1/>}
                                </div>
                        })}
                    </div>
                </Container>}
            </div>
            }
        </section>
    )
}

export default PlatformPage