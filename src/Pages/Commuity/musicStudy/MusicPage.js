import React, { useEffect } from "react";

function MusicPage() {

    const audios = Array(13).fill(0).map((_, idx) => {
        let textNum = idx+1
        if(idx+1 < 10){
            textNum = `0${idx+1}`
        }
        return new Audio(`${origin}/piano/FX_piano${textNum}.mp3`)
    })

    useEffect(() => {
        const handleKeyDown = (e) => {
            if(e.key === 'q'){
                new Audio(`${origin}/piano/FX_piano01.mp3`).play()
            }
            if(e.key === '2'){
                new Audio(`${origin}/piano/FX_piano02.mp3`).play()
            }
            if(e.key === 'w'){
                new Audio(`${origin}/piano/FX_piano03.mp3`).play()
            }
            if(e.key === '3'){
                new Audio(`${origin}/piano/FX_piano04.mp3`).play()
            }
            if(e.key === 'e'){
                new Audio(`${origin}/piano/FX_piano05.mp3`).play()
            }
            if(e.key === 'r'){
                new Audio(`${origin}/piano/FX_piano06.mp3`).play()
            }
            if(e.key === '4'){
                new Audio(`${origin}/piano/FX_piano07.mp3`).play()
            }
            if(e.key === 't'){
                new Audio(`${origin}/piano/FX_piano08.mp3`).play()
            }
            if(e.key === '5'){
                new Audio(`${origin}/piano/FX_piano09.mp3`).play()
            }
            if(e.key === 'y'){
                new Audio(`${origin}/piano/FX_piano10.mp3`).play()
            }
            if(e.key === '6'){
                new Audio(`${origin}/piano/FX_piano11.mp3`).play()
            }
            if(e.key === 'u'){
                new Audio(`${origin}/piano/FX_piano12.mp3`).play()
            }
            if(e.key === 'i'){
                new Audio(`${origin}/piano/FX_piano13.mp3`).play()
            }
            
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return(
        <>
        음악페이지 입니다.
        <button>도</button>
        <button>레</button>
        <button>미</button>
        <button>파</button>
        </>
    )
}
export default MusicPage