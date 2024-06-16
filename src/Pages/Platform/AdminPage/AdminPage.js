import React, { useEffect, useRef, useState } from "react";
import './styles/AdminPage.css'
import classNames from "classnames";

import SideBar from "./SideBar";
import HeaderBar from "./HeaderBar";

import axios from "axios";
import EditorPage from "./EditorPage";
import SmartModal from "./SmartModal";
import { useRecoilState } from "recoil";
import { AdminAtom } from "../../../Recoil/AdminAtom";
function AdminPage () {

    const token = JSON.parse(localStorage.getItem('token'))
    
    const [pageData, setPageItem] = useRecoilState(AdminAtom)

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
        // if(loadData.logoPath){
        //     setPageItem(process.env.REACT_APP_RESTAPI_URL+'/'+loadData.logoPath)
        // }
        // if(loadData.addBgList){
        //     const addBgList = loadData.addBgList.map(bg => {
        //         return process.env.REACT_APP_RESTAPI_URL + '/' + bg
        //     })
        //     setLoadBgs([...addBgList])
        // }
        // if(loadData.selectBgSrc){
        //     setBg(loadData.selectBgSrc)
        // }
        // if(loadData.containerSize){
        //     setContainerSize({...containerSize, width : loadData.containerSize, unit : loadData.containerUnit})
        // }
        // if(loadData.navDepth1){
        //     setMainMenu(loadData.navDepth1)
        // }
        // if(loadData.navDepth2){
        //     setSubMenu(loadData.navDepth2)
        // }
        // if(loadData.zoneData){
        //     setGridZone({...loadData.zoneData})
        // }
        // if(loadData.gridCoord){
        //     setXyCount({row: loadData.gridCoord.row, col: loadData.gridCoord.col})
        // }

    },[loadData])

    


    // 그리드 사이즈 지정 (사이드바 접고 펼칠때 사용)
    const [sideOpen, setSideOpen] = useState(false)

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
        <section className="admin-page open">
            <SideBar 
            sideOpen={sideOpen} setSideOpen={setSideOpen}
            setTheme={setTheme}
            tabs={tabs} setTabs={setTabs} setSelectedTab={setSelectedTab}
            hideContainer={hideContainer} setHideContainer={setHideContainer}
            />

            <HeaderBar area='h' token={token} setSideOpen={setSideOpen}/>

            <div className={classNames("option-part", "c")}>
                <div className="part" ref={sizeRef}>
                    {theme === 'page' &&
                    <EditorPage />
                    }
                </div>
            </div>

            <SmartModal selectedTab={selectedTab}/>
        </section>
    )
}

export default AdminPage