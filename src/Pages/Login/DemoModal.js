import React, {useEffect, useState} from "react";
import LabelBox from "../../Components/LabelBox";
import axios from "axios";
import './styles/Demo.css'

const step1Arr = [
    { id: 'key', type: 'text', name : '인증키'},
    { id: 'password', type: 'password', name : '패스워드'}
]
const BASE_URL = 'http://localhost:5000'

function DemoModal ({ setClose, setFunc }) {

    const [step1Input, setStep1Input] = useState({})
    const step1InputExtractor = (e) => { // 1단계 처리하기 (인증처리)
        let {name, value} = e.target
        let keyName = ''
        if(name === '인증키') keyName = 'key'
        if(name === '패스워드') keyName = 'password'
        setStep1Input({...step1Input, [keyName] : value})
    }

    // 인증서 확인
    const certificate = async (e, step1) => { 
        const {key, password} = step1
        e.preventDefault()
        const { data } = await axios.post(`${BASE_URL}/teacher/join/step1`, {
            key, password
        })
        if(data.code === 200){
            alert(data.msg)
            setFunc(data.data)
            setClose(false)
        }else{
            alert(data.msg)
        }
    }

    return(
        <section className="Demo">
            <div>
                <p>인증하기_데모</p>
            </div>
            <LabelBox handleChange={step1InputExtractor} 
                handleClick={(e)=>certificate(e, step1Input)}
                addClass={'type-a'} arr={step1Arr}>
                완료
            </LabelBox>
        </section>
    )
}

export default DemoModal