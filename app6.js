
let grid = document.querySelector('.tetris-parent'),
  wrapper = Array.from(document.querySelectorAll('.tetris-parent div')),
  currentPosition = 4,
  scores = 0,
  nextRandom = 0,
  timer,
  currentRotation = 0,
  width = 10;

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
let pieces = tetromino[random][currentRotation];

function draw() {
  pieces.forEach(index => wrapper[currentPosition + index].classList.add('blue'));
}
draw();
function unDraw() {
  pieces.forEach(index => wrapper[currentPosition + index].classList.remove('blue'));
}



function moveDown() {
  unDraw();
  currentPosition += width;
  draw();
  freeze();
  score();
  showMinidisplay();
}

document.addEventListener('keydown', control);

function control(e) {
  if (e.keyCode == 37) {
    moveLeft();
  } else if (e.keyCode == 38) {
    rotation();
  } else if (e.keyCode == 39) {
    moveRight();
  } else if (e.keyCode == 40) {
    moveDown();
  }
}

function freeze() {
  if (pieces.some(index => wrapper[index + currentPosition + width].classList.contains('taken'))) {
    pieces.forEach(index => {
      wrapper[index + currentPosition].classList.add('taken');
    })
    currentPosition = 4;
    random = nextRandom;
    nextRandom = Math.floor(Math.random() * tetromino.length);
    pieces = tetromino[random][currentRotation];
  }
  draw();
}

function secondFreeze() {
  if (pieces.some(index => wrapper[index + currentPosition + width].classList.contains('taken'))) {
    pieces.forEach(index => {
      wrapper[index + currentPosition].classList.add('taken');
      draw();
    })
    currentPosition = 4;
    random = Math.floor(Math.random() * tetromino.length);
    pieces = tetromino[random][currentRotation];
  }
  draw();
}

function moveLeft() {
  unDraw();
  const isLeft = pieces.some(index => (index + currentPosition) % width == 0)
  if (!isLeft) {
    currentPosition -= 1;
  }
  if (pieces.some(index => wrapper[index + currentPosition].classList.contains('taken'))) {
    currentPosition += 1;
  }
  secondFreeze();
  draw();
}

function moveRight() {
  unDraw();
  const isRight = pieces.some(index => (index + currentPosition + 1) % width == 0);
  if (!isRight) {
    currentPosition += 1;
    if (pieces.some(index => wrapper[index + currentPosition].classList.contains('taken'))) {
      currentPosition -= 1;
    }
  }
  secondFreeze();
  draw();
}

function isLeftEdge(){
  return pieces.some(index=>(index + currentPosition) % width === 0);
}
function isRightEdge(){
  return pieces.some(index=>(index + currentPosition + 1) % width === 0 );
}

function rotationBug(p){
  p = currentPosition;
  if((p+1) % width <4){
    if(isRightEdge()){
      currentPosition += 1;
      rotationBug(p);
    }
  }else if(p % width > 5){
    if(isLeftEdge()){
      currentPosition-=1;
      rotationBug(p);
    }
  }
}

function rotation(){
  unDraw();
  currentRotation++;
  if(currentRotation == pieces.length){
    currentRotation = 0;
  }
  pieces = tetromino[random][currentRotation];
  if(pieces.some(index=>wrapper[index + currentPosition].classList.contains('taken'))){
    --currentRotation;
    if(currentRotation < 0){
      ++currentRotation;
    }
    if(random == 2){
      if(currentRotation == 0){
        // currentPosition -= 1;
        currentRotation = 3;
      }
    }
    pieces = tetromino[random][currentRotation];
  }
  
  rotationBug();
  secondFreeze();
  draw();
}

function gameStart(){
  if(timer){
    clearInterval(timer);
    timer = null ; 
  }else if(!timer){
    timer = setInterval(moveDown, 300);
  }
}

function score(){
  for(let i=0; i<199; i+=width){
    let row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9 ];
    if(row.every(index=>wrapper[index].classList.contains('taken'))){
      row.forEach(index=>{
        wrapper[index].classList.remove('taken');
        wrapper[index].classList.remove('blue');
      })

      let squaresRemoved = wrapper.splice(i, width);
      wrapper = squaresRemoved.concat(wrapper);
      wrapper.forEach(index=>grid.appendChild(index));

      scores += 10;
      document.querySelector('.score').innerText = scores ;
    }
  }
}

// working on mini display
let miniTetroDiv = document.querySelectorAll('.mini-grid div');
let displayWidth = 4;

const miniTetro = [
  [1, displayWidth + 1, displayWidth * 2 + 1, 2], // L tetromino
  [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //Z tetromino
  [1, displayWidth, displayWidth + 1, displayWidth + 2], // T tetromino
  [0, 1, displayWidth, displayWidth + 1], // O tetromino
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //iTetromino
] 

function showMinidisplay(){
  miniTetroDiv.forEach(index=>index.classList.remove('blue'));
  miniTetro[nextRandom].forEach(index=>miniTetroDiv[index].classList.add('blue'));
}