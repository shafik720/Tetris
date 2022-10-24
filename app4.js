
let grid = document.querySelector('.tetris-parent'),
containers = Array.from(document.querySelectorAll('.tetris-parent div')),
width = 10,
currentRotation = 0,
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
}

let timer = setInterval(moveDown,400);


const freeze =()=>{
    if(present.some(index=>containers[currentPosition + index].classList.contains('taken'))){
        
    }
}