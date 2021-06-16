const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cellSize = 18; // 12x12 px
const fps = 30;

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

let generation = 0;

const grid = Array.from({ length: gridHeight }, (e) =>
  Array.from({ length: gridWidth }, () => false)
);

function getNeighboors(x, y) {
  let neighboors = [];

  if (y > 0) {
    neighboors.push(grid[y - 1][x]);
  }
  if (x > 0) {
    neighboors.push(grid[y][x - 1]);
  }
  if (y > 0 && x > 0) {
    neighboors.push(grid[y - 1][x - 1]);
  }

  if (y < gridHeight - 1) {
    neighboors.push(grid[y + 1][x]);
  }
  if (x < gridWidth - 1) {
    neighboors.push(grid[y][x + 1]);
  }
  if (y < gridHeight - 1 && x < gridWidth - 1) {
    neighboors.push(grid[y + 1][x + 1]);
  }

  if (x > 0 && y < gridHeight - 1) {
    neighboors.push(grid[y + 1][x - 1]);
  }
  if (y > 0 && x < gridWidth - 1) {
    neighboors.push(grid[y - 1][x + 1]);
  }
  return neighboors.filter(Boolean);
}

let changesQueue = [];

function queueChange(x, y, state) {
  changesQueue.push({ x, y, state });
}

function applyChanges() {
  while (true) {
    const change = changesQueue.pop(0); // get first change and remove from array
    if (!change) break;
    grid[change.y][change.x] = change.state;
  }
}

function simulate() {
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      cell = grid[y][x];
      sumOfNeighboors = getNeighboors(x, y).length;
      if (cell && sumOfNeighboors < 2) {
        queueChange(x, y, false); // die
      } else if (cell && sumOfNeighboors <= 3) {
        // live on to next generation
      } else if (cell && sumOfNeighboors > 3) {
        queueChange(x, y, false); // die
      } else if (!cell && sumOfNeighboors === 3) {
        queueChange(x, y, true); // become live
      }
    }
  }
  generation++;
}

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

  ctx.fillStyle = "black";
  ctx.font = "36px Arial";
  ctx.fillText(`Generation: ${generation}`, 50, 50);
}

draw();

function nextGeneration() {
  simulate();
  applyChanges();
  draw();
}

function start() {
  setInterval(() => {
    nextGeneration();
  }, 1000 / fps);
}
