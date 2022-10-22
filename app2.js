
let containers = document.querySelectorAll('.tetris-parent div');
let width = 10;
let currentPosition = 4;
let currentRotation = 0;

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
draw();
function unDraw(){
  current.forEach(index=>containers[currentPosition + index].classList.remove('blue'));
}

let timeId = setInterval(moveDown,500);

function moveDown(){
  unDraw();
  currentPosition += width;
  draw();
  freeze();
}

document.addEventListener('keydown',(e)=>{
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
})

function freeze(){
  if(current.some(index=>containers[index + width + currentPosition].classList.contains('taken'))){
    current.forEach(index=>containers[index + currentPosition].classList.add('taken'));
    random = Math.floor(Math.random() * tetromino.length);
    current = tetromino[random][currentRotation];
    currentPosition  = 4;
    draw();
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
  if(current.some(index=>containers[currentPosition + index].classList.contains('taken'))){
    --currentRotation;
    current = tetromino[random][currentRotation];
    draw();
  }else{
    draw();
  }
}