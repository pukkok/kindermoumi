import React, { useEffect, useRef, useState } from "react";
import './styles/SearchModal.css'
import KakaoMap from "../../Components/KakaoMap";
import ImgBox from "../../Components/ImgBox";
import axios from "axios";
import { Link } from "react-router-dom";


function SearchModal ({ kinderData, setClose }) {

    const [homepage, setHomePage] = useState()

    useEffect(()=>{
        const findOpenKinder = async () => {
            const {data} = await axios.get(`user/openKinder/${kinderData.kindercode}`)
            if(data.code === 200){
                setHomePage(data.url)
            }
        }
        findOpenKinder()
    },[])

    const closeModal = (e) =>{
        if(e.target.className === 'search-modal'){
            setClose(false)
        }
    }

    return(
        <section className="search-modal" onClick={closeModal}>
            <div className="detail">
                <div className="description">
                    <div className="title">
                        <h2><span>{kinderData.establish}</span>{kinderData.kindername}</h2>
                    </div>
                    <div className="info">
                        <h4><ImgBox src={`${origin}/search/icon-summary-base.png`}/>기본정보</h4>
                        <p><span>전화번호</span> {kinderData.telno}</p>
                        <p><span>운영시간</span> {kinderData.opertime}</p>
                        <p><span>대표자명</span> {kinderData.rppnname}</p>
                        <p><span>원장명</span> {kinderData.ldgrname}</p>
                        <p><span>설립일</span> {kinderData.edate.slice(0,4)+'-'+kinderData.edate.slice(4,6)+'-'+kinderData.edate.slice(6,8)}</p>
                        <p><span>개원일</span> {kinderData.odate.slice(0,4)+'-'+kinderData.odate.slice(4,6)+'-'+kinderData.odate.slice(6,8)}</p>
                        <p><span>관할행정기관</span> {kinderData.officeedu} / {kinderData.subofficeedu}</p>
                        <p><span>주소</span> {kinderData.addr}</p>
                        <p><span>홈페이지</span>{homepage ? <Link to={`/kinder/${homepage}`} style={{color: '#5172df'}}>{ 'www.moumi.com/kinder/'+homepage}</Link> : '등록된 홈페이지가 없습니다.'} </p>
                    </div>
                    <div className="info one-data">
                        <h4><ImgBox src={`${origin}/search/icon-summary-base.png`}/>통학차량</h4>
                        <span>운영</span>
                    </div>
                </div>
                <>
                </>
                <KakaoMap addr={kinderData.addr} pinName={kinderData.kindername}/>
            </div>
        </section>
    )
}

export default SearchModal