import React, { useEffect, useState } from "react";
import './styles/ContainerEditor.css'
import axios from "axios";

function ContainerEditor ({setSizeValues, token}) {

    const [windowWidth, setWindowWidth] = useState()
    useEffect(()=>{
        setWindowWidth(window.innerWidth)
    },[window.innerWidth])

    const [imsi, setImsi] = useState({ // 임시로 담아두기
        width: '', maxWidth: '', minWidth: '', unit: 'px'
    })

    const unitChange = (unit) => {
        if(imsi.unit !== unit){
            setImsi({width: '', maxWidth: '', minWidth: '', unit})
        }
    }

    const sizeChange = (e) => {
        const {name, value} = e.target
        if(imsi.unit === '%'){
            if(+value > 100){
                return alert('100%를 넘길수 없습니다.')
            }
        }

        if(+value > windowWidth){
            return alert('컨테이너는 화면 전체의 넓이보다 클 수 없습니다.')
        }
        setImsi({...imsi, [name] : value})
    }

    const sendContainerSize = () => { // 적용시 전달하기
        const {width, maxWidth, minWidth} = imsi
        if(width==='' && maxWidth==='' && minWidth ===''){
            return alert('변경된 값이 없습니다.')
        }
        setSizeValues({...imsi})
    }

    const resetContainer = () => {
        setImsi({width: '1240', maxWidth: '1240', minWidth: '1240', unit: 'px'})
        setSizeValues({width: '1240', maxWidth: '1240', minWidth: '1240', unit: 'px'})
    }

    const uploadContainer = async () => {
        const { data } = await axios.post('platform/upload/data', {
            containerSize: imsi.width, containerUnit: imsi.unit
        },{headers : {'Authorization' : `Bearer ${token}`}})
        alert(data.msg)
    }

    return(
        <section className="container-edit">
            <div className="summary">
                <h2>컨테이너(그리드)</h2>
                <p>레이아웃을 구성하는 시스템으로 화면의 전체를 사용하지 않고, 여백을 주어 홈페이지 디자인에 질서와 규칙을 부여하여
                    알아보기 쉬운 방식으로 구성하는 뼈대, 프레임워크 역할을 합니다.
                </p>
                <span>*최대(max) : 컨테이너가 최대로 늘어나는 크기입니다.</span><br/>
                <span>*크기(width) : 컨테이너의 크기를 고정시킵니다.</span><br/>
                <span>*최소(min) : 컨테이너가 최대로 늘어나는 크기입니다.</span>
            </div>
            <div className="remote-btns">
                <p>설정</p><span></span>
                <button onClick={sendContainerSize}>적용</button>
                <button onClick={uploadContainer}>저장</button>
                <button onClick={resetContainer}>초기화</button>
            </div>
            <div className="container-box">
                <div className="switch-box summary">
                    <p>컨테이너 크기 지정(기본 1240px)</p>
                    <span>*설정이 없는경우 기본값으로 등록됩니다.</span>
                    <p>화면전체 넓이: {windowWidth}px</p> <p>컨테이너 넓이: {imsi.width + imsi.unit}</p>
                    <label>
                        최대 : <input placeholder="기본값" name="maxWidth" onChange={sizeChange} value={imsi.maxWidth}/>
                    </label>
                    <label>
                        크기 : <input placeholder="기본값" name="width" onChange={sizeChange} value={imsi.width}/>
                    </label>
                    <label>
                        최소 : <input placeholder="기본값" name="minWidth" onChange={sizeChange} value={imsi.minWidth}/>
                    </label>
                </div>
                <div className="summary">
                    <p className="impact">단위 변경하기(현재 단위 : {imsi.unit})</p>
                    <span>px : 화면에 고정된 크기를 나타내며 상황에 따라 변경되지 않습니다.</span><br/>
                    <span>% : 화면의 비율에 따라 크기가 변경됩니다.</span>
                    <div className="unit-btns">
                        <button onClick={()=>unitChange('px')}>px로 변경</button>
                        <button onClick={()=>unitChange('%')}>%로 변경</button>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default ContainerEditor