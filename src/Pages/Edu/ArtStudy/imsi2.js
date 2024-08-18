import React, { useEffect, useRef, useState } from "react";
import './styles/ArtPage.css';

function ArtPage() {
    const canvasRef = useRef(null);
    const ctx = useRef(null);

    const [tool, setTool] = useState('pen');
    const [eraserSize, setEraserSize] = useState(15);
    const [drawings, setDrawings] = useState([]); // 그림 기록 저장
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentStroke, setCurrentStroke] = useState([]);

    const fullWidth = window.innerWidth;
    const fullHeight = window.innerHeight - 60;

    useEffect(() => {
        const canvas = canvasRef.current;
        ctx.current = canvas.getContext('2d');

        canvas.width = fullWidth;
        canvas.height = fullHeight;

        ctx.current.lineWidth = 3;
    }, [fullWidth, fullHeight]);

    const startDrawing = (e) => {
        if (e.which === 3) return; // 우클릭 방지
        setIsDrawing(true);
        const startPos = { x: e.offsetX, y: e.offsetY };
        setCurrentStroke([startPos]); // 현재 그림 저장 시작
        ctx.current.beginPath();
        ctx.current.moveTo(e.offsetX, e.offsetY);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const newPoint = { x: e.offsetX, y: e.offsetY };
        setCurrentStroke((prev) => [...prev, newPoint]); // 현재 그림에 좌표 추가
        ctx.current.lineTo(e.offsetX, e.offsetY);
        ctx.current.stroke();
    };

    const stopDrawing = () => {
        if (!isDrawing) return;
        setIsDrawing(false);
        setDrawings((prev) => [...prev, currentStroke]); // 전체 그림 배열에 추가
        setCurrentStroke([]);
    };

    const undo = () => {
        setDrawings((prev) => {
            const updatedDrawings = prev.slice(0, -1); // 마지막 그림 제거
            redrawCanvas(updatedDrawings); // 업데이트된 그림으로 캔버스 다시 그리기
            return updatedDrawings;
        });
    };

    const redrawCanvas = (drawings) => {
        ctx.current.clearRect(0, 0, fullWidth, fullHeight); // 캔버스 초기화
        drawings.forEach((stroke) => {
            ctx.current.beginPath();
            ctx.current.moveTo(stroke[0].x, stroke[0].y);
            stroke.forEach(({ x, y }) => {
                ctx.current.lineTo(x, y);
            });
            ctx.current.stroke();
        });
    };

    useEffect(() => {
        const canvas = canvasRef.current;

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('contextmenu', (e) => e.preventDefault());

        console.log(currentStroke)

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
        };
    }, [startDrawing, draw, stopDrawing]);

    return (
        <section className="art-page">
            <canvas ref={canvasRef} />
            <div className="tools">
                <button onClick={() => setTool('pen')}>펜</button>
                <button onClick={() => setTool('eraser')}>지우개</button>
                <button onClick={undo}>실행 취소</button>
            </div>
        </section>
    );
}

export default ArtPage;
