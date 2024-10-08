import React, { useEffect, useRef } from 'react'
import { Vex, BarlineType, StaveTie, Voice, Annotation, Articulation, Volta, StaveModifier } from 'vexflow'
import { songScores } from '../../../Datas/musicStudyData'
import { useRecoilValue } from 'recoil'
import { scoresAtom } from '../../../Recoil/CommonAtom'

function MusicSheet() {
    const scores = useRecoilValue(scoresAtom)
    const scoreRef = useRef(null)
    useEffect(() => {
        scoreRef.current.innerHTML = ''
        const selectedSong = songScores.find(song => song.title === scores)
        // const selectedSong = songScores.find(song => song.title === '나무의노래')
        if(!selectedSong) return console.log('등록된 악보 없음')

        const {blocks, clef, key, time} = selectedSong
        let fullHeight = 0
        blocks.forEach(block => {
            if(block.isFirstLine){
                fullHeight += 160
            }
            if(block.lowNotes && block.isFirstLine){
                fullHeight += 150
            }
        })

        const vf = new Vex.Flow.Factory({renderer: {elementId : scoreRef.current, width: 1240, height: fullHeight}})
        const score = vf.EasyScore()
        const context = vf.getContext()
        let currentX = 20
        let currentY = 0

        let isFirstLowNote = false 
        
        // 타이
        let ties = []
        let prevNotes = []
        let prevTieStart
        let prevLowNotes = []
        let prevLowTieStart

        let beam

        blocks.forEach((block, idx) => {
            if (block.isFirstLine && idx !== 0) {
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

            const defaultSystem = system.addStave({ 
                voices: [ vf.Voice().setMode(2).addTickables(notes) ]})
            let multipleLowSystem = null
            if(block.lowNotes){
                multipleLowSystem = system.addStave({ voices : [vf.Voice().addTickables(lowNotes)], options :{bottom_text_position: 30} })
                if(block.isFirstLine) system.addConnector()
            }

            if (block.isFirstLine) {
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
                defaultSystem.setEndBarType(BarlineType.REPEAT_END)
                if(multipleLowSystem){
                    multipleLowSystem.setEndBarType(BarlineType.REPEAT_END);
                }
            }

            // 음악 끝
            if (block.isEnd) {
                defaultSystem.setEndBarType(BarlineType.END)
                if(multipleLowSystem){
                    multipleLowSystem.setEndBarType(BarlineType.END)
                }
            }

            // 가사 제작
            function lyricsMaker(arr, notes) {
                arr.forEach((lyric, idx) => {
                    const inner = new Annotation(lyric)
                        .setFont('Arial', 12, '')
                        .setVerticalJustification(Annotation.VerticalJustify.BOTTOM)
                    notes[idx].addModifier(inner)
                })
            }            
            if(block.lyrics){
                lyricsMaker(block.lyrics.split(''), notes)
            }
            if(block.lowLyrics){
                lyricsMaker(block.lowLyrics.split(''), lowNotes)
            }

            // 스타카토
            function staccatoMaker(arr, notes) {
                arr.forEach(idx => {
                    const articulation = new Articulation('a.');
                    // 스템의 방향에 따라 위치를 결정
                    if (notes[idx].getStemDirection() === Vex.Flow.Stem.UP) {
                        articulation.setPosition(Vex.Flow.Modifier.Position.BELOW);
                    } else {
                        articulation.setPosition(Vex.Flow.Modifier.Position.ABOVE);
                    }
                    notes[idx].addModifier(articulation);
                })
            }
            if(block.staccatoIndexes){
                staccatoMaker(block.staccatoIndexes, notes)
            }
            if(block.lowStaccatoIndexes){
                staccatoMaker(block.lowStaccatoIndexes, lowNotes)
            }
            

            // 숨표 파트
            if (block.breathMarkIndexes) {
                block.breathMarkIndexes.forEach(idx => {
                    const note = notes[idx]
                    const a =  new StaveModifier()
                    note.addModifier(new Articulation('a,').setPosition(3))
                    .setCenterXShift(2)
                })
            }

            if(block.beamIndexes){
                block.beamIndexes.forEach(({start, end}) => {
                    const notesForBeam = notes.slice(start, end + 1)
                    notesForBeam.forEach(note => {
                        note.setStemDirection(null)  // 음표의 꼬리 제거
                    })
                    beam = new Vex.Flow.Beam(notesForBeam)    
                })
                vf.draw()
                beam.setContext(context).draw()
            }else{
                vf.draw()
            }
            

            if(block.lowBreathMarkIndexes){
                block.lowBreathMarkIndexes.forEach(idx => {
                    lowNotes[idx].addModifier(new Articulation('a,').setPosition(3))
                })
            }

            // 볼타 : 도돌이표 상단 표시
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
                        if(block.tieDirection){
                            block.tieDirection.forEach((d, idx)=> {
                                const tie = new StaveTie({
                                    first_note: check === 1 ? prevNotes[prevTieStart] : prevLowNotes[prevLowTieStart],
                                    last_note: currentNotes[end],
                                    first_indices: [idx],
                                    last_indices: [idx]
                                })
                                tie.setDirection(d)
                                ties.push(tie)
                            })
                        }else{
                            const tie = new StaveTie({
                                first_note: check === 1 ? prevNotes[prevTieStart] : prevLowNotes[prevLowTieStart],
                                last_note: currentNotes[end],
                                first_indices: [0],
                                last_indices: [0]
                            })
                            ties.push(tie)
                        }
                        
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

    }, [scores])

    return (
        <>
            <div id='output' ref={scoreRef}></div>
        </>
    )
}

export default MusicSheet
