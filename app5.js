
let containers  =   Array.from(document.querySelectorAll('.tetris-parent div')),
width   = 10,
timer,
currentPosition = 4,
currentRotation = 0;

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

let tetromino   =   [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
let random = Math.floor(Math.random() * tetromino.length);
let current = tetromino[random][currentRotation];


function draw(){
    current.forEach(index=>containers[index + currentPosition].classList.add('blue'));
}
function unDraw(){
    current.forEach(index=>containers[index + currentPosition].classList.remove('blue'));
}

draw();
timer = setInterval(moveDown, 300);

document.addEventListener('keydown',control);

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

function freeze(){
    if(current.some(index=>containers[currentPosition + index + width].classList.contains('taken'))){
        current.forEach(index=>{
            containers[index + currentPosition].classList.add('taken');
        })    
        currentPosition = 4;
        random = Math.floor(Math.random() * tetromino.length);
        current = tetromino[random][currentRotation];
        draw();
    }
}
function freeze2(){
    if(current.some(index=>containers[currentPosition + index + width].classList.contains('taken'))){
        current.forEach(index=>{
            containers[index + currentPosition].classList.add('taken');
            draw();
        })    
    
        currentPosition = 4;
        random = Math.floor(Math.random() * tetromino.length);
        current = tetromino[random][currentRotation];
        draw();
    }
}

function moveDown(){
    unDraw();
    currentPosition += width;
    draw();
    freeze();
}
// const isExist = current.some(index=>containers[index + currentPosition].classList.contains('taken'));
function moveLeft(){
    unDraw();
    const isLeftSide = current.some(index=>(index + currentPosition) % width === 0);
    
    if(!isLeftSide){
        freeze();
        currentPosition -= 1;
        if(current.some(index=>containers[currentPosition + index].classList.contains('taken'))){
            currentPosition += 1 ;
            // freeze();
        }
    
    }
    freeze2();
    draw();
}
function moveRight(){
    unDraw();
    let isRight = current.some(index=>(currentPosition + index +1) % width ===0);
    if(!isRight){
        currentPosition += 1;
        if(current.some(index=>containers[currentPosition + index].classList.contains('taken'))){
            currentPosition -= 1;
        }
    }
    freeze2();
    draw();
}

function isLeftEdge(){
    return current.some(index=>(index + currentPosition) % width === 0 );
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
    }else if(p % width > 5){
        if(isLeftEdge()){
            currentPosition -= 1;
            rotationBug(p);
        }
    }
}

function rotation(){
    unDraw();
    currentRotation++;
    if(currentRotation == current.length){
        currentRotation = 0 ;
    }
    current = tetromino[random][currentRotation];
    
    if(current.some(index=>containers[currentPosition + index].classList.contains('taken'))){
        if(currentRotation==0){
            currentRotation = 0;
        }else{
            --currentRotation;            
        } 
        if(random == 2){
            if(currentRotation == 0){
                currentPosition -= 1;
            }
        }       
    }    
    current = tetromino[random][currentRotation];
    rotationBug();
    freeze2();
    draw();
}



// mini display 
let displaySquares = Array.from(document.querySelectorAll('.mini-grid div'));
let displayWidth = 4;
let displayPosition = 0;

const miniTetro = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], // L tetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //Z tetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], // T tetromino
    [0, 1, displayWidth, displayWidth + 1], // O tetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //iTetromino
  ] 

function showMinidisplay(){
    
}