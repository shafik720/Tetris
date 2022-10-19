

let squares = document.querySelectorAll('.tetris-parent div'),
width = 10,
currentPosition = 4,
currentRotation = 0,
nextRandom = 0
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

document.addEventListener('keyup',control);

function control(e){
    if(e.keyCode === 37){
        moveLeft();
    }else if(e.keyCode === 39){
        moveRight();
    }else if(e.keyCode === 38){
        rotate();
    }
}

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
    freeze();
    showNextTetromino();
}

function freeze(){
    if(current.some(index=>squares[index + currentPosition + width].classList.contains('taken'))){
        current.forEach(index=>squares[index + currentPosition].classList.add('taken'));
        currentPosition = 4;
        random = nextRandom;
        nextRandom = Math.floor(Math.random() * tetriminos.length);
        current = tetriminos[random][currentRotation];
        draw();        
    }
}

function moveLeft(){
    unDraw();
    let isLeft = current.some(index=>(currentPosition + index) % width === 0);
    if(!isLeft) currentPosition -= 1;
    if(current.some(index=>squares[currentPosition + index].classList.contains('taken'))){
        currentPosition += 1;
    }
    draw();
}
function moveRight(){
    unDraw();
    const isRight = current.some(index=>(index + currentPosition)% width === width-1);
    if(!isRight) currentPosition += 1;
    if(current.some(index=>squares[currentPosition + index].classList.contains('taken'))){
        currentPosition -= 1 ;
    }
    draw();
}

function rotate(){
    unDraw();
    currentRotation++;
    if(currentRotation>=current.length){
        currentRotation = 0 ;
    }
    current = tetriminos[random][currentRotation];
    draw();     
}


// mini grid
let displaySquares = document.querySelectorAll('.mini-grid div'),
displayWidth = 4


;

const upNextTetromino = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], // L tetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //Z tetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], // T tetromino
    [0, 1, displayWidth, displayWidth + 1], // O tetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //iTetromino
  ] 

  function showNextTetromino(){
      displaySquares.forEach(index=>index.classList.remove('blue'));

      upNextTetromino[nextRandom].forEach(index=>displaySquares[index + displayWidth ].classList.add('blue'));
  }