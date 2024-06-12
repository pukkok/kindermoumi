import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ImgBox from "../../../../Components/ImgBox";
import './styles/LogoEditor.css'

function LogoEditor ({logo, setLogo, logoSize, setLogoSize, token}) {

    //로고 부분
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
    
    const logoRef= useRef()
    const getLogo = (e) => {
        if(e.target.files[0]){
            setLogo(URL.createObjectURL(e.target.files[0]))
        }
    }

    // 초기값을 담아둔다.
    const [prevSize, setPrevSize] = useState({
        width:'', height:''
    })

    const imgRef = useRef()

    useEffect(()=>{
        if(logo && logo!=='notFound'){
            const width = imgRef.current.offsetWidth
            const height = imgRef.current.offsetHeight
            setLogoSize({width, height})
            setPrevSize({width, height})
        }else{
            setLogoSize({width:'', height:''})
        }
    },[logo])

    

    const sizeRef = useRef({})

    const changeImgSize = () => {
        const {w, h} = sizeRef.current
        let width = w.value
        let height = h.value
        if(width > 250){
            return alert('넓이는 250px을 넘길 수 없습니다.')
        }
        if(height > 150){
            return alert('높이는 150px을 넘길 수 없습니다.')
        }
        if(w.value.length === 0) width = prevSize.width
        if(h.value.length === 0) height = prevSize.height
        setLogoSize({... logoSize, width, height})
    }

    const resetImgSize = () => {
        setLogoSize({...prevSize})
        sizeRef.current.w.value = ''
        sizeRef.current.h.value = ''
    }


    useEffect(()=>{
        
    },[changeImgSize])

    return(
        <section className="logo-edit">
            <div className="summary">
                <h2>로고</h2> 
                <p>일반적으로 기업이나 제품 혹은 서비스 등의 이름을 특징이 드러나도록 디자인하여,
                상표처럼 사용할 수 있도록 제작되어진 글자들의 조합입니다.    
                </p> 
                <span>*해당 홈페이지의 사용처는 메인페이지(홈 또는 첫 페이지)로 돌아가는 기능입니다.</span>
            </div>
            <div className="remote-btns">
                <p>로고</p><span></span>
                <button title='이미지를 업로드합니다.' onClick={()=>logoRef.current.click()}>불러오기</button>
                <p>업로드</p><span></span>
                <button title="수정된 이미지 옵션을 저장합니다." onClick={()=>uploadLogo()}>저장</button>
                <button title="전체 옵션을 초기화합니다" onClick={()=>setLogo('notFound')}>초기화</button>
            </div>
            <div className="upload">
                <div>
                    <p>로고<span>(실제 크기)</span></p>
                    <span className="summary">최대 넓이는 250px이며, 최대 높이는 150px입니다.</span>
                    <ImgBox addClass={'logo-box'} imgSize={logoSize} src={logo} alt="이미지"
                    ref={imgRef}/>
                </div>
                <div className="switch-box">
                    {logoSize.width && 
                    <>
                    <div>
                        <p>현재 크기</p>  
                        <p className="summary">넓이: {logoSize.width && logoSize.width + 'px'}</p>
                        <p className="summary">높이: {logoSize.height && logoSize.height + 'px'}</p>
                    </div>
                    <div>                            
                        <p>수정</p>
                        <p className="summary">넓이: {logoSize.width && 
                            <><input ref={(el)=>sizeRef.current['w'] = el}/>px</>}
                        </p>
                        <p className="summary">높이: {logoSize.height && 
                            <><input ref={(el)=>sizeRef.current['h'] = el}/>px</>}
                        </p>

                        <button onClick={changeImgSize}>적용</button> 
                        <button onClick={resetImgSize}>초기화</button>
                    </div>
                    </>}
                </div>
                
                    
            </div>

            {/* 로고 추가 */}
            <input hidden type="file" onChange={getLogo} ref={logoRef}/>
        </section>
    )
}

export default LogoEditor