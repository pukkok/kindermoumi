import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { isChangeModeAtom, isScrollModeAtom, pianoVolumeAtom, scoresAtom } from "../../../Recoil/CommonAtom";
import classNames from "classnames";
import { scoreTitles } from "../../../Datas/musicData";

function PianoController () {

    const [scores, setScores] = useRecoilState(scoresAtom)
    const [titles, setTitles] = useState([])
    const [isScrollMode, setIsScrollMode] = useRecoilState(isScrollModeAtom)

    useEffect(()=>{ // 악보 여러장인 것 줄이기
        let arr = []
        scoreTitles.forEach(score => {
            let title = score.split('-')[0]
            if(!arr.includes(title)) arr.push(title)
        })

        setTitles([...arr])
    },[])

    
    
    useEffect(() => {
        if (isScrollMode) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto' // Cleanup when component unmounts
        }
    }, [isScrollMode])

    const [isChangeMode ,setIsChangeMode] = useRecoilState(isChangeModeAtom)

    const changeShortcut = () => {
        setIsChangeMode(prev => !prev)
    }

    const [volume, setVolume] = useRecoilState(pianoVolumeAtom)

    const selectScore = (title) => {
        setScores([
            ...scoreTitles.filter(scoreTitle => scoreTitle.includes(title))
        ])
    }

    return(
        <div className="piano-controller">
            <div className='control-volume'>
            <p>볼륨</p>
            <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))} 
            className="volume-slider"
            />
            </div>
            <div>
                키보드 조절
            </div>
            <div>
                악보선택
                <ul>
                    {titles.length>0 && titles.map((title, idx) => {
                        return <li key={idx}
                        onClick={()=>selectScore(title)}
                        >{title}</li>
                    })}
                </ul>
                <p></p>
            </div>
            <div>
                악기선택
            </div>
            <div className="btn-box">
                <button
                className={classNames('scroll-fix', {on : isScrollMode})} 
                onClick={()=>setIsScrollMode(prev => !prev)}>{!isScrollMode ? '화면' : '악보'} 스크롤
                    <span></span>
                </button>
                <button className={classNames('shortcut', {on : isChangeMode})} onClick={changeShortcut}>단축키 변경
                    <span title={isChangeMode ? '켜짐' : '꺼짐'}></span>
                </button>
            </div>
        </div>
    )
}
export default PianoController