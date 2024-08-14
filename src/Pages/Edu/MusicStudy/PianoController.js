import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { endSelectedNoteAtom, isChangeModeAtom, isScrollModeAtom, pianoVolumeAtom, scoresAtom, selectedInstrumentAtom, startSelectedNoteAtom } from "../../../Recoil/CommonAtom";
import classNames from "classnames";
import { notes, scoreTitles, allInstruments } from "../../../Datas/musicStudyData";
import SelectOption from "../../../Custom/SelectOption";
import Container from "../../../Components/Container";

function PianoController () {

    const [scores, setScores] = useRecoilState(scoresAtom)
    const [isScrollMode, setIsScrollMode] = useRecoilState(isScrollModeAtom)
    
    useEffect(() => { // 악보 스크롤 모드
        if (isScrollMode) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto' 
        }
    }, [isScrollMode])

    // 단축키 변경 모드
    const [isChangeMode ,setIsChangeMode] = useRecoilState(isChangeModeAtom)
    const changeShortcut = () => {
        setIsChangeMode(prev => !prev)
    }

    const [volume, setVolume] = useRecoilState(pianoVolumeAtom)
    const [startSelectedNote, setStartSelectedNote] = useRecoilState(startSelectedNoteAtom)
    const [endSelectedNote, setEndSelectedNote] = useRecoilState(endSelectedNoteAtom)
    const [selectedInstrument, setSelectedInstrument] = useRecoilState(selectedInstrumentAtom)

    useEffect(()=>{ // 마지막노트는 첫 노트보다 작을 수 없다.
        let a = notes.indexOf(startSelectedNote)
        let b = notes.indexOf(endSelectedNote)
        if(a > b){
            setEndSelectedNote(notes[a])
        }
    },[startSelectedNote])

    return(
        <Container>
        <div className="piano-controller">
            <div className='control-volume'>
            <h4>볼륨</h4>
            <input type="range" min="0" max="1" step="0.01" 
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))} 
            className="volume-slider"
            />
            </div>
            <div>
                <h4>키보드</h4>
                <div className="note-selector">
                    <SelectOption list={notes.filter(note => !note.includes('#'))} selectedItem={startSelectedNote} setSelectedItem={setStartSelectedNote}/>
                    ~
                    <SelectOption list={notes.slice(notes.indexOf(startSelectedNote) + 1).filter(note => !note.includes('#'))} selectedItem={endSelectedNote} setSelectedItem={setEndSelectedNote}/>
                </div>
            </div>
            <div>
                <h4>악보</h4>
                <SelectOption list={scoreTitles} selectedItem={scores} setSelectedItem={setScores}/>
            </div>
            <div>
                <h4>악기</h4>
                <SelectOption list={allInstruments} selectedItem={selectedInstrument} setSelectedItem={setSelectedInstrument}/>
            </div>
            <div className="btn-box">
                <button
                title="화면 스크롤을 고정시켜 악보를 움직일 수 있습니다."
                className={classNames('scroll-fix', {on : isScrollMode})} 
                onClick={()=>setIsScrollMode(prev => !prev)}>{!isScrollMode ? '화면' : '악보'} 스크롤
                    <span></span>
                </button>
                <button 
                title={isChangeMode ? '켜짐' : '꺼짐'}
                className={classNames('shortcut', {on : isChangeMode})} onClick={changeShortcut}>단축키 변경
                    <span></span>
                </button>
            </div>
        </div>
        </Container>
    )
}
export default PianoController