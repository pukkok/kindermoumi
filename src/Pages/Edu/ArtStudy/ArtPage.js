import React, { useEffect, useRef, useState, useCallback } from "react"
import './styles/ArtPage.css'

function ArtPage() {
    const cavnasRef = useRef(null) // 그림 보드
    const ctx = useRef(null)

    const toolRef = useRef(null) // 
    const toolCtx = useRef(null)

    const [isDown, setIsDown] = useState(false)
    const [tool, setTool] = useState('pen')
    const [eraseSize, setEraseSize] = useState(15)

    const [startPos, setStartPos] = useState({x:0, y:0})
    const [movePos, setMovePos] = useState([])
    const startPoint = useRef({x:0, y:0})
    const movePoints = useRef([])
    const fullWidth = window.innerWidth
    const fullHeight = window.innerHeight - 60

    useEffect(() => { // 초기 랜더링
        const canvas = cavnasRef.current
        ctx.current = canvas.getContext('2d')

        const toolCanvas = toolRef.current
        toolCtx.current = toolCanvas.getContext('2d')

        canvas.width = toolCanvas.width = fullWidth
        canvas.height = toolCanvas.height = fullHeight
    }, [fullWidth, fullHeight])

    const penTool = useCallback((e) => { // 펜으로 그리기 시작
        setIsDown(true)
        ctx.current.strokeStyle = 'black'
        ctx.current.beginPath()
        ctx.current.moveTo(e.offsetX, e.offsetY)
        // setStartPos({x: e.offsetX, y: e.offsetY})
        startPoint.current = {x : e.offsetX, y: e.offsetY}
    }, [])

    const eraserTool = useCallback((e) => {
        setIsDown(true)
        ctx.current.fillStyle = 'white'
        ctx.current.beginPath()
        ctx.current.arc(e.offsetX, e.offsetY, eraseSize, Math.PI * 2, 0)
        ctx.current.fill()
    }, [eraseSize])

    const upHandler = useCallback(() => {
        setIsDown(false)
    }, [])

    useEffect(() => {
        if (tool === 'pen') {
            window.addEventListener('mousedown', penTool)
        } else {
            window.removeEventListener('mousedown', penTool)
        }

        if (tool === 'eraser') {
            window.addEventListener('mousedown', eraserTool)
        } else {
            window.removeEventListener('mousedown', eraserTool)
        }

        window.addEventListener('mouseup', upHandler)

        return () => {
            window.removeEventListener('mousedown', penTool)
            window.removeEventListener('mousedown', eraserTool)
            window.removeEventListener('mouseup', upHandler)
        }
    }, [tool, penTool, eraserTool, upHandler])

    useEffect(() => {
        let drawHandler, eraseCanvasHandler, erasePointerHandler

        const drawPen = (e) => {
            if (!isDown) return
            ctx.current.lineTo(e.offsetX, e.offsetY)
            movePoints.current = [...movePoints.current, {x: e.offsetX, y: e.offsetY}]
            console.log(movePoints.current)
            ctx.current.stroke()
        }

        const eraseCanvas = (e) => {
            if (!isDown) return
            ctx.current.fillStyle = 'white'
            ctx.current.beginPath()
            ctx.current.arc(e.offsetX, e.offsetY, eraseSize, Math.PI * 2, 0)
            ctx.current.fill()
        }

        const erasePointer = (e) => {
            toolCtx.current.clearRect(0, 0, fullWidth, fullHeight)
            toolCtx.current.beginPath()
            toolCtx.current.arc(e.offsetX, e.offsetY, eraseSize, Math.PI * 2, 0)
            toolCtx.current.fillStyle ='white'
            toolCtx.current.fill()
            toolCtx.current.strokeStyle = 'black'
            toolCtx.current.stroke()
        }

        if (tool === 'pen') {
            drawHandler = drawPen
            window.addEventListener('mousemove', drawPen)
        }

        if (tool === 'eraser') {
            eraseCanvasHandler = eraseCanvas
            erasePointerHandler = erasePointer

            window.addEventListener('mousemove', eraseCanvas)
            window.addEventListener('mousemove', erasePointer)
        }

        if(isDown){
            const undo = (e) => {
                e.preventDefault()
                const {x, y} = startPoint.current
                ctx.current.strokeStyle = 'white'
                ctx.current.beginPath()
                ctx.current.moveTo(x, y)
                movePoints.current.forEach(({x, y}) => {
                    ctx.current.lineTo(x, y)
                })
                ctx.current.stroke()
                movePoints.current = []
            }
            window.addEventListener('contextmenu', undo)
        }



        return () => {
            if (drawHandler) window.removeEventListener('mousemove', drawHandler)
            if (eraseCanvasHandler) window.removeEventListener('mousemove', eraseCanvasHandler)
            if (erasePointerHandler) window.removeEventListener('mousemove', erasePointerHandler)
        }
    }, [isDown, tool, eraseSize])

    return (
        <section className="art-page">
            <canvas className="tool-canvas" ref={toolRef} />
            <canvas ref={cavnasRef} />
            <div className="tools">
                <button onClick={() => setTool('pen')}>펜</button>
                <button onClick={() => setTool('eraser')}>지우개</button>
            </div>
        </section>
    )
}

export default ArtPage
