import React, { useEffect, useState } from "react";
import './styles/Certificate.css'
import ImgBox from "../../Components/ImgBox";
import DemoModal from "./DemoModal";

function Certificate ({type, setFunc}) {

    const CertificateBtnBox = () => {
        return(
            <div className="certificate-btn-box">
                <button className="blue">
                    <ImgBox src={`${origin}/agreement/selfChk_phone.png`}/>
                    <h3>휴대전화 본인인증</h3>
                </button>
                <button className="grey" onClick={()=>setFunc('건너뛰기')}>
                    <ImgBox src={`${origin}/agreement/selfChk_ipin.png`}/>
                    <h3>아이핀 본인인증</h3>
                </button>
            </div>
        )
    }

    const [openDemo, setOpenDemo] = useState(false)
    const openDemoModal = () => {
        setOpenDemo(!openDemo)
    }
    const closeDemoModal = (e) => {
        if(e.target.className === 'modal'){
            setOpenDemo(false)
        }
    }

    const [certificateData, setCertificateData] = useState({})

    useEffect(()=>{
        if(Object.values(certificateData).length>0){
            setFunc(certificateData)
        }
    },[certificateData])

    return(
        <section className="certificate">
            {type === '학부모' && 
            <>
                <div className="text-box dashed">
                    <h2>사용자 인증</h2>
                </div>
                <div className="description">
                    <h2>인증방식을 선택해주세요</h2>
                    <p>회원가입을 위해서는 본인인증을 거쳐야 합니다. 인증방식은 휴대폰 인증과 아이핀인증이 있으며 두가지 인증방식 중 하나의 인증방식을 택하여 본인인증 절차를 진행해 주시기 바랍니다.<br/>
                    입력하신 개인정보는 회원님의 동의 없이 공개 또는 제 3자에게 제공되지 않으며, 이용약관 및 개인정보 처리방침에 따라 안전하게 보호됩니다.</p>
                </div>
                <CertificateBtnBox/>
            </>
            }
            {type === '교직원' && 
            <>
                <div className="text-box dashed">
                    <h2>교직원 인증</h2>
                </div>
                <div className="description">
                    <h2>교직원 인증을 진행해주세요.</h2>
                    <p>교직원 회원가입을 위해서는 1차 인증(본인인증), 2차 인증(교직원 인증서)이 요구됩니다.<br/>
                    교육부에서 발급받은 EPKI 인증서로 교직원 인증을 완료해주셔야 합니다.<br/>
                    입력하신 개인정보는 회원님의 동의 없이 공개 또는 제 3자에게 제공되지 않으며, 이용약관 및 개인정보 처리방침에 따라 안전하게 보호됩니다.</p>
                </div>
                <div className="description">
                    <h2>1차인증(본인인증)</h2>
                    <CertificateBtnBox/>
                </div>
                <div className="description">
                    <h2>2차인증(교직원 인증)</h2>
                    <div className="certificate-btn-box">
                        <button className="grey" onClick={openDemoModal}>
                            <ImgBox src={`${origin}/agreement/selfChk_ipin.png`}/>
                            <h3>교직원 인증서</h3>
                        </button>
                    </div>
                </div>
            </>
            }
            {openDemo && <div className="modal" onClick={closeDemoModal}>
                <DemoModal setClose={setOpenDemo} setFunc={setCertificateData}/>
            </div>}
        </section>
    )
}

export default Certificate