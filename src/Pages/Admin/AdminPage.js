import React, { useEffect, useState } from "react";
import './styles/AdminPage.css'
import classNames from "classnames";

import SideBar from "./SideBar";
import HeaderBar from "./HeaderBar";

import axios from "axios";
import EditorPage from "./EditorPage";
import SmartModal from "./SmartModal";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { 
    HeaderAtom, HeaderContainerAtom, HeaderGapAtom, LogoAtom, LogoSizeAtom, 
    MenusAtom, adminThemeAtom, bgAtom, bgHeightAtom, deleteYOILAtom, gridZoneAtom, 
    loadBgsAtom, mainMenuAtom, moveLinkAtom, navFlexAtom, selectMonthAtom, sideOptionsAtom, 
    subMenuAtom, xyCountAtom } from "../../Recoil/AdminAtom";

import MenuTable from "../../Editor/MenuEditor/MenuTable";
import MenuEditor from "../../Editor/MenuEditor/MenuEditor";
import AllergyEditor from "../../Editor/MenuEditor/AllergyEditor";
import { headerPaddingTopAtom } from "../../Recoil/CommonAtom";
function AdminPage () {

    const setHeaderPaddingTop = useSetRecoilState(headerPaddingTopAtom)

    const token = JSON.parse(localStorage.getItem('token'))

    const [loadData, setLoadData] = useState({})
    const [loadMenu, setLoadMenu] = useState({})

    const setHeaderHeight = useSetRecoilState(HeaderAtom)
    const setHeaderGap = useSetRecoilState(HeaderGapAtom)
    const setHeaderContainer = useSetRecoilState(HeaderContainerAtom)

    const setLogo = useSetRecoilState(LogoAtom)
    const setLogoSize = useSetRecoilState(LogoSizeAtom)
    
    const setMainMenu = useSetRecoilState(mainMenuAtom)
    const setSubMenu = useSetRecoilState(subMenuAtom)
    const setNavFlex = useSetRecoilState(navFlexAtom)
    
    const setBgHeight = useSetRecoilState(bgHeightAtom)
    const setBg = useSetRecoilState(bgAtom)
    const setLoadBgs = useSetRecoilState(loadBgsAtom)
    const setGridZone = useSetRecoilState(gridZoneAtom)
    const setXyCount = useSetRecoilState(xyCountAtom)

    const setDeleteYOIL = useSetRecoilState(deleteYOILAtom)
    const setSideOptions = useSetRecoilState(sideOptionsAtom)
    const [menus, setMenus] = useRecoilState(MenusAtom)

    useEffect(() => {
        setHeaderPaddingTop(0)
    },[])

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

        const downloadMenu = async () => {
            const {data} = await axios.post('/kinder/download/menu', {}, {
                headers : {'Authorization' : `Bearer ${token}`}
            })
            if(data.code === 200){
                return setLoadMenu(data.personalMenu)
            }else{
                console.log(data.msg)
            }
        }
        downloadMenu()

    },[])
    
    const [loadedMonth, setLoadedMonth] = useState([])
    const selectMonth = useRecoilValue(selectMonthAtom)
    // 식단표 전송
    useEffect(()=>{

        const downloadMenuTable = async () => {
            const {data} = await axios.post('/kinder/download/menu-table', {
                selectMonth: selectMonth
            }, {
                headers : {'Authorization' : `Bearer ${token}`}
            })
            if(data.code === 200){
                return setMenus([...menus, ...data.menulist])
            }else{
                console.log(data.msg)
            }
        }
        if(selectMonth){    
            if(!loadedMonth.includes(selectMonth)){
                setLoadedMonth([...loadedMonth, selectMonth])
                downloadMenuTable()
            }else{
                return
            }
        }
    },[selectMonth])

    useEffect(()=>{
        /** 헤더 데이터 */
        if(loadData.headerHeight){
            setHeaderHeight(loadData.headerHeight)
        }
        if(loadData.headerGap){
            setHeaderGap(loadData.headerGap)
        }
        if(loadData.headerContainer){
            setHeaderContainer({...loadData.headerContainer})
        }
        /** 로고 데이터 */
        if(loadData.logoPath){
            setLogo(loadData.logoPath)
        }
        if(loadData.logoWidth){
            setLogoSize({width : loadData.logoWidth, height : loadData.logoHeight})
        }
        /** 네비게이션 데이터 */
        if(loadData.navDepth1){
            setMainMenu(loadData.navDepth1)
        }
        if(loadData.navDepth2){
            setSubMenu(loadData.navDepth2)
        }
        if(loadData.navFlexStyle){
            setNavFlex(loadData.navFlexStyle)
        }
        /** 배경 데이터 */
        if(loadData.addBgList){
            setLoadBgs([...loadData.addBgList])
        }
        if(loadData.selectBgSrc){
            setBg(loadData.selectBgSrc)
        }
        if(loadData.bgHeight){
            setBgHeight(loadData.bgHeight)
        }
        
        /** 컨텐츠 옵션 데이터 */
        if(loadData.gridMatrix){
            setXyCount({row: loadData.gridMatrix.row, col: loadData.gridMatrix.col})
        }
        if(loadData.zoneData){
            setGridZone({...loadData.zoneData})
        }

        if(loadMenu.deleteYOIL){
            setDeleteYOIL(loadMenu.deleteYOIL)
        }
        if(loadMenu.sideOptions){
            setSideOptions([...loadMenu.sideOptions])
        }
    },[loadData, loadMenu])


    // 그리드 사이즈 지정 (사이드바 접고 펼칠때 사용)
    const [sideOpen, setSideOpen] = useState(false)
    // 테마 선택
    const adminTheme = useRecoilValue(adminThemeAtom)
    // 수정 or 미리보기
    const [onMode, setOnMode] = useState(true)

    const moveLink = useRecoilValue(moveLinkAtom)

    // 디폴트 알러지
    const defaultAllergies = ['난류', '우유','메밀', '땅콩', '대두', '밀', '고등어', '게', '새우', '돼지고기', '복숭아', '토마토', `아황산포함식품(대부분의 가공식품에 포함되어 따로 표기하지 않음)`, '호두', '닭고기', '소고기', '오징어', '조개류(굴, 전복, 홍합 포함)', '잣', '견과류(아몬드)']
    const [allergyList, setAllergyList] = useState([...defaultAllergies])

    return(
        <section className="admin-page open">
            <SideBar 
            sideOpen={sideOpen} setSideOpen={setSideOpen}
            onMode={onMode} setOnMode={setOnMode}
            />

            <HeaderBar area='h' token={token} setSideOpen={setSideOpen} />

            <div className={classNames("option-part", "c")}>
                <div className={classNames("part", {division2 : adminTheme==='menus'})}>
                    {adminTheme === 'page' && <EditorPage onMode={onMode}/>}
                    {adminTheme === 'menus' && 
                    <>
                        <MenuTable allergyList={allergyList}/>
                        {moveLink === 'menu-table' && <MenuEditor token={token}/>}
                        {moveLink === 'allergy' && <AllergyEditor defaultAllergies={defaultAllergies} allergyList={allergyList} setAllergyList={setAllergyList}/>}
                    </>}
                </div>
            </div>

            <SmartModal token={token}/>
        </section>
    )
}

export default AdminPage