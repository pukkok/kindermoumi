import React, { useEffect } from 'react'
import { Vex, StaveHairpin, Dot, StaveTie, Accidental, Articulation, Annotation, BarlineType } from 'vexflow'
import { songScores } from '../../../Datas/musicStudyData'

function MusicSheet() {

    useEffect(() => {
        const vf = new Vex.Flow.Factory({renderer: {elementId : 'output', width: 1240, height: 3000}})
        const score = vf.EasyScore()
        const context = vf.getContext()
        context.setFont('Bravura', 'Academico')
        const selectedSong = songScores.find(song => song.title === '네가있어행복해')
        const {blocks, clef, key, time} = selectedSong
        let currentX = 20
        let currentY = 0
        let ties = []
        let lowNotes = []
        let prevNotes = []
        let prevTieStart
        let prevLowNotes = []
        let prevLowTieStart
        let isFirstLowNote = false
        

        blocks.forEach((block, idx) => {
            if (block.isFirst && idx !== 0) {
                currentX = 20
                currentY += 160
                if(isFirstLowNote){
                    currentY += 150
                }

                if(block.lowNotes){
                    isFirstLowNote = true
                }
            }
            
            const system = vf.System({ width: block.width, x: currentX, y: currentY })
            currentX += block.width

            const notes = block.notes.map(note => {
                let currentNote = vf.StaveNote({
                    keys: note.keys,
                    duration: note.duration,
                    auto_stem: true,
                })

                if (note.staccato) { // 스타카토 수정하기
                    const staccato = new Articulation('a.')
                        .setPosition(3)
                    currentNote.addModifier(staccato)  // 스타카토를 음표 위에 추가
                }

                if (note.breathMark) { // 숨표
                    const breathMark = new Articulation("a,")
                        .setPosition(3)
                        .setXShift(20) // X 좌표를 20으로 조정
                        .setYShift(-10) // Y 좌표를 -10으로 조정
                    currentNote.addModifier(breathMark)
                }

                if (note.accident) {
                    const accident = new Accidental(note.accident)
                    currentNote.addModifier(accident)
                }

                if (note.duration.includes('d')) {
                    const dot = new Dot().setXShift(-5)
                    currentNote.addModifier(dot, 0)
                }

                if (note.lyrics) {
                    note.lyrics.forEach((l) => {
                        const lyric = new Annotation(l)
                            .setFont("Arial", 12, "")
                            .setVerticalJustification(Annotation.VerticalJustify.BOTTOM)
                        currentNote.addModifier(lyric)
                    })
                }

                return currentNote
            })

            if(block.lowNotes){
                lowNotes = block.lowNotes.map(note => {
                    let currentNote = vf.StaveNote({
                        keys: note.keys,
                        duration: note.duration,
                        auto_stem: true,
                    })

                    if (note.staccato) { // 스타카토 수정하기
                        // 위 : 3, 아래 : 4
                        currentNote = currentNote.addModifier(new Articulation("a.").setPosition(3))
                    }
    
                    if (note.accident) {
                        currentNote = currentNote.addModifier(new Accidental(note.accident))
                    }
    
                    if (note.duration.includes('d')) {
                        Dot.buildAndAttach([currentNote], { index: 0, right_shift: -5 })
                    }
    
                    if (note.lyrics) {
                        note.lyrics.forEach((lyric) => {
                            currentNote = currentNote.addModifier(
                                new Annotation(lyric)
                                .setFont("Arial", 12, "")
                                .setVerticalJustification(Annotation.VerticalJustify.BOTTOM)
                            )
                        })
                    }
    
                    return currentNote
                })
            }
            
            const defaultSystem = system.addStave({ voices: [vf.Voice().addTickables(notes)] })
            let multipleLowSystem = null
            if(block.lowNotes){
                multipleLowSystem = system.addStave({ voices : [vf.Voice().addTickables(lowNotes)], options: {y_shift : 50} })
                if(block.isFirst) system.addConnector()
            }

            if (block.isFirst) {
                defaultSystem
                .addClef(clef)
                .addKeySignature(key)
                if (idx === 0) {
                    defaultSystem.addTimeSignature(time)
                }

                if(multipleLowSystem){
                    multipleLowSystem
                    .addClef(clef)
                    .addKeySignature(key)
                    if (idx === 0) {
                    multipleLowSystem.addTimeSignature(time)
                }
                }
            }

            // 도돌이표 시작 처리
            if (block.isRepeatStart) {
                defaultSystem.setBegBarType(BarlineType.REPEAT_BEGIN)
            }

            // 도돌이표 끝 처리
            if (block.isRepeatEnd) {
                defaultSystem.setEndBarType(BarlineType.REPEAT_END)
            }
            
            vf.draw()

            function tieMaker (arr, currentNotes, check=1) {
                arr.forEach(({ start, end }) => {
                    if(end === 'next'){
                        if(check === 1){
                            prevNotes = currentNotes
                            prevTieStart = start
                        }
                        if(check === 2){
                            prevLowNotes = currentNotes
                            prevLowTieStart = start
                        }
                    }
                    if (start === 'prev'){
                        const tie = new StaveTie({
                            first_note: check === 1 ? prevNotes[prevTieStart] : prevLowNotes[prevLowTieStart],
                            last_note: currentNotes[end],
                            first_indices: [0],
                            last_indices: [0]
                        })
                        ties.push(tie)
                    } 
                    if (start !=='prev' && end !=='next'){
                        const tie = new StaveTie({
                            first_note: currentNotes[start],
                            last_note: currentNotes[end],
                            first_indices: [0],
                            last_indices: [0]
                        })
                        ties.push(tie)
                    }
                })
            }

            if (block.tieIndexes) {
                tieMaker(block.tieIndexes, notes)
            }

            if (block.lowTieIndexes) {
                tieMaker(block.lowTieIndexes, lowNotes, 2)
            }
        })

        ties.forEach((t) => {
            t.setContext(context).draw()
        })



    }, [])

    return (
        <>
            <div id='output'></div>
        </>
    )
}

export default MusicSheet
