import { useEffect, useRef, useState } from 'react';
import './Paint.css';
import styled from 'styled-components';

function Paint(props) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const cavasContainerRef = useRef();
  const colorPickRefs = useRef([]);
  const [isDrawing, setIsDrawing] = useState(false)
  const [lineWidth, setLineWidth] = useState()
  const [pickedColor, setPickedColor] = useState()
  const eraserRef = useRef();

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
  // console.log("최상위 : ", props);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = cavasContainerRef.current.clientWidth;    // 3/4 만큼 차지
    canvas.height = cavasContainerRef.current.clientHeight;  // 상단바 크기 150px로 고정

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
            onColorChange(event);
          }
        })
      );
    }
    if (eraserRef.current) {
      eraserRef.current.onclick = () => {
        changeColor("#FFFFFF"); //white
        setLineWidth(80);
        contextRef.current.lineWidth = lineWidth;
      };
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
    // console.log("호출 ----",color, colorSelector);
    colorSelector.value = color;
  }


  function canvasClear() {
    console.log("캔버스를 초기화 ---- ");
    var context = canvasRef.context;
    if (!context) return;
    if (!canvasRef.current) return;
    context.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  }

  return (
    <CanvasContainer ref={cavasContainerRef}>
      <canvas
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={finishDrawing}
        onMouseOut={finishDrawing}
        ref={canvasRef}
      />
      <LineWidthSelector>
        <input id="line-width" type="range" min="2" max="20" value={lineWidth} onChange={onLineWidthChange} step="2" />
      </LineWidthSelector>
      <ColorsPickBox>
        <ColorSelector>
          <input type="color" id="color-select" onChange={onColorChange} />
        </ColorSelector>
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
        <Eraser ref={eraserRef}>
          <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M5.662 23l-5.369-5.365c-.195-.195-.293-.45-.293-.707 0-.256.098-.512.293-.707l14.929-14.928c.195-.194.451-.293.707-.293.255 0 .512.099.707.293l7.071 7.073c.196.195.293.451.293.708 0 .256-.097.511-.293.707l-11.216 11.219h5.514v2h-12.343zm3.657-2l-5.486-5.486-1.419 1.414 4.076 4.072h2.829zm6.605-17.581l-10.677 10.68 5.658 5.659 10.676-10.682-5.657-5.657z' />
          </svg>
        </Eraser>
      </ColorsPickBox>
    </CanvasContainer>
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
const Eraser = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -5px;
`;
const LineWidthSelector = styled.div`
  cursor: pointer;
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;
const ColorSelector = styled.div`
  cursor: pointer;
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;
const CanvasContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 100%;
  height: 100%;
  border-radius: 18px;
  position: relative;
  background-color: white;
`;

export default Paint;