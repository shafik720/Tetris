
let containers = document.querySelectorAll('.tetris-parent div');
let width = 10;
let currentPosition = 4;
let currentRotation = 0;
let nextRandom = 0 ;
let button = document.querySelector('.button-section button')

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

let tetromino = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
let random = Math.floor(Math.random() * tetromino.length);
let current = tetromino[random][currentRotation];

function draw(){
  current.forEach(index=>containers[currentPosition + index].classList.add('blue'));
}
function unDraw(){
  current.forEach(index=>containers[currentPosition + index].classList.remove('blue'));
}

let timeId;

button.addEventListener('click',()=>{
  draw();
  showDisplay();
  if(timeId){
    clearInterval(timeId);
    timeId = null;
  }else if(!timeId){    
    timeId = setInterval(moveDown,500);
  }
  
})

function moveDown(){
  unDraw();
  currentPosition += width;
  draw();
  freeze();
}

document.addEventListener('keydown', control);

function control(e){
  if(e.keyCode === 37 ){
    moveLeft();
  }else if(e.keyCode === 38){
    rotate();
  }
  else if(e.keyCode === 39){
    moveRight();
  }else if(e.keyCode === 40){
    moveDown();
  }
}

function freeze(){
  if(current.some(index=>containers[index + width + currentPosition].classList.contains('taken'))){
    current.forEach(index=>containers[index + currentPosition].classList.add('taken'));
    
    random = nextRandom;
    nextRandom = Math.floor(Math.random() * tetromino.length);
    current = tetromino[random][currentRotation];
    currentPosition  = 4;
    showDisplay();
    draw();
    console.log(nextRandom);
  }
}

function moveLeft(){
  unDraw();
  let isLeftEdges = current.some(index=>(currentPosition + index) % width === 0); 

  if(!isLeftEdges) currentPosition -= 1;
  if(current.some(index=>containers[currentPosition + index].classList.contains('taken'))){
    currentPosition += 1;
  }
  draw();
}

function moveRight(){
  unDraw();
  const isRightEdge = current.some(index=>(currentPosition + index) % width ===(width-1));
  if(!isRightEdge) currentPosition += 1;
  if(current.some(index=>containers[currentPosition + index].classList.contains('taken'))){
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
    current = tetromino[random][currentRotation];    
    rotationBug();
  if(current.some(index=>containers[currentPosition + index].classList.contains('taken'))){
    --currentRotation;
    if(currentRotation<0){
      ++currentRotation;
    }
    current = tetromino[random][currentRotation];
    rotationBug();
    draw();
  }else{
    draw();
  }
}

// rotation bug fixed;
function isRightSide(){
  return current.some(index=>(currentPosition + index + 1) % width === 0);
}
function isLeftSide(){
  return current.some(index=>(currentPosition + index) %  width ===0);
}

function rotationBug(p){  
  p = p || currentPosition;
  if((p + 1) % width <4){
    if(isRightSide()){
      currentPosition += 1;
      rotationBug(p);
    }
  }else if(p % width>5){
    if(isLeftSide()){
      currentPosition -= 1 ;
      rotationBug(p);
    }
  }
}

// mini display

let displaySquares = document.querySelectorAll('.mini-grid div');
let displaySquare = Array.from(displaySquares);
let displayWidth = 4;
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
  
  upNextTetromino[nextRandom].forEach(index=>displaySquares[index + displayWidth].classList.add('blue'));
}























///FIX ROTATION OF TETROMINOS A THE EDGE 
/* function isAtRight() {
  return current.some(index=> (currentPosition + index + 1) % width === 0)  
}

function isAtLeft() {
  return current.some(index=> (currentPosition + index) % width === 0)
}

  function checkRotatedPosition(P) {
  P = currentPosition 
    
  if ((P+1) % width < 4) {            
    if (isAtRight()) {           
      currentPosition += 1; 
      checkRotatedPosition(P); 
      }
  }
  else if (P % width > 5) {
    if (isAtLeft()) {
      currentPosition -= 1;
      checkRotatedPosition(P);
    }
  }
} */