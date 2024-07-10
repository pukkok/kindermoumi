import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { HeaderAtom, HeaderContainerAtom, HeaderGapAtom } from '../../Recoil/AdminAtom'
import CountBtn from '../../Components/CountBtn'
import axios from "axios";

function HeaderEditor ({token}) {
    const [headerHeight, setHeaderHeight] = useRecoilState(HeaderAtom)
    const [headerGap, setHeaderGap] = useRecoilState(HeaderGapAtom)
    const [headerContainer, setHeaderContainer] = useRecoilState(HeaderContainerAtom)

    const [isCheck, setIsCheck] = useState(false)

    const headerInput = (e) => {
        const { name, value } = e.target
        if(name === 'height'){
            setHeaderHeight(value)
        }
        if(name === 'gap'){
            setHeaderGap(value)
        }
        if(name === 'container'){
            setCount(value)
        }
    }

    const addContainer = () => {
        setIsCheck(!isCheck)
    }

    const [count, setCount] = useState(headerContainer.width)
    const [containerUnit, setContainerUnit] = useState(headerContainer.unit)

    const unitChange = (unit) => {
        if(unit === '%'){
            setCount(100)
        }
        if(unit === 'px'){
            setCount(1240)
        }
        setContainerUnit(unit)
    }

    useEffect(()=>{
        if(containerUnit === '%'){
            if(count > 100){
                setCount(100)
            }
        }
        if(containerUnit === 'px'){
            if(count > 3000){
                setCount(3000)
            }
        }
        setHeaderContainer({unit : containerUnit, width: count})
    },[count, containerUnit])

    const saveHeaderData = async () => {
        let container = headerContainer
        if(headerContainer.unit ==='px' && headerContainer.width < 800){
            return alert('최소 컨테이너의 크기는 800px입니다.')
        }
        if(!isCheck){
            container = {width: 100, unit: '%'}
        }
        const { data } = await axios.post('platform/upload/data', {
            headerHeight, headerGap, headerContainer : container
        },{headers : {'Authorization' : `Bearer ${token}`}})
        alert(data.msg)
    }

    return (
        <section className="header-edit">
            <h2>상단 관리</h2>
            <div className="remote-btns">
                <p>업로드</p><span></span>
                <button title="입력된 데이터를 저장합니다." onClick={saveHeaderData}>저장</button>
                <button title="전체 옵션을 초기화합니다" >초기화</button>
            </div>
            <div className="upload mb">
                <div className="option-box">
                    <p>상단 설정</p>
                    <div className="inner">
                        <p className="count-box">
                            <span>높이 :</span> 
                            <input onChange={headerInput} name="height" placeholder={'60'} value={headerHeight}/>
                            px
                            <span className="count-btn-box">
                                <CountBtn addClass={'count-btn'} count={headerHeight} setCount={setHeaderHeight}/>        
                            </span>
                        </p>
                    </div>
                </div>

                <div className="option-box">
                    <p>로고 ↔ 네비게이션</p>
                    <div className="inner">
                        <p className="count-box">
                            <span>간격 :</span>
                            <input onChange={headerInput} name='gap' placeholder="40" value={headerGap}/>
                            px
                            <span className="count-btn-box">
                                <CountBtn addClass={'count-btn'} count={headerGap} setCount={setHeaderGap}/>        
                            </span>
                        </p>
                    </div>
                </div>
                <div className="option-box diff">
                    <label>
                        <input type="checkbox" className="checkbox" onChange={addContainer} checked={isCheck}/>
                        컨테이너 추가
                    </label>
                    {isCheck && 
                    <>
                        <p className="inner count-box">
                            <span>컨테이너 넓이 :</span>
                            <input type="text" onChange={headerInput} name="container" placeholder="1240" value={count}/>
                            {headerContainer.unit}
                            <span className="count-btn-box">
                                <CountBtn addClass={'count-btn'} count={count} setCount={setCount}/>        
                            </span>
                        </p>
                    
                        <p className="inner">
                            <span>단위 선택 : </span>
                            <label >
                                <input type="radio" name="unit" className="radio" onChange={()=>unitChange('px')} checked={containerUnit === 'px'}/>px
                            </label>
                            <label>
                                <input type='radio' name="unit" className="radio" onChange={()=>unitChange('%')} checked={containerUnit === '%'} />%
                            </label>
                        </p>
                    </>
                    }
                </div>
            </div>
        </section>
    )
}
export default HeaderEditor