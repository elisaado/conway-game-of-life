const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cellSize = 12; // 12x12 px
const fps = 1;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

canvas.width = windowWidth;
canvas.height = windowHeight;

function draw() {
  for (let x = 0; x < cellSize * windowWidth; x += cellSize) {
    for (let y = 0; y < cellSize * windowHeight; y += cellSize) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(cellSize + x, y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, cellSize + y);
      ctx.stroke();
    }
  }
}

setInterval(draw, 1000 / fps);
