
let grid = document.querySelector('.tetris-parent'),
wrapper = Array.from(document.querySelectorAll('.tetris-parent div')),
currentPosition = 4,
timer ,
currentRotation = 0,
width = 10;

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

let tetromino = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
let random = Math.floor(Math.random() * tetromino.length);
let pieces = tetromino[random][currentRotation];

function draw(){
    pieces.forEach(index=>wrapper[currentPosition + index].classList.add('blue'));
}
draw();
function unDraw(){
    pieces.forEach(index=>wrapper[currentPosition + index].classList.remove('blue'));
}

timer = setInterval(moveDown,300);

function moveDown(){
    unDraw();
    currentPosition += width;
    draw();
}