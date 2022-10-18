
let parentDiv = document.querySelector('.tetris-parent');
let div = parentDiv.querySelectorAll('div');
let currentPosition = 4 ;
let width = 10;
let currentRotation = 0;

let grid = Array.from(div);

// lTetromino 
const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2]
]

const zTetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1]
]

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1]
]

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1]
]

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3]
]

let containers = [lTetromino,zTetromino,tTetromino,oTetromino,iTetromino];
let random = Math.floor(Math.random() * containers.length)
let containersTwo = containers[random][currentRotation];

function draw(){
  containersTwo.some(index=>grid[index + currentPosition].classList.add('blue'));
}
draw();
function unDraw(){
  containersTwo.some(index=>grid[index + currentPosition].classList.remove('blue'));
}

function run(){
  unDraw();
  currentPosition += width;
  draw();
}
setInterval(run,1000)