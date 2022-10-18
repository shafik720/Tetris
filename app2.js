let width = 10;
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

let parentDiv = document.querySelector('.tetris-parent'),
currentPosition = 4,
currentRotation = 0,
grid = parentDiv.querySelectorAll('div'),
squares = Array.from(document.querySelectorAll('.tetris-parent div'))
;

let theTetrominoes = [lTetromino,zTetromino,tTetromino,oTetromino,iTetromino];
let random = Math.floor(Math.random() * theTetrominoes.length);
let current = theTetrominoes[random][currentRotation];

function draw (){
  current.forEach(index=>{
      squares[currentPosition+index].classList.add('tetromino');
  })
}
function unDraw (){
  current.forEach(index=>{
      squares[currentPosition+index].classList.remove('tetromino');
  })
}

let timedraw = setInterval(moveDown,500)

draw();

function moveDown(){
  unDraw();
  currentPosition += width;
  draw();
  freeze();
}

function freeze(){
  if(current.some(index=>squares[index + currentPosition + width].classList.contains('taken'))){
    current.forEach(index=>squares[currentPosition+index].classList.add('taken'));
    random = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4 ;
    draw();
  }
}