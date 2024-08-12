import React, { useEffect } from 'react'
import { Vex, BarlineType, StaveTie, TextNote, Annotation, Articulation, Volta } from 'vexflow'
import { songScores } from '../../../Datas/musicStudyData'

function MusicSheet() {
    useEffect(() => {
        const vf = new Vex.Flow.Factory({renderer: {elementId : 'output', width: 1240, height: 3000}})
        const score = vf.EasyScore()
        const context = vf.getContext()
        const selectedSong = songScores.find(song => song.title === '네가있어행복해')
        const {blocks, clef, key, time} = selectedSong
        let currentX = 20
        let currentY = 0

        let isFirstLowNote = false 
        
        // 타이
        let ties = []
        let prevNotes = []
        let prevTieStart
        let prevLowNotes = []
        let prevLowTieStart

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

            // 음표
            const notesString = block.notes.map(note => note).join(', ')
            const notes = score.notes(notesString, {stem: 'auto'})

            const lowNotesString = block.lowNotes ? block.lowNotes.map(note => note).join(', ') : ''

            const lowNotes = lowNotesString ? score.notes(lowNotesString, {stem: 'auto'}) : null

            const defaultSystem = system.addStave({ voices: [vf.Voice().addTickables(notes)], options : {bottom_text_position : -50} })
            let multipleLowSystem = null
            if(block.lowNotes){
                multipleLowSystem = system.addStave({ voices : [vf.Voice().addTickables(lowNotes)], options :{bottom_text_position: 30} })
                if(block.isFirst) system.addConnector()
            }

            if (block.isFirst) {
                defaultSystem.addClef(clef).addKeySignature(key)
                if (idx === 0) {
                    defaultSystem.addTimeSignature(time)
                }

                if(multipleLowSystem){
                    multipleLowSystem.addClef(clef).addKeySignature(key)
                    if (idx === 0) multipleLowSystem.addTimeSignature(time)
                }
            }

            // 도돌이표 시작 처리
            if (block.isRepeatStart) {
                defaultSystem.setBegBarType(BarlineType.REPEAT_BEGIN);
                if (multipleLowSystem) {
                    multipleLowSystem.setBegBarType(BarlineType.REPEAT_BEGIN);
                }
            }
            
            // 도돌이표 끝 처리
            if (block.isRepeatEnd) {
                defaultSystem.setEndBarType(BarlineType.REPEAT_END);
                if(multipleLowSystem){
                    multipleLowSystem.setEndBarType(BarlineType.REPEAT_END);
                }
            }

            

            block.lyrics.forEach((lyric, idx) => {
                const inner = new Annotation(lyric)
                    .setFont('Arial', 12, '')
                    .setVerticalJustification(Annotation.VerticalJustify.BOTTOM)
                notes[idx].addModifier(inner)
            })

            if(block.lowLyrics){
                block.lowLyrics.forEach((lyric, idx) => {
                    const inner = new Annotation(lyric)
                        .setFont('Arial', 12, '')
                        .setVerticalJustification(Annotation.VerticalJustify.BOTTOM)
                        .setYShift({y : 150})
                    lowNotes[idx].addModifier(inner)
                })
            }

            // 스타카토
            if(block.staccatoIndexes){
                block.staccatoIndexes.forEach(idx => {
                    notes[idx].addModifier(new Articulation('a.').setPosition(3))
                })
            }
            if(block.lowStaccatoIndexes){
                block.lowStaccatoIndexes.forEach(idx => {
                    lowNotes[idx].addModifier(new Articulation('a.').setPosition(3))
                })
            }

            if(block.breathMarkIndexes){
                block.breathMarkIndexes.forEach(idx => {
                    notes[idx].addModifier(new Articulation('a,').setPosition(3))
                })
            }
            if(block.lowBreathMarkIndexes){
                block.lowBreathMarkIndexes.forEach(idx => {
                    lowNotes[idx].addModifier(new Articulation('a,').setPosition(3))
                    
                })
            }

            vf.draw()

            // 볼타
            if (block.turnNum) {
                defaultSystem.setVoltaType(Volta.type.BEGIN, block.turnNum, 30)
                .draw()
                if(multipleLowSystem){
                    multipleLowSystem.setVoltaType(Vex.Flow.Volta.type.BEGIN, block.turnNum, 30)
                    .draw()
                }
            }
            
            // 타이
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
            ties.forEach((t) => {
                t.setContext(context).draw()
            })
        })

    }, [])

    return (
        <>
            <div id='output'></div>
        </>
    )
}

export default MusicSheet
