const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const jsColor = document.getElementsByClassName('jsColor');

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = 'black'; // color
ctx.lineWidth = 2.5; // bold

let painting = false;

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

function handleColorClick (event) {
    const target = event.target;
    const color = target && target.style.backgroundColor ? target.style.backgroundColor : 'black';
    ctx.strokeStyle = color; 
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(jsColor).forEach(color => color.addEventListener('click', handleColorClick));