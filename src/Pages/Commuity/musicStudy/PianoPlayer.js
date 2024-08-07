import React, { useEffect, useRef, useState } from 'react'
import Soundfont from 'soundfont-player'
import AudioContext from 'audio-context'
import classNames from 'classnames'
import { notes } from '../../../Datas/MusicData'

const PianoPlayer = () => {
  const audioContext = useRef(null)
  const player = useRef(null)
  const activeNotes = useRef({})
  const [pressedKeys, setPressedKeys] = useState([])
  const [mouseDown, setMouseDown] = useState(false)
  const [activeButtons, setActiveButtons] = useState([])

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
      setPressedKeys(prev => prev.filter(key => key !== e.key.toUpperCase()))
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [pressedKeys])

  useEffect(() => {
    notes.forEach(key => {
      let shortcut = shortCut(key)
      if (shortcut) {
        if (pressedKeys.includes(shortcut)) {
          keyBoardShortcut(shortcut, 'play')
        } else {
          keyBoardShortcut(shortcut, 'stop')
        }
      }
    })
  }, [pressedKeys])

  const keyBoardShortcut = (key, work) => {
    let func
    work === 'play' ? func = playNote : func = stopNote

    switch (key.toUpperCase()) {
      case 'A': func('C3'); break
      case 'S': func('D3'); break
      case 'D': func('E3'); break
      case 'F': func('F3'); break
      case 'G': func('G3'); break
      case 'H': func('A3'); break
      case 'J': func('B3'); break
      case 'K': func('C4'); break
      default: break
    }
  }

  const shortCut = (word) => {
    let short = ''
    switch (word) {
      case 'C3': short = 'A'; break
      case 'D3': short = 'S'; break
      case 'E3': short = 'D'; break
      case 'F3': short = 'F'; break
      case 'G3': short = 'G'; break
      case 'A3': short = 'H'; break
      case 'B3': short = 'J'; break
      case 'C4': short = 'K'; break
      default: break
    }
    return short
  }

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

  return (
    <div className="notes">
      {notes.map((note, idx) => (
        <button key={idx}
          className={classNames({ sharp: note.includes('#'), active: activeButtons.includes(note) })}
          onMouseDown={() => {
            setMouseDown(true)
            playNote(note)
          }}
          onMouseEnter={() => mouseDown && playNote(note)}
          onMouseLeave={() => stopNote(note)}
          onMouseUp={() => {
            stopNote(note)
            setMouseDown(false)
          }}>
          {note.includes('#') ? '' : shortCut(note)}
        </button>
      ))}
    </div>
  )
}

export default PianoPlayer
