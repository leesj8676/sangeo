import { useEffect, useRef, useState } from 'react';
import './Paint.css';

function Paint(props, { color }) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lineWidth, setLineWidth] = useState()

  let session = props.user.getStreamManager().stream.session;
  let id = props.user.connectionId;
  console.log("최상위 : ", props);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.75;    // 3/4 만큼 차지
    canvas.height = window.innerHeight - 150;  // 상단바 크기 150px로 고정

    const context = canvas.getContext("2d");
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = lineWidth
    contextRef.current = context;

    session.on('signal:draw', (event) => {
      const data = JSON.parse(event.data);
      if (data.id !== id) {
        peerDrawing(data.payload);
      }
    });

  }, [])

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
    const data = {
      x: offsetX,
      y: offsetY,
      lineWidth: lineWidth,
      color,
      isDrawing: false,
    };
    // console.log("startDrawing : ", props);
    session.signal({
      data: JSON.stringify({ type: 'start', id: id, payload: { ...data } }),
      type: 'draw',
    });

  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
    const data = {
      x: offsetX,
      y: offsetY,
      lineWidth: lineWidth,
      color,
      isDrawing: true,
    };
    session.signal({
      data: JSON.stringify({ type: 'move', id: id, payload: { ...data } }),
      type: 'draw',
    });

  }

  const finishDrawing = () => {
    if (isDrawing)
      contextRef.current.stroke();
    setIsDrawing(false)
  }

  function peerDrawing(payload) {
    console.log("payload", payload);
    let context = contextRef.current;
    if (!context) return;
    context.lineWidth = payload.lineWidth;
    context.strokeStyle = payload.color;
    // context.lineCap = payload.lineCap;
    if (!payload.isDrawing) {
      context.beginPath();
      context.moveTo(payload.x, payload.y);
    } else {
      context.lineTo(payload.x, payload.y);
      context.stroke();
    }
  }

  function onLineWidthChange(event) {
    // console.log(event.target.value);
    setLineWidth(event.target.value);
    contextRef.current.lineWidth = lineWidth;
  }

  function onColorChange(event) {
    color = event.target.value;
    contextRef.current.strokeStyle = color;
  }

  function onColorClick(event) {
    console.log("onColorClick!!! _---------------");
    color = event.target.dataset.color;
    contextRef.current.strokeStyle = color;
  }

  return (
    <div>
      <canvas
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={finishDrawing}
        onMouseOut={finishDrawing}
        ref={canvasRef}
      />
      <input id="line-width" type="range" min="1" max="10" value={lineWidth} onChange={onLineWidthChange} step="0.5" />
      <div class="color-option" style={{backgroundColor : "#1abc9c"}} data-color="#1abc9c" onClick={onColorClick}> </div>
      <div class="color-option" style={{backgroundColor : "#3498db"}} data-color="#3498db" onClick={onColorClick}> </div>
      <div class="color-option" style={{backgroundColor : "#34495e"}} data-color="#34495e" onClick={onColorClick}> </div>
      <div class="color-option" style={{backgroundColor : "#27ae60"}} data-color="#27ae60" onClick={onColorClick}> </div>
      <div class="color-option" style={{backgroundColor : "#8e44ad"}} data-color="#8e44ad" onClick={onColorClick}> </div>
      <div class="color-option" style={{backgroundColor : "#f1c40f"}} data-color="#f1c40f" onClick={onColorClick}> </div>
      <div class="color-option" style={{backgroundColor : "#e74c3c"}} data-color="#e74c3c" onClick={onColorClick}> </div>
      <div class="color-option" style={{backgroundColor : "#95a5a6"}} data-color="#95a5a6" onClick={onColorClick}> </div>
      <div class="color-option" style={{backgroundColor : "#d35400"}} data-color="#d35400" onClick={onColorClick}> </div>
      <div class="color-option" style={{backgroundColor : "#bdc3c7"}} data-color="#bdc3c7" onClick={onColorClick}> </div>
      <div class="color-option" style={{backgroundColor : "#2ecc71"}} data-color="#2ecc71" onClick={onColorClick}> </div>
      <div class="color-option" style={{backgroundColor : "#e67e22"}} data-color="#e67e22" onClick={onColorClick}> </div>
      <input type="color" id="color" onChange={onColorChange} />
    </div>
  );
}

export default Paint;