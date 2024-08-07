import React, { useEffect, useState } from "react";
import './styles/MusicPage.css'
import PianoPlayer from "./PianoPlayer";
import Container from '../../../Components/Container'
import ImgBox from '../../../Components/ImgBox'

function MusicPage() {

    const [isChangeMode, setIsChangeMode] = useState(false)   
    const [isScrollMode, setIsScrollMode] = useState(false)
    const changeShortcut = () => {
        setIsChangeMode(prev => !prev)
    }

    useEffect(() => {
        if (isScrollMode) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto'; // Cleanup when component unmounts
        };
    }, [isScrollMode]);

    return(
        <section className="edu-music">
            함께 노래불러요
        <Container>
            <div className="score">
            <button onClick={()=>setIsScrollMode(prev => !prev)}>스크롤 {!isScrollMode ? '풀림' : '잠금'}</button>
                <ImgBox src={`${origin}/edu/유선정작사_설재호작곡_네가있어행복해.jpg`}/>
            </div>
        </Container>
        <div className="btn-box">
            <button onClick={changeShortcut}>단축키 변경 {isChangeMode ? '온' : '오프'}</button>
        </div>
            <PianoPlayer isChangeMode={isChangeMode}/>
        </section>
    )
}
export default MusicPage