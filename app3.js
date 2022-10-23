

let squares = document.querySelectorAll('.tetris-parent div'),
width = 10,
currentPosition = 4 ,
nextRandom = 0,
timeId,
startBtn = document.querySelector('#start'),
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

let tetrominos = [lTetromino,zTetromino,tTetromino, oTetromino,iTetromino];
let random = Math.floor(Math.random() * tetrominos.length);
let current = tetrominos[random][currentRotation];

function draw(){    
    current.forEach(index=>squares[currentPosition + index].classList.add('blue'))
}
function unDraw(){    
    current.forEach(index=>squares[currentPosition + index].classList.remove('blue'));
}




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
    }else if(e.keyCode == 38){
        rotate();
    }
}
function freeze(){
    if(current.some(index=>squares[currentPosition + index + width].classList.contains('taken'))){
        current.forEach(index=>squares[currentPosition + index].classList.add('taken'));

        random = nextRandom;
        nextRandom = Math.floor(Math.random() * tetrominos.length);
        current = tetrominos[random][currentRotation];
        currentPosition = 4;
        showDisplay();
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

function rotate(){    
    unDraw();
    currentRotation++;
    if(currentRotation === current.length){
        currentRotation = 0;
    }  
    current = tetrominos[random][currentRotation];
    if(current.some(index=>squares[currentPosition + index].classList.contains('taken'))){
        if(random==3){
            if(current.some(index=>squares[index + currentPosition +1].classList.contains('taken'))){
                currentPosition -= 1;  
            } // ---------- solution for bug 
        }
        --currentRotation;
        if(currentRotation<0) {
        ++currentRotation;
        }
        current = tetrominos[random][currentRotation];
        rotationBug();
        draw();
    }else{
        rotationBug();
        draw();
    }  
}

function isRightSide(){
    return current.some(index => (currentPosition + index + 1) % width ===0);
}
function isLeftSide(){
    return current.some(index=>(currentPosition + index) % width === 0);
}

function rotationBug(p){
    p = currentPosition;
    if((p + 1)% width < 4 ){
        if(isRightSide()){
            currentPosition += 1;
            rotationBug(p);
        }
    }else if(p % width >5){
        if(isLeftSide()){
            currentPosition -= 1;
            rotationBug(p);
        }
    }
}


// showing  mini display
let displaySquares = document.querySelectorAll('.mini-grid div');
let displayWidth = 4 ;
let displayCurrentPosition = 0;

const upNextTetromino = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], // L tetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //Z tetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], // T tetromino
    [0, 1, displayWidth, displayWidth + 1], // O tetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //iTetromino
  ] 

function showDisplay(){
    displaySquares.forEach(index=>index.classList.remove('blue'));

    upNextTetromino[nextRandom].forEach(index=>displaySquares[displayCurrentPosition + index].classList.add('blue'));
}

start.addEventListener('click',()=>{
    if(timeId){        
        clearInterval(timeId);
        timeId = null;
    }else{
        draw();
        timeId = setInterval(moveDown,400);
        showDisplay();
    }
})


// --------- clearing lane when matched 
function clearLane(){
    for(let i=0; i<199; i+=width){
        let row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8,  i+9];
        if(row.every(index=>squares[index].classList.contains('taken'))){
            
        }
    }
}