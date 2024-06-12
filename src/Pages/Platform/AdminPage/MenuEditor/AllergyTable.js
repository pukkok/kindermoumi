import React, { useEffect, useRef, useState } from "react";
import './styles/AllergyTable.css'
import classNames from "classnames";

function AllergyTable ({defaultAllergies, allergyList, setAllergyList}) {

    const addInputValue = (e) => {
        e.preventDefault()

        if(inputRef.current.value===''){
            return alert('알레르기를 입력해주세요')
        }

        if(allergyList.includes(inputRef.current.value)){
            alert('이미 등록한 정보입니다.')
        }else{
            setAllergyList([...allergyList, inputRef.current.value])
            inputRef.current.value = ''
        }
    }

    const inputRef = useRef()
    // 알레르기 삭제하기
    const deleteList = (allergy) => {
        alert('삭제 완료')
        setAllergyList(allergyList.filter((value)=>{
            return value !== allergy
        }))
    }

    // 드래그 이벤트(알레르기 위치 바꾸기)
    const dragItem = useRef() // 드래그 하는 아이템
    const dragOverItem = useRef() // 드래그 놓는 아이템 
    const [itemA, setItemA] = useState(null)
    const [itemB, setItemB] = useState(null)
    const dragStartHandler = (idx) => { // 잡는 아이템의 인덱스
        dragItem.current = idx
        setItemA(idx)
    }

    const dragEnterHandler = (idx) => { // 놓는 아이템의 인덱스
        dragOverItem.current = idx
        if(itemA) setItemB(idx)
    }

    const drop = () => { // 아이템 떨구기
        const copyListItems = [...allergyList]
        const dragItemContent = copyListItems[dragItem.current]
        const changeItemContent = copyListItems[dragOverItem.current]

        // 각각의 위치 바꾸기
        copyListItems.splice(dragItem.current, 1, changeItemContent)
        copyListItems.splice(dragOverItem.current, 1, dragItemContent)

        // current 초기화
        dragItem.current = null
        dragOverItem.current = null
        setAllergyList(copyListItems)
        setItemA(null)
        setItemB(null)

    }

    // 버튼 이벤트(알레르기 위치 바꾸기)
    const changeIndex = (direction , idx) => {
        const copyListItems = [...allergyList]
        const selectItem = copyListItems[idx]
        
        if(direction === 'up'){
            if(idx>0){ // idx === 0 : 첫번째 아이템 선택
                setItemA(idx)
                setItemB(idx-1)
                const changeItem = copyListItems[idx-1]
                copyListItems.splice(idx, 1, changeItem)
                copyListItems.splice(idx-1, 1, selectItem)
                setAllergyList(copyListItems)
            }
        }else{
            if(idx<copyListItems.length-1){ // idx === listLength-1 : 마지막 아이템 선택
                setItemA(idx)
                setItemB(idx+1)
                const changeItem = copyListItems[idx+1]
                copyListItems.splice(idx, 1, changeItem)
                copyListItems.splice(idx+1, 1, selectItem)
                setAllergyList(copyListItems)
            }
        }

        setTimeout(() => {
            setItemA(null)
            setItemB(null)
        }, 500);

    }

    const [isDrag, setIsDrag] = useState(false)
    const onDraggable = () => {
        setIsDrag(!isDrag)
    }

    const [isOpenForm, setIsOpenForm] = useState(false)
    const openAddForm = () => {
        setIsOpenForm(!isOpenForm)
    }

    return(
        <>
            <div className={classNames("allergy-table")}>
                <div className="allergy-header">
                    <h2>알레르기 표</h2>
                    <div className="btn-box">
                        <button onClick={onDraggable}>{isDrag ? '완료' : <span></span>}</button>
                        <button onClick={openAddForm}>{isOpenForm ? '완료' : '추가'}</button>
                    </div>
                </div>
                <form className={`remote-allergy ${isOpenForm && 'on'}`} autoFocus>
                    <input ref={inputRef} placeholder="알레르기 입력"/>
                    <button onClick={addInputValue}>추가</button>
                </form>
                <div className={classNames("allergy-list", {resizing : isOpenForm})}>
                {allergyList.map((allergy, idx)=> {
                    return (
                        <div key={idx} className={classNames("allergy-item", {active : idx===itemA}, {active: idx===itemB})}
                        onDragStart={()=>dragStartHandler(idx)}
                        onDragEnter={()=>dragEnterHandler(idx)}
                        onDragOver={e => e.preventDefault()}
                        onDragEnd={drop}
                        draggable={isDrag}>
                            {allergy.includes('(') ?
                            <p>{idx+1} - {allergy.split('(')[0]}<br/>
                            <span>{'('+allergy.split('(')[1]}</span></p>
                            :<p>{idx+1} - {allergy}</p>
                            }
                            <div className={classNames('meterial-icons', {on : isDrag})}>
                                <span className="material-symbols-outlined" onClick={()=>changeIndex('up', idx)}>arrow_drop_up</span>
                                <span className="material-symbols-outlined" onClick={()=>changeIndex('down', idx)}>arrow_drop_down</span>
                            </div>
                            {!defaultAllergies.includes(allergy) && <button className={classNames('delete-btn', {on : isDrag})} onClick={()=>deleteList(allergy)}>삭제</button>}
                        </div>
                    )
                })}
                </div>
            </div>
            
            
        </>
    )
}

export default AllergyTable