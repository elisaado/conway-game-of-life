const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cellSize = 18; // 12x12 px
const fps = 0.1;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

canvas.width = windowWidth;
canvas.height = windowHeight;

canvas.addEventListener("click", click, false);

function click(e) {
  const x = Math.floor(e.pageX / cellSize);
  const y = Math.floor(e.pageY / cellSize);
}

function draw() {
  for (let y = 0; y < cellSize * windowHeight; y += cellSize) {
    for (let x = 0; x < cellSize * windowWidth; x += cellSize) {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.rect(x, y, x + cellSize, y + cellSize);
      ctx.fill();
      ctx.stroke();
    }
  }
}

draw();
setInterval(draw, 1000 / fps);
