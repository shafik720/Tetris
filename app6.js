
let grid = document.querySelector('.tetris-parent'),
wrapper = Array.from(document.querySelectorAll('.tetris-parent div')),
currentPosition = 4,
timer ,
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

function draw(){
    pieces.forEach(index=>wrapper[currentPosition + index].classList.add('blue'));
}
draw();
function unDraw(){
    pieces.forEach(index=>wrapper[currentPosition + index].classList.remove('blue'));
}

timer = setInterval(moveDown,300);

function moveDown(){
    unDraw();
    currentPosition += width;
    draw();
    freeze();
}

document.addEventListener('keydown',control);

function control(e){
  if(e.keyCode == 37){
    moveLeft();
  }else if(e.keyCode == 38){

  }else if(e.keyCode == 39){

  }else if(e.keyCode == 40){

  }
}

function freeze(){
    if(pieces.some(index=>wrapper[index + currentPosition + width].classList.contains('taken'))){
        pieces.forEach(index=>{
            wrapper[index + currentPosition].classList.add('taken');
        })
        currentPosition = 4;
        random = Math.floor(Math.random() * tetromino.length);
        pieces = tetromino[random][currentRotation];
    }
}

function moveLeft(){
  unDraw();
  const isLeft = pieces.some(index=> (index + currentPosition) % width == 0)
  if(!isLeft){
    currentPosition -= 1;
  }
  if(pieces.some(index=>wrapper[index + currentPosition].classList.contains('taken'))){
    currentPosition += 1;
  }
  draw();
}