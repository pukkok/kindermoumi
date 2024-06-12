import React, { useRef } from "react";
import './styles/Agreement.css'
import agreementData from "../../Datas/agreementData";
import CheckBox from "../../Components/CheckBox";


function Agreement ({ setFunc }) {
    const {agreePersonInfo, agreeToTermsOfUse} = agreementData 

    const checkRef = useRef([])
    const getCheckValue = (e) => {
        if(e.target.value === '전체'){
            if(e.target.checked){
                checkRef.current.forEach(el => el.checked = true )
            }else{
                checkRef.current.forEach(el => el.checked = false )
            }
        }else{
            if(!e.target.checked){ // 하나라도 해제하면 전체(체크박스) 해제
                checkRef.current[0].checked = false
            }
        }
        if(setFunc){
            setFunc( //체크된 값만 전달한다. (전체 제외)
                checkRef.current.filter((el, idx) => {
                return idx !==0 && el.checked
            }))
        }
    }

    return(
        <section className="agreement">
            <div className="text-box">
                <h2>약관동의</h2>
                <h4>회원가입시 개인정보 수집 및 이용에 대한 동의 및 서비스이용약관에 동의하셔야 회원가입이 가능합니다.<br/>
                개인정보 수집 및 이용에 대한 동의및 서비스이용약관을 꼼꼼히 읽어보신 후 회원가입을 진행해주시기 바랍니다.<br/>
                학교홈페이지의 통합회원으로 가입하시면 학교에서 제공하는 다양한서비스를 이용하실 수 있습니다.</h4>
            </div>
            <div className="agree-all">
                <CheckBox inputRef={el => checkRef.current[0] = el} inputValue={'전체'}
                handleClick={getCheckValue}>
                    통합로그인 서비스 이용에 필요한 필수 항목에 모두 동의합니다.
                </CheckBox>
            </div>
            <div className="agree-input">
                <CheckBox inputRef={el => checkRef.current[1] = el} inputValue={'개인정보'} subOption={'(필수)'}
                handleClick={getCheckValue}>
                    개인정보 수집 및 이용에 대한에 동의
                </CheckBox>
            </div>
            <div className="agree-box">
            {agreePersonInfo && 
                <>
                    <h2>{agreePersonInfo.headline}</h2>
                    {agreePersonInfo.option.map((data, id) => {
                    return(
                        <div key={id}>
                            <h3>{data.title && data.title}</h3>
                            <h4>{data.subtitle && data.subtitle}</h4>
                            <h5>{data.description && data.description}</h5>
                        </div>
                        )
                    })}
                </>}
            </div>
            <div className="agree-input">
                <CheckBox inputRef={el => checkRef.current[2] = el} inputValue={'이용약관'} subOption={'(필수)'}
                handleClick={getCheckValue}>
                    서비스 이용약관에 동의
                </CheckBox>
            </div>
            <div className="agree-box">
                {agreeToTermsOfUse && 
                <>
                    <h2>{agreeToTermsOfUse.headline}</h2>
                    {agreeToTermsOfUse.option.map((data, id)=>{
                        return(
                            <div key={id}>
                                <h3>{data.title && data.title}</h3>
                                <h4>{data.subtitle && data.subtitle}</h4>
                                <h5>{data.description && data.description}</h5>
                            </div>
                        )
                    })}
                </>}
            </div>
        </section>
    )

}

export default Agreement