

const grid = document.querySelector('.tetris-parent'),
squares = grid.querySelectorAll('div')
width = 10

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
let current = theTetrominoes[randomPosition][0];

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
draw();


let moveDown = () =>{
    unDraw();
    currentPosition += width;
    draw();
}
let timeDraw = setInterval(moveDown,1000);