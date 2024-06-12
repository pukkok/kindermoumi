import React from "react";
import ImgBox from "../../Components/ImgBox";
import './styles/SelectJoinType.css'

function SelectJoinType ({ setFunc }) {

    const nextStep = (type) => {
        if(setFunc){
            setFunc(type)
        }
    }

    return(
        <section className="join-type">
            <div className="text-box dashed">
                <h2>회원유형 선택</h2>
                <h4>해당하는 권한의 회원가입버튼을 클릭하여 주시기 바랍니다.</h4>
            </div>
            <div className="select-type">
                <div className="type">
                    <ImgBox src={`${origin}/agreement/ico_joinParnt.png`}/>
                    <h2>학부모</h2>
                    <p>휴대폰 인증 및<br/>
                        아이핀인증을 진행합니다.</p>
                    <button onClick={()=>nextStep('학부모')}>가입하기</button>
                </div>
                <div className="type">
                    <ImgBox src={`${origin}/agreement/ico_joinStaff.png`}/>
                    <h2>교직원</h2>
                    <p>EPKI 인증을 진행합니다.<br/>
                        인증서를 준비하여 주시기 바랍니다.</p>
                    <button onClick={()=>nextStep('교직원')}>가입하기</button>
                </div>
            </div>
        </section>
    )
}

export default SelectJoinType