const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cellSize = 18; // 12x12 px
const fps = 0.1;

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const gridWidth = Math.floor(windowWidth / cellSize);
const gridHeight = Math.floor(windowHeight / cellSize);

canvas.width = windowWidth;
canvas.height = windowHeight;
let mouseDown = false;

canvas.addEventListener("mousedown", click, false);
canvas.addEventListener("mouseup", () => (mouseDown = false), false);
document.getElementById("startButton").addEventListener("click", start, false);

function click(e) {
  const x = Math.floor(e.pageX / cellSize);
  const y = Math.floor(e.pageY / cellSize);
  grid[y][x] = !grid[y][x];
  draw();
}

const grid = Array.from({ length: gridHeight }, (e) =>
  Array(gridWidth).fill(true)
);

function simulate() {}
function draw() {
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      cell = grid[y][x];
      ctx.fillStyle = cell ? "red" : "white";
      ctx.beginPath();
      ctx.rect(
        x * cellSize,
        y * cellSize,
        x * cellSize + cellSize,
        y * cellSize + cellSize
      );
      ctx.fill();
      ctx.stroke();
    }
  }
}

draw();

function start() {
  setInterval(() => {
    simulate();
    draw();
  }, 1000 / fps);
}
