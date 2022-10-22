

let squares = document.querySelectorAll('.tetris-parent div'),
width = 10,
currentPosition = 4 ,
currentRotation = 0
;

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

let tetrominos = [lTetromino,zTetromino,oTetromino,tTetromino,iTetromino];
let random = Math.floor(Math.random() * tetrominos.length);
let current = tetrominos[random][currentRotation];

function draw(){
    current.forEach(index=>squares[currentPosition + index].classList.add('blue'))
}
function unDraw(){
    current.forEach(index=>squares[currentPosition + index].classList.remove('blue'));
}
draw();

let timeId = setInterval(moveDown,400);

function moveDown(){
    unDraw();
    currentPosition += width;
    draw();
    freeze();
}
document.addEventListener('keydown', control);
function control(e){
    if(e.keyCode == 37){
        moveLeft();
    }else if(e.keyCode === 40){
        moveDown();        
    }else if(e.keyCode == 39){
        moveRight();
    }
}
function freeze(){
    if(current.some(index=>squares[currentPosition + index + width].classList.contains('taken'))){
        current.forEach(index=>squares[currentPosition + index].classList.add('taken'));

        random = Math.floor(Math.random() * tetrominos.length);
        current = tetrominos[random][currentRotation];
        currentPosition = 4;
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
    const isRight = current.some(index=>(currentPosition + index) % width === width-1);
    if(!isRight) currentPosition += 1;

    if(current.some(index=>squares[currentPosition + index].classList.contains('taken'))){
        currentPosition -= 1;
    }
    draw();
}

// function rotate(){
//     currentRotation++;
// }