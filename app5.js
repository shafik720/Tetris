let grid    = Array.from(document.querySelectorAll('.tetris-parent div')),
width       = 10,
timer,
nextRandom  = 0,
currentRotation     = 0,
currentPosition     = 4;


// lTetromino 
const lTetromino    = [
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
let random = Math.floor(Math.random() * nextTetromino.length);
let current = nextTetromino[random][currentRotation];



function moveDown(){
    unDraw();
    currentPosition += width;
    draw();
    freeze();
    scoring();
}

document.addEventListener('keydown', control);

function control(e){
    if(e.keyCode == 37){
        moveLeft();
    }else if(e.keyCode == 38){
        rotation();
    }else if(e.keyCode == 39){
        moveRight();
    }else if(e.keyCode == 40){
        moveDown();
    }
}

function draw(){
    current.forEach(index=>grid[index + currentPosition].classList.add('blue'));
}

function unDraw(){
    current.forEach(index=>grid[currentPosition + index].classList.remove('blue'));
}
draw();

function freeze(){
    if(current.some(index=> grid[currentPosition + index + width].classList.contains('taken'))){
        current.forEach(index=>grid[currentPosition + index].classList.add('taken'));
        currentPosition = 4;
        random = nextRandom;
        nextRandom = Math.floor(Math.random() * nextTetromino.length);
        current = nextTetromino[random][currentRotation];
        draw();
        displayMini();
    }
}

function moveLeft(){
    unDraw();
    let isLeft = current.some(index=>(index + currentPosition) % width == 0 );
    if(!isLeft){
        currentPosition -= 1;
    }
    if(current.some(index=>grid[index + currentPosition].classList.contains('taken'))){
        currentPosition += 1;
    }
    draw();
}

function moveRight(){
    unDraw();
    let isRight = current.some(index => (index + currentPosition + 1) % width === 0);
    if(!isRight){
        currentPosition +=1;
    }
    if(current.some(index=>grid[index + currentPosition].classList.contains('taken'))){
        currentPosition -= 1;
    }
    draw();
}
function rotation(){
    unDraw();
    currentRotation++;
    if(currentRotation === current.length){
        currentRotation = 0;
    }
    current = nextTetromino[random][currentRotation];
    if(current.some(index=>grid[currentPosition + index].classList.contains('taken'))){
        --currentRotation;
        if(currentRotation<0){
            currentRotation = 0;
        }
    }
    if(random==2){
        if(current.some(index=>grid[currentPosition + index + 1].classList.contains('taken'))){
            currentPosition -= 1;
        }
    }
    current = nextTetromino[random][currentRotation];
    rotationBug();
    draw();
}

function isLeftEdge(){
    return current.some(index=>(index + currentPosition) % width === 0);
}
function isRightEdge(){
    return current.some(index=>(index + currentPosition + 1) % width === 0);
}

function rotationBug(p){
    p = currentPosition;
    if((p+1) % width < 4){
        if(isRightEdge()){
            currentPosition += 1;
            rotationBug(p);
        }
    }else if(p % width >5){
        if(isLeftEdge()){
            currentPosition -= 1;
            rotationBug(p);
        }
    }
}

// mini grid 
let displaySquares  =   Array.from(document.querySelectorAll('.mini-grid div'));
let displayWidth    =   4;
let miniPosition    =   0;

const miniTetro     =   [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], // L tetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //Z tetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], // T tetromino
    [0, 1, displayWidth, displayWidth + 1], // O tetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //iTetromino
  ] 


let displayCurrent   =   miniTetro[nextRandom];
displayMini();
function displayMini (){
    displaySquares.forEach(index=> index.classList.remove('blue'));
    miniTetro[nextRandom].forEach(index=>displaySquares[index + miniPosition].classList.add('blue'));
}

// game start pause button
function gameStart(){
    if(!timer){
        timer = setInterval(moveDown,300);
    }else{
        clearInterval(timer);
        timer = null;
    }
}

// score and finishing
function scoring(){
    for(let i=0; i<199; i+=width){
        let row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7,i+8,i+9];
        if(row.every(index=>grid[index].classList.contains('blue'))){
            row.forEach(index=>grid[index].classList.remove('blue'));
        }
    }
}