import React, { useEffect, useRef, useState } from 'react'
import Soundfont from 'soundfont-player'
import AudioContext from 'audio-context'
import classNames from 'classnames'
import { notes, defaultShorcut } from '../../../Datas/MusicData'

const PianoPlayer = ({isChangeMode}) => {
  const audioContext = useRef(null)
  const player = useRef(null)
  const activeNotes = useRef({})
  const [pressedKeys, setPressedKeys] = useState([])
  const [mouseDown, setMouseDown] = useState(false)
  const [activeButtons, setActiveButtons] = useState([])
  const [shortcut, setShorcut] = useState(defaultShorcut)

  useEffect(() => {
    audioContext.current = AudioContext()
    Soundfont.instrument(audioContext.current, 'acoustic_grand_piano').then((piano) => {
      player.current = piano
    })

  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!pressedKeys.includes(e.key.toUpperCase())) {
        setPressedKeys(prev => ([...prev, e.key.toUpperCase()]))
      }
    }

    const handleKeyUp = (e) => {
      if(e.key.toUpperCase()==='ESCAPE'){
        return setPressedKeys([])
      }
      setPressedKeys(prev => prev.filter(key => key !== e.key.toUpperCase()))
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

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
      const noteObject = player.current.play(note)
      activeNotes.current[note] = noteObject
      setActiveButtons(prev => [...prev, note])
    }
  }

  const stopNote = (note) => {
    if (activeNotes.current[note]) {
      activeNotes.current[note].stop()
      delete activeNotes.current[note]
      setActiveButtons(prev => prev.filter(activeNote => activeNote !== note))
    }
  }

  const changeShortcut = (e, note) => {
    if(e.key.toUpperCase() === 'ESCAPE'){
      return setShorcut({...shortcut, [note] : ''})
    }
    console.log(e.key)
    if(e.key.toUpperCase() === ' '){
      return alert('스페이스 바는 악보를 넘길 때 사용됩니다.')
    }
    setShorcut({...shortcut, [note] : e.key.toUpperCase()})
  }

  return (
    <div className="notes">
      {notes.map((note, idx) => (
        <button key={idx}
          className={classNames({ sharp: note.includes('#'), active: activeButtons.includes(note) })}
          onClick={() => {
            if (isChangeMode) {
              window.addEventListener('keydown', (e) => changeShortcut(e, note), { once: true });
            }
          }}
          onMouseDown={() => {
            setMouseDown(true)
            playNote(note)
          }}
          onMouseEnter={() => mouseDown && playNote(note)}
          onMouseLeave={() => {
            mouseDown &&
            stopNote(note)
          }}
            
          onMouseUp={() => {
            console.log('뗐음')
            stopNote(note)
            setMouseDown(false)
          }}>
          {shortcut[note]}
        </button>
      ))}
    </div>
  )
}

export default PianoPlayer
