import React, { useEffect, useRef } from "react";
import './styles/MusicPage.css'
import PianoPlayer from "./PianoPlayer";
import { useRecoilState, useRecoilValue } from "recoil";
import { isScrollModeAtom, scoresAtom } from "../../../Recoil/CommonAtom";
import ScoreMaker from "./ScoreMaker";

function MusicPage() {

    const scores = useRecoilValue(scoresAtom)
    const [isScrollMode, setIsScrollMode] = useRecoilState(isScrollModeAtom)
    const scoreSelectRef = useRef(null)
    const noneSelectRef = useRef(null)
    
    useEffect(() => {
        if (isScrollMode && scoreSelectRef.current) {
            scoreSelectRef.current.focus()  // isScrollMode가 true일 때 score div에 포커스를 설정
        }else{
            noneSelectRef.current.focus()
        }

        const handleBlur = () => {
            if (document.activeElement !== scoreSelectRef.current) {
                setIsScrollMode(false)
            }
        }

        const scoreElement = scoreSelectRef.current
        if (!isScrollMode && scoreElement) {
            scoreElement.addEventListener('blur', handleBlur)
        }

    }, [isScrollMode])

    // useEffect(() => {
        

    //     return () => {
    //         if (scoreElement) {
    //             scoreElement.removeEventListener('blur', handleBlur)
    //         }
    //     }
    // }, [])

    useEffect(()=>{
        scoreSelectRef.current.scrollTo(0,0)
    },[scores])

    return(
        <section className="edu-music" 
        ref={noneSelectRef} tabIndex={!isScrollMode ? 0 : -1}>

        <div className="score-container" 
        ref={scoreSelectRef} tabIndex={isScrollMode ? 0 : -1}>
            <div className="score" >
                <ScoreMaker/>
            </div>
        </div>
            <PianoPlayer/>
        </section>
    )
}
export default MusicPage