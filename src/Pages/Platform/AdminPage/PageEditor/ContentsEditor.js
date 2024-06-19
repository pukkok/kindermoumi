import React, { useEffect, useState } from "react";
import PhotoBoxEditor from "./PhotoBoxEditor";
import TodayMenusEditor from "./TodayMenusEditor";
import NoticeEditor from "./NoticeEditor";
import EventDateEditor from "./EventDateEditor";
import './styles/ContentsEditor.css'
import axios from "axios";
import { useRecoilState } from "recoil";
import { gridZoneAtom, xyCountAtom } from "../../../../Recoil/AdminAtom";

function ContentEditor ({ token }) {

    const [xyCount, setXyCount] = useRecoilState(xyCountAtom)
    const [gridZone, setGridZone] = useRecoilState(gridZoneAtom)
    const xyCounter = (e, xy) => {
        setXyCount({...xyCount, [xy] : e.target.value})
    }

    const [count, setCount] = useState(0)

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

    const contentOptions = [
        {text: '행사일정', optionValue: 'eventDate'},
        {text: '오늘의 식단', optionValue: 'todayMenu'},
        {text: '포토박스', optionValue: 'photoBox'},
        {text: '공지사항', optionValue: 'notice'},
    ]

    const [contentType, setContentType] = useState({})

    console.log(gridZone)

    useEffect(()=>{
        setGridZone({...gridZone, ...contentType})
    },[contentType])

    const getSelectValue = (e, idx) => {
        if(e.target.value !== '선택'){
            setGridZone({...gridZone,  ['zone'+(idx+1)]: e.target.value, [e.target.value]:1})
        }else{
            setGridZone({...gridZone, ['zone'+(idx+1)] : ''})
        }
    }

    const saveContent = async () => {
        let {row, col} = xyCount
        if(!row) row = 1
        if(!col) col = 1

        const { data } = await axios.post('platform/upload/data', {
            zoneData : gridZone, gridMatrix: {row, col}
        },{headers : {'Authorization' : `Bearer ${token}`}})
        alert(data.msg)
    }

    return(
        <section className="content-edit">
            <>
            <div className="summary">
                <h2>컨텐츠</h2>
                <p>메인페이지에서 보여줄수 있는 컨텐츠를 설정해 보세요.</p>
                <span>*구역을 나눠서 컨텐츠를 지정할수 있습니다.</span>
            </div>
            <div className="summary">
                <h2>구역선택</h2>
                <p>구역에 넣을 컨텐츠를 선택해 보세요</p>
                <span>*구역 나누기 후 사용 가능합니다.</span>
            </div>
            <div className="remote-btns">
                <p>구역</p><span></span>
                <button onClick={saveContent}>저장</button>
                <button >초기화</button>
            </div>
            <div className="row-col-selector mb">
                <div className="row-col">
                    <p>행 열 개수</p>
                        <select onChange={(e)=>xyCounter(e, 'row')} value={xyCount.row}>
                            <option value={0}>행 선택</option>
                            {Array(5).fill(0).map((_, idx) => {
                                return <option key={idx} value={idx+1}>{idx+1}행</option>
                            })}
                        </select>
                        <select onChange={(e)=>xyCounter(e, 'col')} value={xyCount.col}>
                            <option value={0}>열 선택</option>
                            {Array(5).fill(0).map((_, idx) => {
                                return <option key={idx} value={idx+1}>{idx+1}열</option>
                            })}
                        </select>
                </div>
                <div className="item-zone">
                    {count ? Array(count).fill(0).map((_, idx1)=> {
                        return (
                            <div key={idx1}>
                                <p>구역 {idx1+1}</p>
                                <select onChange={(e)=>getSelectValue(e, idx1)} value={gridZone['zone'+(idx1+1)]}>
                                    <option>선택</option>
                                    {contentOptions.map((optionItem, idx2) => {
                                        const {text, optionValue} = optionItem
                                        return(
                                            <option key={idx2} value={optionValue}>{text}</option>
                                        )
                                    })}
                                </select>
                            </div>)
                    }) : <p>구역 선택</p>}
                </div>
            </div>
            
            <div>
                
            </div>
                <EventDateEditor contentType={contentType} setContentType={setContentType}/>
                <TodayMenusEditor/>
                <PhotoBoxEditor contentType={contentType} setContentType={setContentType}/>
                <NoticeEditor/>
            </>
        </section>
    )
}

export default ContentEditor