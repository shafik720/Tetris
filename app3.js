

let squares = document.querySelectorAll('.tetris-parent div'),
width = 10,
currentPosition = 4;
currentRotation = 0;
;

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


let tetriminos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
let random = Math.floor(Math.random() * tetriminos.length);
let current = tetriminos[random][currentRotation];

let timeTravel = setInterval(moveDown,300);

draw();
function draw(){
    current.forEach(index=>squares[index + currentPosition].classList.add('blue'));
}
function unDraw(){
    current.forEach(index=>squares[index + currentPosition].classList.remove('blue'));
}

function moveDown(){
    unDraw();
    currentPosition += width;
    draw();
}

function freeze(){
    if(current.some(index=>squares[]))
}