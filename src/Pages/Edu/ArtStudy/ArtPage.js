import React, { useEffect, useRef, useState, useCallback } from "react"
import './styles/ArtPage.css'

function ArtPage() {
    const canvasRef = useRef(null) // 그림 보드
    const ctx = useRef(null)

    const toolRef = useRef(null) // 
    const toolCtx = useRef(null)

    const [drawTools, setDrawTools] = useState([])
    const [drawings, setDrawings] = useState([])
    const [reDrawings, setReDrawings] = useState([])
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

        let isDown = false
        let moves = []
        toolCtx.current.clearRect(0, 0, fullWidth, fullHeight)
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
            }else{
                moves=[]
            }
        }

        if(tool === 'pen'){
            canvas.addEventListener('mousedown', penDown)
            canvas.addEventListener('mousemove', penMove)
            canvas.addEventListener('mouseup', penUp)
        }

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
        setDrawings((prev) => prev.slice(0, -1))
    }

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
                <button onClick={undo}>실행취소</button>
                <button onClick={undo}>되돌리기</button>
            </div>
        </section>
    )
}

export default ArtPage
