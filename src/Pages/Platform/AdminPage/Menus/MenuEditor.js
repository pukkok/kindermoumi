import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function MenuEditor ({token, deleteYOIL, setDeleteYoil, sideOptions, setSideOptions }) {

    const weeks = ['월', '화', '수', '목', '금', '토', '일']
    const yoilRef = useRef({})

    // 요일 지우기
    const checkYoilValue = () => {
        let deleteYoils = []

        weeks.forEach((yoil) => {
            if(yoilRef.current[yoil].checked){
                deleteYoils.push(yoil)
            }
        })

        setDeleteYoil(deleteYoils)
    }

    const saveYoilValue = async () => {
        const { data } = await axios.post('platform/menu/yoil', {
            deleteYOIL : [...deleteYOIL]
        },{headers : {'Authorization' : `Bearer ${token}`}})
        alert(data.msg)
    }


    const resetYoilValue = () => {
        setDeleteYoil([])
    }

    const [imsiOptions, setImsiOptions] = useState([
        {num:0, optionName: ''}
    ])

    // 추가
    const addSideOptions = () => {
        setImsiOptions([...imsiOptions, {num : imsiOptions.length, optionName:''}])
    }

    // 삭제
    const deleteSideOption = (e, num) => {

        const sorting = imsiOptions.map((option, idx) => {
            if(option.num > num){
                option.num = option.num - 1
            }
            if(num === idx){
                option.num = imsiOptions.length-1
            }
            return option
        })
        const filtering = sorting.filter(option => {
            return sorting.length-1 !== option.num
        })
        
        setImsiOptions(filtering)
    }

    // 입력
    const sideInputValue = (e, num) => {
        const mapping = imsiOptions.map(option => {
            if(option.num === num){
                return {num, optionName: e.target.value}
            }else{
                return option
            }
        })
        setImsiOptions(mapping)
    }

    //보내기
    const sendSideOptions = () => {
        setSideOptions(
            imsiOptions.map(option => {
            return option.optionName
        }))
    }

    const saveSideOptions = async () => {
        const { data } = await axios.post('platform/menu/side-options', {
            sideOptions : [...sideOptions]
        },{headers : {'Authorization' : `Bearer ${token}`}})
        alert(data.msg)
        
    }



    return(
        <section className="menu-edit">
            <div className="summary mb">
                <h2>식단표 등록</h2>
                <p>월간 식단표를 입력합니다. 필요한 요일을 삭제 할 수도, 사이드 옵션을 추가하여 관리할 수 있습니다.</p>
                <span>* 특별한 식단표를 만들어 보세요.</span><br/>
            </div>
            
            <div className="summary">
                <h2>요일 제외하기</h2>
                <p>사용하지 않는 요일을 삭제할 수 있습니다.</p>
                <span>* 주말을 제외하고 싶은 경우 "토", "일" 선택</span><br/>
                <span>* 적용 클릭 후 저장을 눌러야 제외하는 날짜가 저장됩니다.</span><br/>
            </div>
            <div className="remote-btns">
                <p>설정</p><span></span>
                <button onClick={checkYoilValue}>적용</button>
                <button onClick={saveYoilValue}>저장</button>
                <button onClick={resetYoilValue}>초기화</button>
            </div>
            <div className="mb">
                <p>삭제할 요일 선택</p>
                {weeks.map((yoil, idx) => {
                    return(
                        <label key={idx}>
                            <input type="checkbox" ref={el => yoilRef.current[yoil] = el}/>{yoil}
                        </label>
                    )
                })}
            </div>
            
            <div className="summary">
                <h2>사이드 메뉴 추가하기</h2>
                <p>식단표를 구분 할 사이드메뉴를 추가 할 수 있습니다.</p>
                <span>필요한 경우만 추가하여 사용하면 됩니다. (필수 x)</span><br/>
                <span>* 적용 클릭 후 저장을 눌러야 사이드 메뉴가 저장됩니다.</span><br/>
                <span>* 오늘의 한상, kcal/단백질(g), 간식</span><br/>
            </div>
            <div className="remote-btns">
                <p>옵션 설정</p><span></span>
                <button onClick={addSideOptions}>추가</button>
                <button onClick={sendSideOptions}>적용</button>
                <button onClick={saveSideOptions}>저장</button>
                <button >초기화</button>
            </div>
            <div className="mb">
                <p>사이드 메뉴 입력</p>
                {imsiOptions.map((option, idx)=> {
                    return <div key={idx}>
                        {idx+1}번 <input onChange={(e)=>sideInputValue(e, idx)} value={option.optionName}/>
                        {idx !== 0 && <button onClick={(e)=>deleteSideOption(e, idx)}>삭제</button>}
                    </div>
                })}
            </div>

            <div className="summary">
                <h2>정보 입력하기</h2>
                <p>입력하고 싶은 칸을 클릭해보세요.</p>
                <span>* 클릭하여 정보를 입력할 수 있습니다.</span><br/>
            </div>
        </section>
    )
}

export default MenuEditor