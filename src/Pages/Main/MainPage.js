import React from "react";
import './styles/MainPage.css'
import ImgBox from "../../Components/ImgBox";
import Container from "../../Components/Container";
import { Link } from "react-router-dom";
import MainBg from "./MainBg";

function MainPage () {

    return(
        <section className="main-page">
            <MainBg>
                <div className="main-text">
                    <h1>
                        어려운 유치원 관리를 위한 첫걸음 <br/>
                        <span>지금, 유치원 모으미에서</span>
                    </h1>
                    <h4></h4>
                </div>
                <div className="main-chart">
                    <div>
                        <h1>2000+</h1>
                        <p>누적 방문자</p>
                    </div>
                    <div>
                        <h1>1000+</h1>
                        <p>누적 가입자</p>
                    </div>
                    <div>
                        <h1>50k</h1>
                        <p>구독자</p>
                    </div>
                    <div>
                        <h1>30+</h1>
                        <p>파트너</p>
                    </div>
                </div>
            </MainBg>
            <Container>
                <div className="content-go">
                    <div className="main-go">
                        <ImgBox src={`${origin}/main/main-1.jpg`} />
                        <div className="text-box">
                            <h2>우리동네 유치원은 어디있을까?</h2>
                            <p>새로운 친구를 만나는 유치원 <br/>
                                우리아이는 어디로 보내야 할까?
                            </p>
                            <Link to={'/search'} onClick={()=>{
                                window.scrollTo(0,0)
                            }}>유치원 찾아보기</Link>
                        </div>
                    </div>
                    <div className="main-go">
                        <div className="text-box">
                            <h2>모든 유치원이 여기에</h2>
                            <p>꾸미기 어려운 유치원 홈페이지 <br/>
                                관리되지 않는 유치원 홈페이지 <br/>
                                이젠 모으미와 함께 유치원을 꾸며보세요!
                            </p>
                            <span>* 플랫폼 꾸미기 기능은 교사만 가능합니다.</span>
                            <Link to={'/kinder'} onClick={()=>{
                                window.scrollTo(0,0)
                            }}>내 유치원 가기</Link>
                        </div>
                        <ImgBox src={`${origin}/main/main-2.jpg`} />
                    </div>
                </div>
                <div className="notice-box">
                    <div className="title">
                        <h1>공지사항 & QNA</h1>
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
                            <div className="content">
                                <h4>업데이트</h4>
                                <p>5월 30일 업데이트 안내</p>
                                <span>2024-05-30</span>
                            </div>
                            <div className="content">
                                <h4>업데이트</h4>
                                <p>5월 22일 업데이트 안내</p>
                                <span>2024-05-22</span>
                            </div>
                            <div className="content">
                                <h4>업데이트</h4>
                                <p>4월 16일 업데이트 안내</p>
                                <span>2024-04-16</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            
        </section>
    )
}

export default MainPage