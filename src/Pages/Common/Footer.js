import React from "react";
import Container from "../../Components/Container";
import './styles/Footer.css'
import ImgBox from "../../Components/ImgBox";

function Footer () {

    return(
        <footer>
            <Container>
                <div className="header">
                    <ul>
                        <li className="w">개인정보처리방침</li>
                        <li className="w">영상정보처리방침</li>
                        <li>이용약관</li>
                        <li>이메일무단수집거부</li>
                        <li>저작권신고</li>
                    </ul>
                </div>
                <div className="body">

                </div>
                <div className="footer">
                    <div>
                        <p>30130 세종특별자치시 나리로 00</p>
                        <p>Email : addrress123@gmail.com</p>
                    </div>
                    <div className="banner">
                        <ImgBox addClass={'banner-box'} src={`${origin}/footer/footer-logo2.png`}/>
                        <ImgBox addClass={'banner-box'} src={`${origin}/footer/footer-logo1.png`}/>
                        <ImgBox addClass={'banner-box'} src={`${origin}/footer/footer-logo6.png`}/>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer