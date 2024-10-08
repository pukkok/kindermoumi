import React, { useEffect, useRef, useState } from 'react'
import Soundfont from 'soundfont-player'
import AudioContext from 'audio-context'
import classNames from 'classnames'
import { notes, defaultShorcut } from "../../../Datas/musicStudyData"
import { useRecoilState, useRecoilValue } from 'recoil'
import { endSelectedNoteAtom, isChangeModeAtom, pianoVolumeAtom, selectedInstrumentAtom, selectedNotesAtom, startSelectedNoteAtom } from '../../../Recoil/CommonAtom'
import PianoController from './PianoController'

const PianoPlayer = () => {
  const isChangeMode = useRecoilValue(isChangeModeAtom)
  const audioContext = useRef(null)
  const gainNode = useRef(null)  // GainNode를 위한 ref 추가
  const player = useRef(null)
  const activeNotes = useRef({})
  const [pressedKeys, setPressedKeys] = useState([])
  const [mouseDown, setMouseDown] = useState(false)
  const [activeButtons, setActiveButtons] = useState([])
  const [shortcut, setShorcut] = useState(defaultShorcut)
  const volume = useRecoilValue(pianoVolumeAtom)  // 기본 볼륨 설정
  const [selectedNotes, setSelectedNotes] = useRecoilState(selectedNotesAtom)
  const startSelectedNote = useRecoilValue(startSelectedNoteAtom)
  const endSelectedNote = useRecoilValue(endSelectedNoteAtom)
  const selectedInstrument = useRecoilValue(selectedInstrumentAtom)

  useEffect(()=>{
    // 노트 만들기
    let isStart = false
    let isEnd = false
    let x = notes.filter(note => {
      if(note === startSelectedNote){ // 처음 음
        isStart = true
      }
      if (isStart && !isEnd) {
        if (note === endSelectedNote) { // 마지막음
          isEnd = true
        }
        return true
      }
      return false
    })
    setSelectedNotes([...x])

  },[startSelectedNote, endSelectedNote])

  useEffect(() => {
    // AudioContext 및 GainNode 생성
    audioContext.current = AudioContext()
    gainNode.current = audioContext.current.createGain()
    gainNode.current.connect(audioContext.current.destination)

    // 초기 볼륨 설정
    gainNode.current.gain.setValueAtTime(volume, audioContext.current.currentTime)

    Soundfont.instrument(audioContext.current, selectedInstrument).then((piano) => {
      player.current = piano
    })
  }, [selectedInstrument])

  useEffect(() => {
    // 볼륨 변경시 GainNode의 gain 값을 업데이트
    if (gainNode.current) {
      gainNode.current.gain.setValueAtTime(volume, audioContext.current.currentTime)
    }
  }, [volume])

  useEffect(() => { // 단축키 클릭시 피아노 소리
    const handleKeyDown = (e) => {
      if (!pressedKeys.includes(e.key.toUpperCase())) {
        setPressedKeys(prev => ([...prev, e.key.toUpperCase()]))
      }
    }

    const handleKeyUp = (e) => {
      setPressedKeys(prev => prev.filter(key => key !== e.key.toUpperCase()))
    }

    window.addEventListener('keydown', handleKeyDown) // 누르는 중
    window.addEventListener('keyup', handleKeyUp) // 그만

    notes.forEach(key => {
      if (shortcut[key]) {
        if (pressedKeys.includes(shortcut[key])) {
          playNote(key)
        } else {
          stopNote(key)
        }
      }
    })

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [pressedKeys, shortcut])

  const playNote = (note) => {
    if (player.current) {
      if(!activeButtons.includes(note)){
        const noteObject = player.current.play(note, audioContext.current.currentTime, { gain: gainNode.current })
        activeNotes.current[note] = noteObject
        setActiveButtons(prev => [...prev, note])
      }
    }
  }

  const stopNote = (note) => {
    if (activeNotes.current[note]) {
      activeNotes.current[note].stop()
      delete activeNotes.current[note]
      setActiveButtons(prev => prev.filter(activeNote => activeNote !== note))
    }
  }

  const changeShortcut = (e, note) => { // 단축키 변경
    setShorcut({...shortcut, [note] : e.key.toUpperCase()})
  }

  return (
    <div className="piano">
        <PianoController/>
        <div className='notes'>
        {selectedNotes.map((note, idx) => (
        <button key={idx}
            className={classNames({ sharp: note.includes('#'), active: activeButtons.includes(note) })}
            onClick={() => {
            if (isChangeMode) {
                window.addEventListener('keydown', (e) => changeShortcut(e, note), { once: true })
            }
            }}
            onMouseDown={() => {
            setMouseDown(true)
            playNote(note)
            }}
            onMouseEnter={() => mouseDown && playNote(note)}
            onMouseLeave={() => {
            mouseDown && stopNote(note)
            }}
            onMouseUp={() => {
            stopNote(note)
            setMouseDown(false)
            }}>
            {shortcut[note]}
        </button>
        ))}
        </div>
    </div>
    )
}

export default PianoPlayer
