
let grid = document.querySelector('.tetris-parent'),
containers = Array.from(document.querySelectorAll('.tetris-parent div')),
width = 10,
currentRotation = 0,
currentPosition = 4 
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

let allTetromino = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
let random = Math.floor(Math.random() * allTetromino.length);
let present = allTetromino[random][currentRotation];

const draw = () =>{
    present.forEach(index=>containers[currentPosition + index].classList.add('blue'));
}
const unDraw =()=>{
    present.forEach(index=>containers[currentPosition + index].classList.remove('blue'));
}
draw();

const moveDown =()=>{
    unDraw();
    currentPosition += width;
    draw();
    freeze();
}

let timer = setInterval(moveDown,400);

document.addEventListener('keydown',moveTetromino);

function moveTetromino(e){
    if(e.keyCode === 37){
        moveLeft();
    }else if(e.keyCode === 39){
        moveRight();
    }else if(e.keyCode === 38){
        rotate();
    }else if(e.keyCode === 40){
        moveDown();
    }
}


const freeze =()=>{
    if(present.some(index=>containers[currentPosition + index + width].classList.contains('taken'))){
        present.forEach(index=>containers[currentPosition + index].classList.add('taken'));
        currentPosition = 4;
        random = Math.floor(Math.random() * allTetromino.length);
        present = allTetromino[random][currentRotation];
        draw();
    }
}

const moveLeft =()=>{
    unDraw();
    let isLeft = present.some(index=>(currentPosition + index) % width === 0);

    if(!isLeft) currentPosition -= 1;
    if(present.some(index=>containers[currentPosition + index].classList.contains('taken'))){
        currentPosition += 1;
    }
    draw();
}

function moveRight(){
    unDraw();
    let isRight = present.some(index=>(currentPosition + index) % width === width-1);
    
    if(!isRight) currentPosition += 1;
    if(present.some(index=>containers[currentPosition + index].classList.contains('taken'))){
        currentPosition -= 1;
    }
    draw();
}

function rotate(){
    unDraw();
    currentRotation++;

    if(currentRotation == present.length){
        currentRotation = 0;
    }    
    present = allTetromino[random][currentRotation];
    draw();
}

function isLeftEdge(){
    return present.some(index=>(currentPosition + index) % width === 0);
}
function isRightEdge(){
    return 
}