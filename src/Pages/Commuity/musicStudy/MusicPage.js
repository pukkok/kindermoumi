import React, { useEffect, useState } from "react";
import './styles/MusicPage.css'
import PianoPlayer from "./PianoPlayer";
import { defaultShorcut } from "../../../Datas/MusicData";

function MusicPage() {

    
    const [isChangeMode, setIsChangeMode] = useState(false)
    const [shortcut, setShorcut] = useState(defaultShorcut)
    
    const changeShortcut = () => {
        setIsChangeMode(true)
    }

    return(
        <>
        음악페이지 입니다.
        <div>
            <button onClick={changeShortcut}>단축키 변경</button>
        </div>
            <PianoPlayer/>
        </>
    )
}
export default MusicPage