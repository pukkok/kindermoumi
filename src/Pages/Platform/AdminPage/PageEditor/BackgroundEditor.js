import React, {useRef, useState} from "react";
import ImgBox from "../../../../Components/ImgBox";
import './styles/BackgroundEditor.css'
import axios from 'axios'
import classNames from "classnames";
import { useRecoilState, useRecoilValue } from "recoil";
import { bgAtom, loadBgsAtom } from "../../../../Recoil/AdminAtom";

const sampleBgs = [
    'sample-bg1.png','sample-bg2.jpg','sample-bg3.png', 'sample-bg4.png','sample-bg5.png',
]
function BackgroundEditor ({ token }) {
    
    const [bg, setBg] = useRecoilState(bgAtom)
    const [loadBgs, setLoadBgs] = useRecoilState(loadBgsAtom)

    const bgRef =useRef()
    const [addBgs, setAddBgs] = useState([]) // 새로 추가된 배경(브라우저)
    const getBg = (e) => {
        if(e.target.files[0]){
            setAddBgs([...addBgs, e.target.files[0]])
            setBg(URL.createObjectURL(e.target.files[0]))
        }
    }

    const bgSelector = (src) => {
        setBg(src)
    }

    const deleteLoadBg = async (idx) => {
        const src = loadBgs[idx].replace(process.env.REACT_APP_RESTAPI_URL + '/', '')

        const {data} = await axios.put('platform/data', {
            bgSrc : src
        },{headers : {'Authorization' : `Bearer ${token}`}})
        alert(data.msg)
        if(data.code === 200){
            const addBgList = data.bgList.map(bg => {
                return process.env.REACT_APP_RESTAPI_URL + '/' + bg
            })
            setLoadBgs([...addBgList])
        }
    }

    const deleteSrc = (idx) => {
        setAddBgs(prev => prev.filter((_, i)=> {
            return i !== idx
        }))
    }
    
    const saveBgs = async () => { // 배경 이미지 배열 추가
        //content-type: multipart/form-data 로전송
        const fd = new FormData() // multer 사용시 폼데이터형식으로 보내줘야함
        addBgs.forEach(bgFile => {
            fd.append('bgImgs', bgFile)
        })
        
        const {data} = await axios.post('platform/upload/bg-list', fd, {
            headers : {
                'Content-Type': 'multipart/form-data',
                'Authorization' : `Bearer ${token}`
            }
        })
        alert(data.msg)
    }

    const saveSelectBg = async () => { // 선택한 배경 src 추가
        const { data } = await axios.post('platform/upload/data', {
            selectBgSrc : bg
        },{headers : {'Authorization' : `Bearer ${token}`}})

        alert(data.msg)
    }

    const [openDetail, setOpenDetail] = useState(false)
    const detailViewOpen = () => {
        setOpenDetail(!openDetail)
    }

    

    return(
        <section className="bg-editor">
            <div className={classNames("summary", {skip: openDetail})}>
                <h2>배경 <button onClick={detailViewOpen}><span>{openDetail ? '설명보기' : '설명접기'}</span></button></h2>
                <p>남들과 다른 배경을 사용하여 우리 유치원만의 유니크함을 표현 해보세요.</p> 
                <span>*기본적으로 5개의 이미지를 제공하며, 원하시는 경우 추가하여 사용하실 수 있습니다.</span>
            </div>
            <div className="remote-btns">
                <p>새로운 배경</p><span></span>
                <button onClick={()=>bgRef.current.click()}>추가</button>
                <button title="배경을 저장한 경우 로그인 후 언제나 사용 가능합니다." onClick={saveBgs}>등록</button>
                <p>업로드</p><span></span>
                <button onClick={()=>saveSelectBg()}>저장</button>
                <button onClick={()=>setBg('')}>초기화</button>
            </div>
            <div className="sample-container">
                <div className="sample-box">
                    {sampleBgs.map((bg, idx)=>{
                        let src = `${origin}/platform/${bg}`
                        return (
                            <div className="sample" key={idx}>
                                <ImgBox src={src}></ImgBox>
                                <div className="cover-btn">
                                    <button onClick={()=>bgSelector(src)}>업로드</button>
                                </div>
                            </div>
                        )
                    })}
                    {/* 불러온 이미지 */}
                    {loadBgs && loadBgs.length > 0 && loadBgs.map((bg, idx) => {
                        return (
                            <div className="sample" key={idx}>
                                <ImgBox src={bg}></ImgBox>
                                <div className="cover-btn">
                                    <button onClick={()=>bgSelector(bg)}>업로드</button>
                                    <button onClick={()=>deleteLoadBg(idx)}>삭제</button>
                                </div>
                            </div>
                        )
                    })}
                    {/* 현재 브라우저에서 추가하는 이미지 */}
                    {addBgs.length>0 && addBgs.map((bg, idx)=>{
                        let src = URL.createObjectURL(bg)
                        return (
                            <div className="sample" key={idx}>
                                <ImgBox src={src}></ImgBox>
                                <div className="cover-btn">
                                    <button onClick={()=>bgSelector(src)}>업로드</button>
                                    <button onClick={()=>deleteSrc(idx)}>삭제</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* 배경 추가 옵션 열기 */}
            <input hidden type="file" onChange={getBg} ref={bgRef}/>
        </section>
    )
    
}

export default BackgroundEditor