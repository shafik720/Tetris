

const grid = document.querySelector('.tetris-parent'),
squares = grid.querySelectorAll('div')
width = 10
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
draw();
function unDraw (){
    current.forEach(index=>{
        squares[currentPosition+index].classList.remove('tetromino');
    })
}


let timeId = setInterval(moveDown,400);

// making keyboard press working
function control(e){
  if(e.keyCode === 37){
    moveLeft();
  }else if(e.keyCode === 39){
    moveRight();
  }
}
document.addEventListener('keyup', control);

function moveDown(){
    unDraw();
    currentPosition += width;
    draw();
    freeze();
}

function freeze(){
    if(current.some(index => squares[index + currentPosition + width].classList.contains('taken'))){      
        current.forEach(index => squares[currentPosition + index].classList.add('taken'));
        
        randomPosition = Math.floor(Math.random() * theTetrominoes.length);
        current = theTetrominoes[randomPosition][currentRotation];
        currentPosition = 4 ;
        draw();
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