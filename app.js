

let grid = document.querySelector('.tetris-parent'),
squares = Array.from(document.querySelectorAll('.tetris-parent div')),
width = 10,
nextRandom = 0,
timeId,
scoreDiv = document.querySelector('.score'),
score = 0,
currentRotation = 0;

counter = 0;
squares.forEach(index=>{
  index.innerText = counter;
  counter++;
})

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



let theTetrominoes  = [lTetromino,zTetromino,tTetromino,oTetromino,iTetromino]
let currentPosition = 4 ;
let randomPosition = Math.floor(Math.random() * parseInt(theTetrominoes.length))
let current = theTetrominoes[randomPosition][currentRotation];

function draw (){
    current.forEach(index=>{
        squares[currentPosition+index].classList.add('tetromino');
    })
}

function unDraw (){
    current.forEach(index=>{
        squares[currentPosition+index].classList.remove('tetromino');
    })
}




// making keyboard press working
function control(e){
  if(e.keyCode === 37){
    moveLeft();
  }else if(e.keyCode === 39){
    moveRight();
  }else if(e.keyCode === 38){
    rotate();
  }else if(e.keyCode ===40){
    moveDown();
  }
}
document.addEventListener('keydown', control);
// document.addEventListener('keydown', control); // the classical behavior is to speed up the block if down button is kept pressed so doing that

function moveDown(){
    unDraw();
    currentPosition += width;
    draw();
    freeze();
    addScore();
}
// ---------------------------- freeze function -------------
function freeze(){
    if(current.some(index => squares[index + currentPosition + width].classList.contains('taken'))){      
        current.forEach(index => squares[currentPosition + index].classList.add('taken'));
        
        randomPosition = nextRandom;
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);
        
        current = theTetrominoes[randomPosition][currentRotation];
        currentPosition = 4 ;
        draw();
        displayShape();
    }
}

function moveLeft(){
  unDraw();
  const isLeftEdge = current.some(index=>(currentPosition + index) % width === 0);

  if(!isLeftEdge) currentPosition-=1;

  if(current.some(index=>squares[currentPosition + index].classList.contains('taken'))){
    currentPosition += 1 ;
  }
  draw();
}

function moveRight(){
  unDraw();
  const  isRightEdge = current.some(index=>(currentPosition + index) % width === width-1);
  if(!isRightEdge) currentPosition+=1;
  if(current.some(index=>squares[currentPosition + index].classList.contains('taken'))){
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
  current = theTetrominoes[randomPosition][currentRotation];
  checkRotatedPosition();
  draw();
}


// Mini display 

let displaySquares = document.querySelectorAll('.mini-grid div'),
displayIndex = 0;
displayWidth = 4;

counter = 0;
displaySquares.forEach(index=>{
  index.innerText = counter;
  counter++;
});

const upNextTetromino = [
  [1, displayWidth + 1, displayWidth * 2 + 1, 2], // L tetromino
  [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //Z tetromino
  [1, displayWidth, displayWidth + 1, displayWidth + 2], // T tetromino
  [0, 1, displayWidth, displayWidth + 1], // O tetromino
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //iTetromino
] 

function displayShape(){
  displaySquares.forEach(square=>{
    square.classList.remove('tetromino');
  })

  upNextTetromino[nextRandom].forEach(index=>{
    displaySquares[index + displayIndex].classList.add('tetromino')
  })

}

document.getElementById('start').addEventListener('click',()=>{
  if(timeId){
    clearInterval(timeId);
    timeId = null;
  }else{
    draw();
    timeId = setInterval(moveDown,750);
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    displayShape();
  }
})


///FIX ROTATION OF TETROMINOS A THE EDGE 
function isAtRight() {
  return current.some(index=> (currentPosition + index + 1) % width === 0)  
}

function isAtLeft() {
  return current.some(index=> (currentPosition + index) % width === 0)
}

  function checkRotatedPosition(P) {
  P = P || currentPosition 
    
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
}


function addScore(){
  for(let i=0; i<=199; i+=width){
    let row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8,  i+9];
    if(row.every(index=>squares[index].classList.contains('taken'))){
      row.forEach(index=>squares[index].classList.remove('taken'));
      row.forEach(index=>squares[index].classList.remove('tetromino'));
      const squaresRemoved = squares.splice(i,width);
      squares = squaresRemoved.concat(squares);
      squares.forEach(index=>grid.appendChild(index));
      score += 10;
      scoreDiv.innerText = score;
    }    
  }
}
