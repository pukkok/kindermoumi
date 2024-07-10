import React , { useEffect, useRef, useState }from "react";
import { axiosKinderAllData, axiosKinderData} from '../../Components/axiosData';
import sidoData from '../../Datas/sidoData'
import sggData from '../../Datas/sggData';
import './styles/SearchPage.css'
import { MemoOptionFilter } from "./OptionFilter";
import classnames from "classnames";
import PageBtn from "../../Components/PageBtn";
import Loading from '../../Components/Loading'
import Container from "../../Components/Container";
import SearchModal from "./SearchModal";
import navData from "../../Datas/navData";
import Navigator from "../Common/Navigator";

function SearchPage ({ allData }) {
    const { main, sub, list } = navData.search
    const [localData, setLocalData] = useState([]) // 검색한 데이터 범위(지역 검색)
    const [filterData, setFilterData] = useState([]) // 검색한 결과 
    const [viewData, setViewData] = useState([]) // 화면에 보여주는 데이터

    // 지역 선택 토글
    const [openLocal, setOpenLocal] = useState(false)
    const codeRef = useRef({sido: 0, sgg: 0}) // 시/도, 시/군/구 코드

    const openLocalOption = () => { // 지역선택 열기/닫기
        setOpenLocal(!openLocal)
    }

    const applyLocalOption = () => { // 지역선택 적용
        setOpenLocal(!openLocal)
        setFilterData([])
        const {sido, sgg} = codeRef.current
        if(sido === 0){ // searchData가 0이되면 allData를 불러옴
            return setLocalData([])
        }

        if(sgg!==0){
            axiosKinderData(sido, sgg, setLocalData)
        }else{ // 시/도 선택 시/군/구 전체
            const list = sggData.filter(data => {
                return data.sidoCode === sido
            })
            axiosKinderAllData(list, setLocalData)
        }
    }

    // 지역 옵션 선택 & 시/도, 시/군/구 code 선택
    const [active, setActive] = useState({sido : 0, sgg : 0}) // 선택된 시/도 시/군/구
    const [selectLocal, setSelectLocal] = useState({}) // 지역 선택 부분
    const valueExtractor = (e, name, idx) => {

        if(name === 'sido'){
            if(idx === 0){ // 전체 초기화
                codeRef.current = {sido: 0, sgg: 0} // 전체 초기화
                setSelectLocal({}) // 전체 선택
            }else{
                codeRef.current = {...codeRef.current, [name]: e.target.value, sgg: 0}
                setSelectLocal({[name] : e.target.innerText})
            }
        }else{ // name === sgg
            if(idx === 0){ // 시/군/구 초기화
                codeRef.current = {...codeRef.current, sgg: 0}
                setSelectLocal({...selectLocal, [name] : ''})
            }else{
                codeRef.current = {...codeRef.current, [name]: e.target.value}
                if(e.target.innerText !== '세종특별자치시'){
                    setSelectLocal({...selectLocal, [name] : e.target.innerText})
                }
            }
        }

        if(name === 'sido'){ // 시/도 선택시 시/군/구 전체로 전환
            setActive({...active, [name]: idx, sgg: 0})
        }else{
            setActive({...active, [name]: idx})
        }

    }

    // 검색 기능
    const searchRef = useRef()
    const searchKinder = () => {
        const filtering = (arr) => {
            return arr.filter(data => {
                return data.kindername.includes(searchRef.current.value)
            })
        }

        if(localData.length>0){ // 지역 검색 기록이 있는 경우
            const result = filtering(localData)
            if(result.length>0) return setFilterData(result)
        }else{ // 지역 검색을 하지 않은 경우
            const result = filtering(allData)
            if(result.length>0) return setFilterData(result)
        }
        alert('조회 결과가 없습니다.')
    }

    const [flag, setFlag] = useState(true)
    const searchKinderEnter = (e) => {
        if(flag){
            if(e.code === 'Enter'){
                searchKinder()
                setFlag(false)
            }
        }
    }
    useEffect(()=>{
        if(!flag){
            setTimeout(()=>{
                setFlag(true)
            },500)
        }
    },[flag])

    const sggFilterData = sggData // 시/도code에 맞는 시/군/구 데이터 불러오기
    .filter(data => data.sidoCode === +codeRef.current.sido) 
    .sort((a,b)=>a.sgg.localeCompare(b.sgg)) // 문자 오름차순 정렬

    const [listOption, setListOption] = useState({
        isActive : false, text : '10개씩 보기'
    })

    const openListOption = () => {
        setListOption({...listOption, isActive: !listOption.isActive})
    }

    // 페이지당 보여주는 아이템 개수 변경
    const changeListCnt = (e) => {
        e.stopPropagation() // 체이닝 방지
        const { value, innerText } = e.target
        setListOption({...listOption, 
            isActive : false,
            text: innerText,
        })
        setItemsCnt(+value)
        setPagesCnt(1)
    }

    const [pagesCnt, setPagesCnt] = useState(1) // 페이지 개수
    const [itemsCnt, setItemsCnt] = useState(10) // 페이지당 아이템 개수

    useEffect(()=>{ // 데이터 보여주기
        const pageNationViewer = (arr) => {
            const viewer = arr.filter((_, idx) => {
                return itemsCnt * (pagesCnt-1) <= idx && idx < itemsCnt * pagesCnt
            })
            setViewData(viewer)
        }

        const viewerDataSelector = () => {
            if(filterData.length > 0){
                return filterData
            }else if(localData.length > 0){
                return localData
            }else{
                return allData
            }
        }

        let resultData = viewerDataSelector()
        pageNationViewer(resultData)
            
    }, [pagesCnt, itemsCnt, allData, localData, filterData])

    const [checkboxOption, setCheckboxOption] = useState({})
    useEffect(()=>{
        
        let keys = Object.keys(checkboxOption)
        
        let newData = []
        localData.length>0 ? // 지역 검색한 기록이 있다면
        newData = JSON.parse(JSON.stringify(localData)) : // 로컬에서 검색
        newData = JSON.parse(JSON.stringify(allData)) // 없다면 전체에서 검색

        const filterOptionData = () => { // 체크박스 옵션에 따른 데이터 검색
            keys.forEach(key => {
                let fkey = checkboxOption[key]
                if(key === '설립 유형'){
                    newData = newData.filter(data => {
                        return fkey.includes(data.establish) 
                    })
                }
                
                if(fkey.includes('특수학급')){
                    newData = newData.filter(data => {
                        return data.shclcnt !== null
                    })
                }

                if(fkey.includes('방과후과정')||(fkey.includes('운영') && fkey.includes('미운영'))){
                    newData = newData
                }else{
                    if(fkey.includes('미운영')){
                        newData = newData.filter(data => {
                            let ot = data.opertime.split('~')[1].slice(0,2)
                            return ot < 15
                        })
                    }
                    
                    if(fkey.includes('운영')){
                        newData = newData.filter(data => {
                            let ot = data.opertime.split('~')[1].slice(0,2)
                            return ot >= 15
                        })
                    }
                }
            }) //filtering 종료

            if(allData.length>0){ // 전체 데이터 로딩 성공
                if(newData.length>0){ // 체크박스 검색 결과가 있는가?
                    setFilterData(newData)
                }else{
                    alert('검색 결과가 없습니다.')
                }
            } 
        }
        filterOptionData()
        
    },[checkboxOption])

    const [openModal, setOpenModal] = useState(false)
    const [kinderData, setKinderData] = useState({})
    const openDetailDataModal = (data) =>{
        setOpenModal(!openModal)
        setKinderData(data)
    }

    return(
        <>
        <Navigator main={main} sub={sub} list={list}/>
        <Container>
        <div className="Search">
            <div className="search-local">
                <div className="local-select" >
                    <button onClick={openLocalOption}>{Object.keys(selectLocal).length>0 ? 
                    <>{selectLocal.sido} {selectLocal.sgg}</> : '지역선택'}
                    </button>
                    <div className={classnames("local-option", {on : openLocal})}>
                        <nav>
                            <ul>
                                <p>시/도</p>
                                <li onClick={e=>valueExtractor(e, 'sido', 0)}
                                className={classnames({on : 0 === +active['sido']})}>전체</li>
                                {sidoData && sidoData.map((option, idx)=>{
                                const { city, code } = option
                                return <li key={idx} value={code} onClick={(e)=>valueExtractor(e, 'sido', idx+1)}
                                        className={classnames({on : idx+1 === +active['sido']})}>{city}</li>
                                })}
                            </ul>
                            <ul>
                                <p>시/군/구</p>
                                <li onClick={e=>valueExtractor(e, 'sgg', 0)}
                                className={classnames({on : 0 === +active['sgg']})}>전체</li>
                                {active.sido !==0 && sggFilterData.map((data, idx) => {
                                    const {sgg, code} = data
                                    return  <li key={idx} value={code} onClick={(e)=>valueExtractor(e, 'sgg', idx+1)}
                                            className={classnames({on : idx+1 === +active['sgg']})}>{sgg}</li>
                                })}
                            </ul>
                        </nav>
                        <div className="btn-box">
                            <button onClick={(e)=>valueExtractor(e, 'sido', 0)}>초기화</button>
                            <button onClick={applyLocalOption}>적용</button>
                        </div>
                    </div>
                </div>
                    
                <label className="search-kinder" onKeyDown={searchKinderEnter}>
                    <input ref={searchRef} placeholder="유치원명으로 검색"/>
                    <button onClick={searchKinder}>검색</button>
                </label>
            </div>

            <div className="search-filter">
                {<MemoOptionFilter setResult={setCheckboxOption} reloader={localData}/>}
            </div>

            <div className="search-viewer">
                <div className="search-result">
                    <p className="list">
                        검색 목록 <span>{
                        filterData.length>0 ? filterData.length : 
                        localData.length>0 ? localData.length : 
                        allData.length>0 ? allData.length : 0 }
                        </span>
                    </p>
                    <div onClick={openListOption} className={classnames('option', {on : listOption.isActive})}>
                        <p>{listOption.text}</p>
                        <ul onClick={changeListCnt} >
                            <li value={10}>10개씩 보기</li>
                            <li value={20}>20개씩 보기</li>
                            <li value={50}>50개씩 보기</li>
                        </ul>
                    </div>
                </div>

                {/* 데이터 보여주는 곳 */}
                <div className="search-datas">
                {viewData.length>0 ? viewData.map((data, id)=> {
                    const { addr, establish, kindername, edate, opertime, telno} = data 
                    const newEdata = edate.slice(0,4)+'-'+edate.slice(4,6)+'-'+edate.slice(6,8)+' 설립'
                    const afterSchool = opertime.split('~')[1].slice(0,2)
                    return(
                        <div key={id} className="search-data" onClick={()=>openDetailDataModal(data)}>
                            <p><span>{establish}</span> {kindername}</p>
                            <h5>{newEdata}<span>·</span>{telno}<span>·</span>{addr}</h5>
                            <h5>{afterSchool >= 15 ? '방과후과정(운영)' : '방과후과정(미운영)'}</h5>
                        </div>
                    )
                }):<Loading/>}
                </div>

                {openModal && <div className="detail-data">
                    <SearchModal kinderData={kinderData} setClose={setOpenModal}/>
                </div>}

                {/* 페이지 버튼 */}
                {allData.length>0 && <PageBtn 
                allLength={
                    filterData.length>0 ? filterData.length : 
                    localData.length>0 ? localData.length : 
                    allData.length>0 ? allData.length : 0 } 
                dividedValue={itemsCnt} setFunc={setPagesCnt}/>}
                
            </div>
        </div>
        </Container>
        </>
    )
}

export default SearchPage