import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ImgBox from "../../Components/ImgBox";
import './styles/LogoEditor.css'
import { useRecoilState } from "recoil";
import { LogoAtom, LogoSizeAtom } from "../../Recoil/AdminAtom";
import classNames from "classnames";
import CountBtn from "../../Components/CountBtn";

function LogoEditor ({ token }) {

    const [logo, setLogo] = useRecoilState(LogoAtom)
    const [logoSize, setLogoSize] = useRecoilState(LogoSizeAtom)

    const [logoWidth, setLogoWidth] = useState(logoSize.width)
    const [logoHeight, setLogoHeight] = useState(logoSize.height)

    useEffect(()=>{
        setLogoSize({...logoSize, width: logoWidth, height : logoHeight})
    },[logoWidth, logoHeight])

    const logoRef= useRef() // 사진 업로드 input

    const uploadLogo = async () => {
        //content-type: multipart/form-data 로전송
        const fd = new FormData() // multer 사용시 폼데이터형식으로 보내줘야함
        
        fd.append('logoImg', logoRef.current.files[0]) // 파일 ('필드명',파일)
        
        const {data} = await axios.post('platform/upload/logo', fd, {
            headers : {
                'Content-Type': 'multipart/form-data',
                'Authorization' : `Bearer ${token}`
            }
        })
        if(data.code === 200){
            alert(data.msg)
        }

        const kinderData = await axios.post('platform/upload/data', {
            logoWidth: logoSize.width, logoHeight: logoSize.height
        },{headers : {'Authorization' : `Bearer ${token}`}})
        alert(kinderData.data.msg)
    }
    
    const getLogo = (e) => {
        if(e.target.files[0]){
            setLogo(URL.createObjectURL(e.target.files[0]))
        }
    }

    const logoSizeInput = (e) => {
        if(logo){
            const {name, value} = e.target
    
            if(name === 'width'){
                setLogoWidth(value)
            }
            if(name === 'height'){
                setLogoHeight(value)
            }
        }else{
            alert('이미지를 먼저 추가해 주세요')
        }
    }

    useEffect(()=>{
        if(logoWidth>300){
            setLogoWidth(300)
            return alert('가로 길이는 300px을 넘길 수 없습니다.')
        }
        if(logoHeight>80){
            setLogoHeight(80)
            return alert('세로 길이는 80px을 넘길 수 없습니다.')
        }

    },[logoWidth, logoHeight])

    const [openDetail, setOpenDetail] = useState(false)
    const detailViewOpen = () => {
        setOpenDetail(!openDetail)
    }

    return(
        <section className="logo-edit">
            <div className={classNames("summary", {skip : openDetail})}>
                <h2>로고 <button onClick={detailViewOpen}><span>{openDetail ? '설명보기' : '설명접기'}</span></button></h2>
                <p>일반적으로 기업이나 제품 혹은 서비스 등의 이름을 특징이 드러나도록 디자인하여,
                상표처럼 사용할 수 있도록 제작되어진 글자들의 조합입니다.    
                </p> 
                <span>*해당 홈페이지의 사용처는 메인페이지(홈 또는 첫 페이지)로 돌아가는 기능입니다.</span>
            </div>
            <div className="remote-btns">
                <p>업로드</p><span></span>
                <button title="수정된 이미지 옵션을 저장합니다." onClick={()=>uploadLogo()}>저장</button>
                <button title="전체 옵션을 초기화합니다" onClick={()=>setLogo()}>초기화</button>
            </div>
            <div className="upload">
                <div>
                    <button className="add-img" onClick={()=>logoRef.current.click()}>
                        
                    {!logo ? 
                        <span className="material-symbols-outlined">
                            add_photo_alternate
                        </span>
                    :
                    <ImgBox addClass={'logo-box'} src={logo} alt="이미지" imgSize={logoSize}/>
                    }
                    </button>
                    {/* <span className="summary">최대 넓이는 250px이며, 최대 높이는 150px입니다.</span> */}
                </div>
                <div className="option-box">
                    <p>로고 옵션</p>
                    <div className="inner">                            
                        <p className="count-box">
                            <span>가로 : </span>
                            <input onChange={logoSizeInput} name="width" placeholder={logoWidth} value={logoWidth}/>
                            px
                            <span className="count-btn-box">
                                <CountBtn addClass={'count-btn'} count={logoWidth} setCount={setLogoWidth}/>        
                            </span>
                        </p>
                        <p className="count-box">
                            <span>세로 : </span>
                            <input onChange={logoSizeInput} name="height" placeholder={logoHeight} value={logoHeight}/>
                            px 
                            <span className="count-btn-box">
                                <CountBtn addClass={'count-btn'} count={logoHeight} setCount={setLogoHeight}/>        
                            </span>
                        </p>
                    </div>
                    <p>클릭시 옵션</p>
                    <div className="inner">
                        <label>
                            <input type="checkbox" className="checkbox"/>링크 연결
                        </label>
                        <label>
                            <input type="checkbox" className="checkbox"/>모달창 열기
                        </label>
                    </div>
                </div>
                
                    
            </div>

            {/* 로고 추가 */}
            <input hidden type="file" onChange={getLogo} ref={logoRef}/>
        </section>
    )
}

export default LogoEditor