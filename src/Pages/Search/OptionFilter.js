import React, { useEffect, useRef, useState } from "react";
import './styles/OptionFilter.css'
import CheckBox from "../../Components/CheckBox";
import classNames from "classnames";

const optionBox = [
    { title : '설립 유형', options : ['전체', '국공립', '사립'] , subOption1 : ['국립','공립(단설)','공립(병설)'], subOption2 : ['사립(법인)', '사립(사인)'] },
    { title : '제공 서비스', options : ['전체', '방과후과정', '특수학급'], subOption1 : ['운영', '미운영']},
    { title : '휴·폐원 여부', options : ['휴원 제외', '폐원 제외']},
    { title : '통학차량 운영여부', options: ['운영', '미운영']}
]

export function OptionFilter ({ setResult, reloader}) {

    const mainRef = useRef({})
    const subRef = useRef({})

    // title option의 카테고리 , value option의 값
    const getCheckBoxValue = (e, title) => {
        if(mainRef.current[title].includes(e.target)){ // mainRef인 경우
            getMainValue(e, title)
        }else{ // subRef인 경우
            getSubValue(e, title)
        }
    }

    const getMainValue = (e, title) => {
        const {value, checked} = e.target
        if(value === '전체'){
            if(checked){
                mainRef.current[title].forEach(el => el.checked = true)

                if(title==='설립 유형'){
                    subRef.current['국공립'].forEach(el => el.checked = true)
                    subRef.current['사립'].forEach(el => el.checked = true)
                }

                if(title==='제공 서비스'){
                    subRef.current['방과후과정'].forEach(el => el.checked = true)
                }
            }else{
                mainRef.current[title].forEach(el => el.checked = false)

                if(title==='설립 유형'){
                    subRef.current['국공립'].forEach(el => el.checked = false)
                    subRef.current['사립'].forEach(el => el.checked = false)
                }

                if(title==='제공 서비스'){
                    subRef.current['방과후과정'].forEach(el => el.checked = false)
                }
            }
        }else{
            if(!checked){
                mainRef.current[title][0].checked = false
            }
        }

        if(['국공립', '사립', '방과후과정'].includes(value)){
            if(checked){
                subRef.current[value].forEach(el => el.checked = true)
            }else{
                subRef.current[value].forEach(el => el.checked = false)
            }
        }
    }
    
    // 서브옵션 check시 value값 가져오기
    const getSubValue = (e, option) => {
        const {value, checked} = e.target
        if(!checked){
            if(['국립', '공립(단설)', '공립(병설)'].includes(value)){
                mainRef.current[option][1].checked = false
            }
            
            if(['사립(법인)', '사립(사인)'].includes(value)){
                mainRef.current[option][2].checked = false
            }

            if(['운영', '미운영'].includes(value)){
                mainRef.current[option][1].checked = false
            }
        }

    }

    // 메인 옵션 열고 닫기
    const [close, setClose] = useState([])
    const toggleLabel = (idx) => {
        if(close.includes(idx)){ // 열기
            setClose(close.filter(innerIdx => innerIdx !== idx))
        }else{ // 닫기
            setClose([...close, idx])
        }
    }

    // 서브 옵션 열고 닫기
    const [openSub, setOpenSub] = useState({ '국공립': false, '사립': false })
    const toggleSubOption = (option) => {
        setOpenSub({...openSub, [option] : !openSub[option]})
    }

    // checkedValue 전체 결과 전달
    const getOptionResult = () => {
        const mainKeys = Object.keys(mainRef.current)
        let result = {}

        mainKeys.forEach(key => {
            let inputValue = []
            mainRef.current[key].forEach(input => {
                if(input.checked){ // mainRef의 checked가 true인 경우
                    inputValue.push(input.value)
                }

                if(subRef.current[input.value]){
                    subRef.current[input.value].forEach(subInput => {
                        if(subInput.checked){ // subRef의 checked가 true인 경우
                            inputValue.push(subInput.value)
                        }
                    })
                }
            })

            if(inputValue.length>0){ // true가 있을때만 result 전달
                result = {...result, [key] : inputValue }
            }
        })

        if(setResult){
            setResult(result)
        }
    }

    useEffect(()=>{
        for(let prop in mainRef.current){
            mainRef.current[prop].forEach(input => input.checked = false)
        }
        for(let prop in subRef.current){
            subRef.current[prop].forEach(input => input.checked = false)
        }
    },[reloader])

    return(
        <section className="option-filter">
            {optionBox && optionBox.map((data, idx1)=>{
                const { title, options } = data
                return(
                    <div key={`data${idx1}`}>
                        <div className={classNames("option-title", {close : close.includes(idx1)})} onClick={()=>toggleLabel(idx1)}>
                            <p>{title}</p>
                        </div>
                        <div className={classNames(`option-label`, {off : close.includes(idx1)} )}>
                            {options && options.map((option, idx) => {
                                return(
                                    <div className={'label-box'} key={option+idx}>
                                        <div className={classNames({'main-label' : ['국공립', '사립'].includes(option)})}>
                                        <CheckBox inputValue={option}
                                        inputRef={(el)=>{
                                            if(el !== null){
                                                if(mainRef.current[title]){
                                                    if(!mainRef.current[title].includes(el)){
                                                        mainRef.current[title] = [...mainRef.current[title], el]
                                                    }
                                                }else{
                                                    mainRef.current[title] = [el]
                                                }
                                            }
                                        }}
                                        handleClick={(e)=>getCheckBoxValue(e, title)}>{option}</CheckBox>
                                        {['국공립', '사립'].includes(option) && <button onClick={()=>toggleSubOption(option)} className="icon"></button>}
                                        </div>

                                        {option === '국공립' && // 설립 옵션 1
                                        <>
                                        {optionBox[0].subOption1.map((ob, idx)=>{
                                            return(<CheckBox key={ob+idx} inputValue={ob}
                                            inputRef={(el)=>{
                                                if(el !== null){
                                                    if(subRef.current[option]){
                                                        if(!subRef.current[option].includes(el)){
                                                            subRef.current[option] = [...subRef.current[option], el]
                                                        }
                                                    }else{
                                                        subRef.current[option] = [el]
                                                    }
                                                }
                                            }}
                                            addClass={classNames('sub-label', {on : openSub[option]})}
                                            handleClick={(e)=>getCheckBoxValue(e, title)}>{ob}</CheckBox>)
                                        })}
                                        </>}

                                        {option === '사립' && // 설립 옵션 2
                                        <>
                                        {optionBox[0].subOption2.map((ob, idx) => {
                                            return(<CheckBox key={ob+idx} inputValue={ob}
                                            inputRef={(el)=>{
                                                if(el !== null){
                                                    if(subRef.current[option]){
                                                        if(!subRef.current[option].includes(el)){
                                                            subRef.current[option] = [...subRef.current[option], el]
                                                        }
                                                    }else{
                                                        subRef.current[option] = [el]
                                                    }
                                                }
                                            }}
                                            addClass={classNames('sub-label', {on : openSub[option]})}
                                            handleClick={(e)=>getCheckBoxValue(e, title)}
                                            >{ob}</CheckBox>)
                                        })}
                                        </>}

                                        {option === '방과후과정' && // 제공 서비스 옵션
                                        <>
                                        {optionBox[1].subOption1.map((ob, idx) => {
                                            return(<CheckBox key={ob+idx} inputValue={ob}
                                            inputRef={(el)=>{
                                                if(el !== null){
                                                    if(subRef.current[option]){
                                                        if(!subRef.current[option].includes(el)){
                                                            subRef.current[option] = [...subRef.current[option], el]
                                                        }
                                                    }else{
                                                        subRef.current[option] = [el]
                                                    }
                                                }
                                            }}
                                            addClass={'sub-label on'}
                                            handleClick={(e)=>getCheckBoxValue(e, title)}
                                            >{ob}</CheckBox>)
                                        })}
                                        </>}

                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
            <button className="result-btn" onClick={getOptionResult}>선택한 조건으로 검색</button>
        </section>
    )
}
export const MemoOptionFilter = React.memo(OptionFilter)