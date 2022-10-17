
const tetrisParent = document.querySelector('.tetris-parent'),
grid = tetrisParent.querySelectorAll('div');
let width = 10;
let div = Array.from(grid);
let currentPosition = 4;
// console.log(div);


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


let tetrisContainer = [lTetromino,zTetromino,tTetromino,oTetromino, iTetromino];
let random = Math.floor(Math.random() * tetrisContainer.length);

let container = tetrisContainer[random][0];

function showTetris(){
    container.forEach(index=>div[index+currentPosition].classList.add('tetromino'));
}
function removeTetris(){
    container.forEach(index=>div[index+currentPosition].classList.remove('tetromino'));
}
showTetris();
let runDown = () =>{
    removeTetris();
    currentPosition += width;
    showTetris();
}
let timeLapse = setInterval(runDown,1000);
