
let squares = Array.from(document.querySelectorAll('.tetris-parent div')),
width = 10,
currentPosition = 4,
currentRotation = 0
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

let tetrominos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
let random = Math.floor(Math.random() * tetrominos.length)
let current = tetrominos[random][0];



function draw (){
  current.forEach(index=>{
      squares[currentPosition+index].classList.add('tetromino');
  })
}
draw();
function unDraw (){
  current.forEach(index=>{
      squares[currentPosition+index].classList.remove('tetromino');
  })
}
let timeDraw = setInterval(moveDown,400);

function moveDown(){
  unDraw();
  currentPosition += 10;
  draw();
  freeze();
}

function freeze(){
  if(current.some(index => squares[index + currentPosition + width].classList.contains('taken'))){
    current.forEach(index=>squares[index + currentPosition].classList.add('taken'));

    random = Math.floor(Math.random() * tetrominos.length)
    current = tetrominos[random][0];
    currentPosition = 4;
    draw();
  }
}