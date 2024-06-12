import React, { useEffect, useRef, useState } from "react";
import './styles/AdminPage.css'
import classNames from "classnames";

import SideBar from "./SideBar";
import HeaderBar from "./HeaderBar";
import Preview from "./Preview";

import LogoEditor from "./Editor/LogoEditor";
import BackgroundEditor from "./Editor/BackgroundEditor";
import NavigationEditor from "./Editor/NavigationEditor";
import ContainerEditor from "./Editor/ContainerEditor";
import ContentEditor from "./Editor/ContentsEditor";
import axios from "axios";
import MenuTable from "./Menus/MenuTable";
import MenuEditor from "./Menus/MenuEditor";
import AllergyEditor from "./Menus/AllergyEditor";

function AdminPage () {

    const token = JSON.parse(localStorage.getItem('token'))
    
    const [loadData, setLoadData] = useState({})

    useEffect(()=>{
        const downloadData = async () => {
            const {data} = await axios.post('/kinder/download/data', {}, {
                headers : {'Authorization' : `Bearer ${token}`}
            })
            if(data.code === 200){
                return setLoadData(data.result)
            }else{
                console.log(data.msg)
            }
        }
        downloadData()
    },[])

    useEffect(()=>{
        if(loadData.logoPath){
            setLogo('http://localhost:5000/'+loadData.logoPath)
        }
        if(loadData.addBgList){
            const addBgList = loadData.addBgList.map(bg => {
                return 'http://localhost:5000/'+bg
            })
            setLoadBgs([...addBgList])
        }
        if(loadData.selectBgSrc){
            setBg(loadData.selectBgSrc)
        }
        if(loadData.containerSize){
            setContainerSize({...containerSize, width : loadData.containerSize, unit : loadData.containerUnit})
        }
        if(loadData.navDepth1){
            setMainMenu(loadData.navDepth1)
        }
        if(loadData.navDepth2){
            setSubMenu(loadData.navDepth2)
        }
        if(loadData.zoneData){
            setGridZone({...loadData.zoneData})
        }
        if(loadData.gridCoord){
            setXyCount({row: loadData.gridCoord.row, col: loadData.gridCoord.col})
        }

    },[loadData])


    // 그리드 사이즈 지정 (사이드바 접고 펼칠때 사용)
    const [gridSize, setGridSize] = useState(250)
    const gridTemplate = {
        gridTemplateColumns : `${gridSize}px 1fr`
    }

    // 테마 선택
    const [theme, setTheme] = useState('page')
    // 탭 이동
    const [tabs, setTabs] = useState([])
    const [selectedTab, setSelectedTab] = useState('')
    const closeTab = (e, checkValue) => {
        e.stopPropagation()
        if(tabs[tabs.length-1].value === checkValue){
            if(tabs.length===1){ // 탭이 1개 열려 있을때
                setSelectedTab('')
            }else{ // 마지막탭 하나 전 탭으로 액티브 이동
                setSelectedTab(tabs[tabs.length-2].value)
            }
        }
        
        setTabs(tabs.filter(tab=>{
            return tab.value !== checkValue
        }))
    }

    const [logo, setLogo] = useState() // 로고값
    const [logoSize, setLogoSize] = useState({width:'', height:''})

    // 메인메뉴 옵션(상위)
    const [mainMenu, setMainMenu] = useState([ //0:{id:1} 1:{id:2}
        {mainIdx : 0, mainName: '', mainPath: ''}
    ])
    // 서브메뉴 옵션(하위)
    const [subMenu, setSubMenu] = useState({})

    const [bg, setBg] = useState() // 미리보기 배경
    const [loadBgs, setLoadBgs] = useState([])
    const [hideContainer, setHideContainer] = useState(false) // 컨테이너 보이기/숨기기
    const [containerSize, setContainerSize] = useState({
        maxWidth:'1240', width:'1240', minWidth:'1240', unit: 'px' // 디폴트 값
    }) // 컨테이너 사이즈 변수

    const [previewSize, setPreviewSize] = useState()
    const [xyCount, setXyCount] = useState({})

    const [gridZone, setGridZone] = useState({}) // 컨텐츠 그리드 구역
    const sizeRef = useRef()
    useEffect(()=>{
        setPreviewSize(sizeRef.current.offsetWidth)
    },[])  
    

    // 식단표 메뉴 입력 부분
    const [deleteYOIL, setDelteYoil] = useState([])
    const [sideOptions, setSideOptions] = useState([])

    // 디폴트 알러지
    const defaultAllergies = ['난류', '우유','메밀', '땅콩', '대두', '밀', '고등어', '게', '새우', '돼지고기', '복숭아', '토마토', `아황산포함식품(대부분의 가공식품에 포함되어 따로 표기하지 않음)`, '호두', '닭고기', '소고기', '오징어', '조개류(굴, 전복, 홍합 포함)', '잣', '견과류(아몬드)']
    const [allergyList, setAllergyList] = useState([...defaultAllergies])

    return(
        <section className="admin-page open" style={gridTemplate}>
            <SideBar area='l'
            setTheme={setTheme}
            tabs={tabs} setTabs={setTabs} setSelectedTab={setSelectedTab}
            hideContainer={hideContainer} setHideContainer={setHideContainer}
            />
            <HeaderBar area='h' setGridSize={setGridSize} token={token}/>
            <div className={classNames("option-part", "c", {wide: theme==='menus'})}>
                <div className="left-part part" ref={sizeRef}>
                    {theme === 'page' &&
                    <>
                        <p className="option-name">레이아웃
                            <span className="red"></span>
                            <span className="yellow"></span>
                            <span className="green"></span>
                        </p>
                        <Preview active={selectedTab} hideContainer={hideContainer}
                        logo={logo} mainMenu={mainMenu} bg={bg} containerSize={containerSize} previewSize={previewSize}
                        xyCount={xyCount} gridZone={gridZone}/>
                    </>}
                    {theme === 'menus' &&
                    <>
                        <p className="option-name">식단표
                            <span className="red"></span>
                            <span className="yellow"></span>
                            <span className="green"></span>
                        </p>
                        <MenuTable deleteYOIL={deleteYOIL} sideOptions={sideOptions} allergyList={allergyList}/>
                    </>}
                </div>
                <div className="part">
                    <div className="option-btn-box">
                        {tabs.map((list, idx)=>{
                            const {value, text} = list
                            return <div key={idx} 
                            className={classNames('option-btn',{active : selectedTab === value})}> 
                                <button className="tab-btn" onClick={()=>setSelectedTab(value)}>{text}</button>
                                <button className="close-btn" onClick={(e)=>closeTab(e, value)}>
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                        })}
                    </div>
                    <div className="option-window">
                        {selectedTab === 'logo' && <LogoEditor token={token} setLogo={setLogo} logo={logo} logoSize={logoSize} setLogoSize={setLogoSize}/>}
                        {selectedTab === 'bg' && <BackgroundEditor token={token} bg={bg} setBg={setBg} loadBgs={loadBgs}/>}
                        {selectedTab === 'navigation' && <NavigationEditor token={token} mainMenu={mainMenu} setMainMenu={setMainMenu} subMenu={subMenu} setSubMenu={setSubMenu}/>}
                        {selectedTab === 'container' && <ContainerEditor token={token} setSizeValues={setContainerSize}/>}
                        {selectedTab === 'content' && <ContentEditor token={token} xyCount={xyCount} setXyCount={setXyCount} gridZone={gridZone} setGridZone={setGridZone}/>}
                        {selectedTab === 'menu-table' && <MenuEditor token={token} deleteYOIL={deleteYOIL} setDeleteYoil={setDelteYoil} sideOptions={sideOptions} setSideOptions={setSideOptions}/>}
                        {selectedTab === 'allergy' && <AllergyEditor defaultAllergies={defaultAllergies} allergyList={allergyList} setAllergyList={setAllergyList}/>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminPage