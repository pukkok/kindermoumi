import React from "react"
import './styles/PhotoBoxType.css'
import ImgBox from '../../../Components/ImgBox'

const PhotoBox1 = () => {
    return(
        <section className="photo-box-type">
            <div className="type1">
                <h1>포토 갤러리 <span><img src={`${origin}/platform/0007_btn_more03.png`}/></span></h1>
                <div className="photo">
                    <ImgBox src={`${origin}/tester/photogalary-tester.png`}/>
                    <div className="text-box">
                        <p>5월 어린이날 행사(예시)</p>
                        <p>2024-05-05</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

const PhotoBox2 = () => {
    return(
        <section className="photo-box-type">
            <div className="type2">
                <h1>포토갤러리</h1>
                <div className="double-img">
                    <div>
                        <ImgBox src={`${origin}/tester/photogalary-tester.png`}/>
                        <p>5월 어린이날 행사(예시)</p>
                    </div>
                    <div>
                        <ImgBox src={`${origin}/tester/photogalary-tester.png`}/>
                        <p>5월 어린이날 행사(예시)</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export {PhotoBox1, PhotoBox2}