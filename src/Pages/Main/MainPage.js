import React from "react";
import './styles/MainPage.css'
import ImgBox from "../../Components/ImgBox";
import Container from "../../Components/Container";
import { Link } from "react-router-dom";
import MainBg from "./MainBg";
import { updateDatas } from "../../Datas/UpdateData";
import MainSwiper from "./MainSwiperWords";


function MainPage ({loading}) {

    const CheckIcon = () => {
        return <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M18.0229 0.453362C17.2555 -0.201005 16.0756 -0.140598 15.389 0.59307L6.91198 9.6254L3.19364 6.03211C2.47013 5.33277 1.28856 5.32532 0.554995 6.01561C-0.17773 6.70564 -0.186383 7.83208 0.537689 8.53142L5.65085 13.4712C6.00172 13.8103 6.48044 14 6.97925 14C6.99404 14 7.00911 14 7.0253 14C7.54003 13.9883 8.02656 13.7735 8.36933 13.4071L18.1697 2.96385C18.8564 2.23258 18.7902 1.10746 18.0229 0.453362Z" fill="#4F52C3"/>
        </svg>
    }

    return(
        <section className="main-page">
            <MainBg>
                <div className="main-text">
                <ImgBox src={`${origin}/main/text-cloud.png`}/>
                <h2>
                    <span className="type-a">모</span>
                    <span className="type-b">으</span>
                    <span className="type-c">미</span>
                    와 함께</h2>
                <div className="slide-box">
                    <h1>쉽게</h1>   
                    {loading ? <MainSwiper/> : <strong className="type-a">관리</strong>}
                    <h1>하자</h1>
                </div>
                </div>
            </MainBg>
            <Container>
                <div className="content-go">
                    <div className="part-a">
                        <h1>새로운 친구를 만나는 유치원 <br/>
                            유치원하나하나 알아보기 어려우신가요?
                            <Link to={'/search'} onClick={()=>{window.scrollTo(0,0)
                            }}>유치원 찾아보기</Link>
                        </h1>
                        <div className="part-wrap">
                            <div className="text-card">
                                <ImgBox src={`${origin}/main/clock.png`}/>
                                <h2>
                                    가까운 유치원을 찾으시나요?
                                </h2>
                                <p>지역 검색을 통해 가까운 유치원을 <br/> 찾아보세요!</p> 
                            </div>
                            <div className="text-card">
                                <ImgBox src={`${origin}/main/bus.png`}/>
                                <h2>
                                    아이 통학이 걱정이신가요?
                                </h2>
                                <p>찾아보시는 유치원의 버스 운영 정보를 <br/> 확인해보세요!</p> 
                            </div>
                            <div className="text-card">
                                <ImgBox src={`${origin}/main/docs-drawer.png`}/>
                                <h2>
                                    유치원의 운영 상태를 <br/> 보고 싶으신가요?
                                </h2>
                                <p>검색한 홈페이지에서 바로 확인해보세요!</p> 
                            </div>
                        </div>
                    </div>
                    <div className="part-b">
                        <h1>모든 유치원 홈페이지의 시작! 유치원 모으미</h1>
                        <div className="part-wrap">
                            <div className="text-box left">
                                <h3>
                                    <CheckIcon/>
                                    홈페이지 제작이 어려우신가요?
                                </h3>
                                <p>템플릿을 선택하며 홈페이지를 제작해보세요</p>
                                <h3>
                                    <CheckIcon/>
                                    홈페이지 관리가 어려우신가요?</h3>
                                <p>원아, 교사, 행정처리 모두 한곳에서 가능합니다.</p>
                                    이젠 모으미와 함께 유치원을 꾸며보세요!
                                <span>* 플랫폼 꾸미기 기능은 교사만 가능합니다.</span>

                                <Link to={'/kinder'} onClick={()=>{
                            window.scrollTo(0,0)
                        }}>내 유치원 가기</Link>
                            </div>
                            <ImgBox src={`${origin}/main/main-2.jpg`} />
                        </div>
                    </div>
                </div>
                </Container>
                    <div className="wave-bg">
                        <div className="part-c">
                                partc
                        </div>
                    </div>
                <Container>
                <div className="notice-box">
                    <div className="title">
                        <h1>공지사항 & FAQ</h1>
                        <h2>모으미의 새로운 소식을 전해드립니다.</h2>
                    </div>
                    <div className="notice">
                        <div className="pick">
                            <h3 className="active">공지사항</h3>
                            <h3>FAQ</h3>
                        </div>
                        <div className="content-box">
                            <div className="content">
                                <h4>공지사항</h4>
                                <p>2024년 1차(4월) 유치원 정보 공시 오픈 안내</p>
                                <span>2024-04-29</span>
                            </div>
                            <div className="content">
                                <h4>공지사항</h4>
                                <p>2023년 유치원알리미 이용자 만족도 조사 당첨자 발표</p>
                                <span>2024-05-22</span>
                            </div>
                            <div className="content">
                                <h4>공지사항</h4>
                                <p>4월 16일 업데이트 안내</p>
                                <span>2024-04-16</span>
                            </div>
                        </div>
                    </div>
                    <div className="update">
                        <div className="pick">
                            <h3>업데이트 안내</h3>
                        </div>
                        <div className="content-box">
                            {updateDatas.length>0 && updateDatas.slice().reverse().map((data, idx)=> {
                                const {title, date, auth} = data
                                return (
                                    <div className="content" key={idx}>
                                        <h4>업데이트</h4>
                                        <p><Link to={`/notice/update/${updateDatas.length - idx}`}>{title}</Link></p>
                                        <span>{date}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Container>
            
        </section>
    )
}

export default MainPage