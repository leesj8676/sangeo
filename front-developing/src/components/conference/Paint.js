import { useEffect, useRef, useState } from 'react';
import './Paint.css';
import styled from 'styled-components';

function Paint(props) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const colorPickRefs = useRef([]);
  const [isDrawing, setIsDrawing] = useState(false)
  const [lineWidth, setLineWidth] = useState()
  const [pickedColor, setPickedColor] = useState()

  const colors = [
    '#c0392b',
    '#e67e22',
    '#f1c40f',
    '#2ecc71',
    '#3498db',
    'blueviolet',
    '#e84393',
    '#2c3e50',
  ];

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
      } else {
      }
    });

    if (colorPickRefs.current) {
      colorPickRefs.current.map((element) =>
        element.addEventListener('click', (event) => {
          if (event.target) {
            // setPickedColor(event.target.value);
            // contextRef.current.strokeStyle = pickedColor;
            onColorChange(event);
          }
        })
      );
    }

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
      color: pickedColor,
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
      color: pickedColor,
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
    let color;
    if (event.target.value === undefined)
      color = event.target.id; // 팔레트에서 선택
    else
      color = event.target.value;
    changeColor(color);
  }

  function changeColor(color) {
    setPickedColor(color);
    contextRef.current.strokeStyle = color;
    const colorSelector = document.getElementById("color-select");
    //color 에서 현재 선택한 색깔 보여주기
    colorSelector.value = color;
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
      {/* <span class="color-option" style={{backgroundColor : "#1abc9c"}} data-color="#1abc9c" onClick={onColorClick}> </span>
      <span class="color-option" style={{backgroundColor : "#3498db"}} data-color="#3498db" onClick={onColorClick}> </span>
      <span class="color-option" style={{backgroundColor : "#34495e"}} data-color="#34495e" onClick={onColorClick}> </span>
      <span class="color-option" style={{backgroundColor : "#27ae60"}} data-color="#27ae60" onClick={onColorClick}> </span>
      <span class="color-option" style={{backgroundColor : "#8e44ad"}} data-color="#8e44ad" onClick={onColorClick}> </span>
      <span class="color-option" style={{backgroundColor : "#f1c40f"}} data-color="#f1c40f" onClick={onColorClick}> </span>
      <span class="color-option" style={{backgroundColor : "#e74c3c"}} data-color="#e74c3c" onClick={onColorClick}> </span>
      <span class="color-option" style={{backgroundColor : "#95a5a6"}} data-color="#95a5a6" onClick={onColorClick}> </span>
      <span class="color-option" style={{backgroundColor : "#d35400"}} data-color="#d35400" onClick={onColorClick}> </span>
      <span class="color-option" style={{backgroundColor : "#bdc3c7"}} data-color="#bdc3c7" onClick={onColorClick}> </span>
      <span class="color-option" style={{backgroundColor : "#2ecc71"}} data-color="#2ecc71" onClick={onColorClick}> </span>
      <span class="color-option" style={{backgroundColor : "#e67e22"}} data-color="#e67e22" onClick={onColorClick}> </span> */}
      <ColorsPickBox>
        <input type="color" id="color-select" onChange={onColorChange} />
        {colors.map((color, i) => {
          return (
            <ColorPick
              id={color}
              key={i}
              color={color}
              ref={(element) => {
                if (element) {
                  colorPickRefs.current[i] = element;
                }
              }}
            />
          );
        })}
        {/* <Eraser ref={eraserRef}>
          <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M5.662 23l-5.369-5.365c-.195-.195-.293-.45-.293-.707 0-.256.098-.512.293-.707l14.929-14.928c.195-.194.451-.293.707-.293.255 0 .512.099.707.293l7.071 7.073c.196.195.293.451.293.708 0 .256-.097.511-.293.707l-11.216 11.219h5.514v2h-12.343zm3.657-2l-5.486-5.486-1.419 1.414 4.076 4.072h2.829zm6.605-17.581l-10.677 10.68 5.658 5.659 10.676-10.682-5.657-5.657z' />
          </svg>
        </Eraser> */}
      </ColorsPickBox>
    </div>
  );
}

const ColorsPickBox = styled.div`
  position: absolute;
  left: 70%;
  bottom: 5px;
  display: flex;
  transform: translate(-50%, 0);
`;
const ColorPick = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  z-index: 999;
  background-color: ${(props) => props.color};
  margin-right: 5px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`;

export default Paint;