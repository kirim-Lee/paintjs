const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const jsColors = document.getElementsByClassName('jsColor'); // color btns
const jsRange = document.getElementById('jsRange'); // stroke width btn
const jsMode = document.getElementById('jsMode'); // fill / stroke toggle
const INITIAL_COLOR = 'black';
let painting = false; // is painting
let filling = false; // is fill mode

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = INITIAL_COLOR; // color
ctx.fillStyle = INITIAL_COLOR; // fill color
ctx.lineWidth = 2.5; // bold


function stopPainting() {
  painting = false;
  ctx.closePath();
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting) {
      ctx.beginPath();
      ctx.moveTo(x, y);
  } else {
      ctx.lineTo(x, y);
      ctx.stroke();
  }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
function handleColorClick (event) {
    const target = event.target;
    const color = target && target.style.backgroundColor ? target.style.backgroundColor : INITIAL_COLOR;
    ctx.strokeStyle = color; 
    ctx.fillStyle = color;
}

function handleRagneClick (event) {
    ctx.lineWidth = event.target.value;
}

function handleModeClick () {
    filling = !filling;
    if (filling) {
        // fill mode
        jsMode.innerText = 'Paint';
        ctx.fillStyle = ctx.strokeStyle;
    } else {
        // paint mode
        jsMode.innerText = 'Fill';
        ctx.strokeStyle = ctx.fillStyle;
    }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
}

if (jsColors) {
    Array.from(jsColors).forEach(color => color.addEventListener('click', handleColorClick));
}

if (jsRange) {
    jsRange.addEventListener('input', handleRagneClick);
}

if (jsMode) {
    jsMode.addEventListener('click', handleModeClick);
}