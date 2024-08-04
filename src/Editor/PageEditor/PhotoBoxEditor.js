import React from "react";
import { PhotoBox2 } from "../TemplateBox/PhotoBox";
import ImgBox from "../../Components/ImgBox";

function PhotoBoxEditor({contentType, setContentType}) {

    const sendEventDateType = (idx) => {
        setContentType({...contentType, ['photoBox']: idx})
    }

    return (
        <section className="photobox-edit">
            <div className="photo-box">
                <div className="summary">
                    <h2>포토박스</h2>
                    <p>사진 업로드 및 슬라이드 기능을 제공합니다.</p>
                    <span>*권한을 부여하여 비회원은 사용이 불가능하게 할 수 있습니다.</span>
                </div>
                <div className="remote-btns">
                    <p>타입</p><span></span>
                    <button >저장</button>
                    <button >초기화</button>
                </div>
                <div className="select-type mb">
                    <div className="type-box">
                        <h1>타입1 <button onClick={()=>sendEventDateType(1)}>선택</button></h1>
                        <ImgBox src={`${origin}/platform/photobox-type1.png`}/>
                    </div>
                    <div className="type-box">
                        <h1>타입2 <button onClick={()=>sendEventDateType(2)}>선택</button></h1>
                        <PhotoBox2/>
                    </div>
                </div>
                
            </div>
        </section>
    )

}
export default PhotoBoxEditor