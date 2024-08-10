import React, { useEffect } from 'react'
import { Vex, StaveHairpin, Dot, StaveTie, Accidental, Formatter } from 'vexflow'
import { songScores } from '../../../Datas/musicStudyData'

function MusicSheet() {

    useEffect(() => {
        console.dir(Vex)
        const vf = new Vex.Flow.Factory({renderer: {elementId : 'output', width: 1200, height: 1000}})

        const context = vf.getContext()
        context.setFont('Bravura', 'Academico')
        const selectedSong = songScores.find(song => song.title === '네가있어행복해')
        const {blocks, clef, key, time} = selectedSong
        let currentX = 0
        let currentY = 0
        let ties = []

        blocks.forEach((block, idx) => {
            // 새로운 줄 시작 여부 확인
            if (block.isFirst) {
                currentX = 0; // X 좌표를 리셋하여 새로운 줄로 시작
                currentY += 150
            }

            const system = vf.System({ autoWidth:true, x:currentX, y : currentY })
            
            currentX += block.width

            const notes = block.notes.map(note => {
                let currentNote = vf.StaveNote({
                    keys : note.keys,
                    duration : note.duration,
                    auto_stem: true,
                })
                if(note.isRepeat){
                    currentNote = vf.RepeatNote({
                        keys : note.keys,
                        duration : note.duration,
                        auto_stem: true,
                    })
                }
                
                if(note.accident){
                    currentNote = currentNote
                    .addModifier(new Accidental(note.accident))
                }
                
                if(note.duration.includes('d')){
                    let prev = currentNote
                    currentNote = dotted(
                        prev, 0
                    )

                }

                return currentNote
            })

            const voice = vf.Voice(notes, ).addTickables(notes)

            let defaultSystem = system.addStave({voices: [voice]})

            if (block.isFirst) {
                defaultSystem
                .addClef(clef)
                .addKeySignature(key)
                if(idx === 0){
                    defaultSystem
                    .addTimeSignature(time)
                }
            }
            vf.draw()

        // 타이 인덱스에 기반한 타이 생성
            if (block.tieIndexes) {
                block.tieIndexes.forEach(({ start, end }) => {
                    const tie = new StaveTie({
                        first_note: notes[start],
                        last_note: notes[end],
                        first_indices: [0],
                        last_indices: [0]
                    })
                    ties.push(tie)
                })
            }
        })
        // 생성된 타이 그리기
        ties.forEach((t) => {
            t.setContext(context).draw()
        })

        function dotted(staveNote, noteIndex = -1) {
             
            if (noteIndex < 0) {
                Dot.buildAndAttach([staveNote], {
                    all: true
                })
            } else {
                Dot.buildAndAttach([staveNote], {
                    index: noteIndex,
                })
            }
            return staveNote
        }

    }, [])

    return (
        <>
            <div id='output'></div>
        </>
    )
}

export default MusicSheet
