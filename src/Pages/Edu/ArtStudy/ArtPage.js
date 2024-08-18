import React, { useEffect, useRef, useState, useCallback } from "react"
import './styles/ArtPage.css'

function ArtPage() {
    const canvasRef = useRef(null) // 그림 보드
    const ctx = useRef(null)

    const toolRef = useRef(null) // 
    const toolCtx = useRef(null)

    const [drawTools, setDrawTools] = useState([]) // 그리는 동안 툴
    const [drawings, setDrawings] = useState([]) // 전체 그리기

    // 되돌리기
    const [reDrawings, setReDrawings] = useState([]) 
    const [reDrawTools, setReDrawTools] = useState([])

    // 현재 툴
    const [tool, setTool] = useState('pen')
    const [eraserSize, setEraserSize] = useState(15)

    const fullWidth = window.innerWidth
    const fullHeight = window.innerHeight - 60

    

    useEffect(() => { // 초기 랜더링
        const canvas = canvasRef.current
        ctx.current = canvas.getContext('2d')

        const toolCanvas = toolRef.current
        toolCtx.current = toolCanvas.getContext('2d')

        canvas.width = toolCanvas.width = fullWidth
        canvas.height = toolCanvas.height = fullHeight

        //임시
        ctx.current.lineWidth = 3
        
    }, [fullWidth, fullHeight])

    useEffect(()=> {
        const canvas = toolRef.current
        // 툴이 바뀌면 리셋시키기
        toolCtx.current.clearRect(0, 0, fullWidth, fullHeight)

        let isDown = false
        let moves = []

        const penDown = (e) => {
            if(e.which === 3) return // 마우스 우클릭 방지
            isDown = true
            toolCtx.current.lineWidth = 3
            toolCtx.current.beginPath()
            toolCtx.current.moveTo(e.offsetX, e.offsetY)
            const startPos = {x: e.offsetX, y: e.offsetY}
            moves = [startPos]
        }
        const penMove = (e) => {
            if(!isDown) return
            const movePoint = {x: e.offsetX, y: e.offsetY}
            toolCtx.current.lineTo(e.offsetX, e.offsetY)
            toolCtx.current.stroke()
            moves = [...moves, movePoint]
        }
        const penUp = (e) => {
            isDown = false
            toolCtx.current.clearRect(0,0,fullWidth,fullHeight)
            if(e.which === 1){
                moves.length>0 &&
                setDrawings(prev => [...prev, moves])
                setDrawTools(prev => [...prev, 'pen'])
                setReDrawings([])
                setReDrawTools([])
            }else{
                moves=[]
            }
        }

        if(tool === 'pen'){
            canvas.addEventListener('mousedown', penDown)
            canvas.addEventListener('mousemove', penMove)
            canvas.addEventListener('mouseup', penUp)
        }

        // 지우개 작업
        function eraserDown (e) {
            isDown = true
            moves = [{x: e.offsetX, y: e.offsetY}]
        }
        function eraserMove (e) {
            toolCtx.current.clearRect(0, 0, fullWidth, fullHeight)
            toolCtx.current.beginPath()
            toolCtx.current.arc(e.offsetX, e.offsetY, eraserSize, Math.PI*2, 0)
            toolCtx.current.fillStyle = 'white'
            toolCtx.current.fill()
            toolCtx.current.lineWidth = 1
            toolCtx.current.strokeStyle = 'black'
            toolCtx.current.stroke()
            
            if(isDown){ // 툴에서 마우스 포인트
                moves = [...moves, {x: e.offsetX, y:e.offsetY}]
                ctx.current.beginPath()
                ctx.current.arc(e.offsetX, e.offsetY, eraserSize, Math.PI*2, 0)
                ctx.current.fillStyle = 'white'
                ctx.current.fill()
            }
        }
        function eraserUp () {
            isDown = false
            setDrawings(prev => [...prev, moves])
            setDrawTools(prev => [...prev, 'eraser'])
            setReDrawings([])
            setReDrawTools([])
        }

        if(tool === 'eraser'){
            canvas.addEventListener('mousedown', eraserDown)
            canvas.addEventListener('mousemove', eraserMove)
            canvas.addEventListener('mouseup', eraserUp)
        }

        canvas.addEventListener('contextmenu', e=>e.preventDefault())
        
        return () => {
            canvas.removeEventListener('mousedown', penDown)
            canvas.removeEventListener('mousemove', penMove)
            canvas.removeEventListener('mouseup', penUp)
            
            canvas.removeEventListener('mousedown', eraserDown)
            canvas.removeEventListener('mousemove', eraserMove)
            canvas.removeEventListener('mouseup', eraserUp)
        }
    },[tool])

    const undo = () => { // 마지막 작업 삭제
        if(drawings.length === 0) return
        // 좌표 변경
        setReDrawings(prev => [...prev, drawings[drawings.length - 1]])
        setDrawings(prev => prev.filter((_, idx) => idx !== drawings.length - 1))
        // 툴 변경
        setReDrawTools(prev => [...prev, drawTools[drawTools.length - 1]])
        setDrawTools(prev => prev.filter((_, idx) => idx !== drawings.length - 1))
    }

    const redo = () => {
        if(reDrawings.length === 0) return
        // 좌표 변경
        setDrawings(prev => [...prev, reDrawings[reDrawings.length - 1]])
        setReDrawings(prev => prev.filter((_, idx) => idx !== reDrawings.length - 1))
        // 툴 변경
        setDrawTools(prev => [...prev, reDrawTools[reDrawTools.length - 1]])
        setReDrawTools(prev => prev.filter((_, idx) => idx !== reDrawTools.length - 1))
    }

    // 좌표 데이터로 그리기
    useEffect(()=>{
        function drawBoard () {
            ctx.current.clearRect(0, 0, fullWidth, fullHeight)

            drawings.forEach((moves, i) => {
                if(drawTools[i] === 'pen'){
                    if(moves.length === 1){
                        ctx.current.beginPath()
                        ctx.current.arc(moves[0].x, moves[0].y, 2, Math.PI * 2, 0)
                        ctx.current.fill()
                    }
                    ctx.current.beginPath()
                    ctx.current.moveTo(moves[0].x, moves[0].y)
                    moves.forEach(({x, y}) => {
                        ctx.current.lineTo(x, y)
                    })
                    ctx.current.stroke()
                }
                if(drawTools[i] === 'eraser'){
                    moves.forEach(({x, y}) => {
                        ctx.current.beginPath()
                        ctx.current.arc(x, y, eraserSize, Math.PI*2, 0)
                        ctx.current.fillStyle = 'white'
                        ctx.current.fill()
                    })
                }
            })
        }
        drawBoard()
    },[drawings, drawTools])

    return (
        <section className="art-page">
            <canvas className="tool-canvas" ref={toolRef} />
            <canvas ref={canvasRef} />
            <div className="tools">
                <button onClick={() => setTool('pen')}>펜</button>
                <button onClick={() => setTool('eraser')}>지우개</button>
                <button disabled={drawTools.length===0} onClick={undo}>실행취소</button>
                <button disabled={reDrawTools.length===0} onClick={redo}>되돌리기</button>
            </div>
        </section>
    )
}

export default ArtPage
