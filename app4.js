
let grid = document.querySelector('.tetris-parent'),
containers = Array.from(document.querySelectorAll('.tetris-parent div')),
width = 10,
currentRotation = 0,
nextRandom = 0,
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

let timer ;

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
        random = nextRandom;
        nextRandom = Math.floor(Math.random() * allTetromino.length);
        present = allTetromino[random][currentRotation];
        draw();
        showDisplay();
        gameScore();
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
    if(present.some(index=>containers[currentPosition + index].classList.contains('taken'))){        
        if(currentRotation<=0){
            currentRotation == 0;
        }else{
            --currentRotation;
        }

        if(random == 2){
            if(present.some(index=>containers[currentPosition + index +1].classList.contains('taken'))){
                currentPosition -=1;
            }
        }
    }
    present = allTetromino[random][currentRotation];
    rotationBug();
    draw();
}

function isLeftEdge(){
    return present.some(index=>(currentPosition + index) % width === 0);
}
function isRightEdge(){
    return present.some(index=>(currentPosition + index + 1) % width === 0);
}

function rotationBug(p){
    p = currentPosition;
    if((p + 1) % width < 4){
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


let displaySquares = document.querySelectorAll('.mini-grid div'),
displayWidth = 4,
displayCurrentPosition = 0;

const miniTetro = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], // L tetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //Z tetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], // T tetromino
    [0, 1, displayWidth, displayWidth + 1], // O tetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //iTetromino
  ] 

function showDisplay(){
    displaySquares.forEach(index=>index.classList.remove('blue'));

    miniTetro[nextRandom].forEach(index=>displaySquares[displayCurrentPosition + index].classList.add('blue'));
}

function gameStart(){
    showDisplay();
    if(timer){
        clearInterval(timer);
        timer = null;
    }else{
        timer = setInterval(moveDown, 400);
    }
}
let score = 0;
function gameScore(){
    for(let i=0; i<199; i+=width){
        let row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8,  i+9];
        if(row.every(index=>containers[index].classList.contains('taken'))){
            row.forEach(index=>{
                containers[index].classList.remove('taken');
                containers[index].classList.remove('blue');
            })
            let squareRemoved = containers.splice(i, width);
            containers = squareRemoved.concat(containers);

            containers.forEach(index=>grid.appendChild(index));
            
            score += 10;
            document.querySelector('.score').innerText = score;
        }
    }
}