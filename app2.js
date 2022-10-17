

let tetrisParent = document.querySelector('.tetris-parent'),
allDivs = tetrisParent.querySelectorAll('div'),
width = 10,
currentPosition = 4,
divsArray = Array.from(allDivs)
;

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


let tetriMony = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
let random = Math.floor(Math.random() * tetriMony.length)
let container = tetriMony[random][0];

function show(){
    container.forEach(index=>divsArray[index + currentPosition].classList.add('blue'));
}
function unShow(){
    container.forEach(index=>divsArray[index + currentPosition].classList.remove('blue'));
}
function down(){
    unShow();
    currentPosition += width;
    show();
}
let runEm = setInterval(down,1000);

show();