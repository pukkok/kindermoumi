import React from "react";
import ImgBox from "../../Components/ImgBox";
import './styles/MainBg.css'

function MainBg ({children}) {
    return(
        <div className="main-bg">
            <div className="content">
                {children}
            </div>
            <div className="bg1 bg-item">
                <div className="list">
                    <ImgBox addClass={'img4 img-box'} src={`${origin}/main/visual-bg4.png`}/>
                    <ImgBox addClass={'img5 img-box'} src={`${origin}/main/visual-bg5.png`}/>
                    <ImgBox addClass={'img6 img-box'} src={`${origin}/main/visual-bg6.png`}/>
                    <ImgBox addClass={'img7 img-box'} src={`${origin}/main/visual-bg7.png`}/>
                    <ImgBox addClass={'img8 img-box'} src={`${origin}/main/visual-bg8.png`}/>
                    <ImgBox addClass={'img9 img-box'} src={`${origin}/main/visual-bg9.png`}/>
                    <ImgBox addClass={'img10 img-box'} src={`${origin}/main/chase.png`}/>
                    <ImgBox addClass={'img1 img-box'} src={`${origin}/main/text-cloud.png`}/>
                </div>
            </div>
            <div className="bg2 bg-item">
                <div className="list">
                    <ImgBox addClass={'img2 img-box'} src={`${origin}/main/visual-bg2.png`}/>
                    <ImgBox addClass={'img3 img-box'} src={`${origin}/main/visual-bg3.png`}/>
                    <ImgBox addClass={'img11 img-box'} src={`${origin}/main/visual-bg11.png`}/>
                    <ImgBox addClass={'img12 img-box'} src={`${origin}/main/visual-bg11.png`}/>
                </div>
            </div>
            <div className="character">
            </div>
        </div>
    )
}

export default MainBg