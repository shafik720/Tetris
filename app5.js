
let containers = Array.from(document.querySelectorAll('.tetris-parent div'))
currentPosition = 4,
width = 10
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

let nextTetromino = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
let random = Math.floor(Math.random() * nextTetromino.length)
let currentRotation = 0 ;
let current = nextTetromino[random][currentRotation];

function draw(){
    current.forEach(index=>containers[currentPosition  + index].classList.add('blue'));
}
draw();
let x = setInterval(moveDown,300);
function unDraw(){
    current.forEach(index=>containers[currentPosition  + index].classList.remove('blue'));
}

function moveDown(){
    unDraw();
    currentPosition += width;
    draw();
    freeze();
}

document.addEventListener('keydown', control);
function control(e){
    if(e.keyCode ===37){
        moveLeft();
    }else if(e.keyCode === 40){
        moveDown();
    }else if(e.keyCode === 39){
        moveRight();
    }else if(e.keyCode === 38){
        rotate();
    }
}

function freeze(){
    if(current.some(index=>containers[width + currentPosition + index].classList.contains('taken'))){
        current.forEach(index=>{
            containers[currentPosition + index].classList.add('taken');
        });
        currentPosition = 4 ;
        random = Math.floor(Math.random() * nextTetromino.length);
        current = nextTetromino[random][currentRotation];
        draw();
    }
}

function moveLeft(){
    unDraw();
    let isLeft = current.some(index=>(index + currentPosition) % width === 0);
    if(!isLeft){
        currentPosition -= 1;
    }
    if(current.some(index=>containers[index+currentPosition].classList.contains('blue'))){
        currentPosition += 1;
    }
    draw();
}
function moveRight(){
    unDraw();
    const isRight= current.some(index=>(currentPosition + index) % width === width-1);
    if(!isRight){
        currentPosition += 1;
    }
    if(current.some(index=>containers[index + currentPosition].classList.contains('blue'))){
        currentPosition -= 1;
    }
    draw();
}

function rotate(){
    unDraw();
    currentRotation++;
    if(currentRotation>=current.length){
        currentRotation = 0;
    }
    current = nextTetromino[random][currentRotation];
    if(current.some(index=>containers[currentPosition + index].classList.contains('taken'))){
        if(currentRotation<=0){
            currentRotation++;
        }else{
            --currentRotation;
        }
        
    }
    current = nextTetromino[random][currentRotation];
    draw();
}