import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import './styles/JoinPage.css'
import ImgBox from '../../Components/ImgBox'
import Container from '../../Components/Container'

import axios from "axios";
import classNames from "classnames";

import Agreement from "./Agreement";
import SelectJoinType from "./SelectJoinType";
import Certificate from "./Certificate";
import InputInfo from "./InputInfo";

const BASE_URL = 'http://localhost:5000'
const agreeSteps = ['약관동의', '회원구분', '본인확인', '정보입력', '가입완료']

function JoinPage () {

    const [step, setStep] = useState(0) // 회원가입 절차

    const [agreeCheck, setAgreeCheck] = useState([]) // 스텝0 : 동의
    const navigate = useNavigate()

    const [joinType, setJoinType] = useState('') // 스텝1 : 타입선택
    useEffect(()=>{
        if(joinType){
            setStep(step+1)
        }
    },[joinType])

    const [certificateData, setCertificateData] = useState({}) // 스텝2 : 인증 완료
    useEffect(()=>{
        if(Object.values(certificateData).length>0){
            setStep(step+1)
        }
    },[certificateData])

    const [inputValues, setInputValues] = useState({ // 회원가입 정보 입력
        name: '', isDirector: false, organization: '', kinderCode: '',
        email: '', phone: '', userId: '', password: '', confirmPassword: ''
    })

    // 인증 후 회원가입
    const join = async (e, step2) => {
        e.preventDefault()
        // 인증했다 === 교사다
        if(certificateData){
            const {name, isDirector, organization, kinderCode} = certificateData
            const { email, phone, userId, password, confirmPassword} = step2
            let bodyData = {name, isDirector, organization, kinderCode, email, phone, userId, password, confirmPassword}

            if(email === ''){
                delete bodyData.email
            }
            if(phone === ''){
                delete bodyData.phone
            }

            const { data } = await axios.post(`${BASE_URL}/teacher/join/step2`, {
                ...bodyData
            })
            alert(data.msg)
            if(data.code === 200){
                setStep(step+1)
            }
        }
    }

    // 버튼 클릭시!
    const moveStep = (e) => {
        const key = e.target.innerText
        if(key === '이전'){
            setStep(step-1)  
        }else if(key === '다음'){ // 스텝 0 => 1
            if(agreeCheck.length === 2){ // 둘다 체크 되었는가?
                setStep(step+1)
                setAgreeCheck([])
            }else{
                alert('모두 동의해야 가입이 가능합니다.')
            }
        }else if(key === '회원가입'){ // 취소 (메인으로 돌아가기)
            join(e, inputValues) // 회원가입 시도
        }else{
            navigate(-1)
        }
    }

    useEffect(()=>{
        if(step === 1){ // 이전버튼으로 되돌아 왔을 경우
            setJoinType('') // 선택 초기화
        }
    },[step])

    return(
        <div id="Join" className="join">
            <h1>회원가입</h1>
            <Container width={1240}>
            <div className="join-wrap">
                <div className="step-box">
                    {agreeSteps.map((order,idx)=>{
                        return (
                            <Fragment key={idx}>
                                <div className="step">
                                    <ImgBox addClass={classNames('img-box', {active : step===idx})} src={`${origin}/agreement/img_joinStep${idx+1}.png`}/>
                                    <p>STEP 0{idx+1}</p>
                                    <strong>{order}</strong>
                                </div>
                                {idx !== agreeSteps.length -1 && <div className="arrow"></div>}
                            </Fragment>
                        )
                    })}
                </div>
                {step === 0 && <Agreement setFunc={setAgreeCheck}/> }
                {step === 1 && <SelectJoinType setFunc={setJoinType}/> }
                {step === 2 && <Certificate type={joinType} setFunc={setCertificateData}/> }
                {step === 3 && <InputInfo info={certificateData} type={joinType} setFunc={setInputValues} inputValues={inputValues}/> }
                {step === 4 && 
                <div className="text-box dashed">
                    <h2>회원가입 완료</h2>
                    <h4>로그인 후 다양한 서비스를 이용해 보세요</h4>
                </div>}
                <div className="btn-box">
                    <button className={classNames({active : step!==0 })} onClick={moveStep}>{step===0 ? '취소' : step===3 ? '회원가입' : step === 4 ? '홈으로 돌아가기' : '이전' }</button>
                    {step !== 4 && <button className={classNames({active : step===0 })} onClick={moveStep}>{step===0 ? '다음' : step===3 ? '이전' : '취소'}</button>}
                </div>
            </div>
            </Container>
            
        </div>

    )
}

export default JoinPage