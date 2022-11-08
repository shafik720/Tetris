
let containers  =   Array.from(document.querySelectorAll('.tetris-parent div')),
width   = 10,
timer,
currentPosition = 4,
currentRotation = 0;

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

let tetromino   =   [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
let random = Math.floor(Math.random() * tetromino.length);
let current = tetromino[random][currentRotation];


function draw(){
    current.forEach(index=>containers[index + currentPosition].classList.add('blue'));
}
function unDraw(){
    current.forEach(index=>containers[index + currentPosition].classList.remove('blue'));
}

draw();
timer = setInterval(moveDown, 300);

document.addEventListener('keydown',control);

function control(e){
    if(e.keyCode == 37){
        moveLeft();
    }else if(e.keyCode == 38){
        
    }else if(e.keyCode == 39){
        
    }else if(e.keyCode == 40){
        moveDown();
    }
}

function freeze(){
    if(current.some(index=>containers[currentPosition + index + width].classList.contains('taken'))){
        current.forEach(index=>{
            containers[index + currentPosition].classList.add('taken');
        })
    // if(isExist){
    //     current.forEach(index=>{
    //         containers[index + currentPosition].classList.add('taken');
    //     })
    // }
        currentPosition = 4;
        random = Math.floor(Math.random() * tetromino.length);
        current = tetromino[random][currentRotation];
        draw();
    }
}

function moveDown(){
    unDraw();
    currentPosition += width;
    draw();
    freeze();
}
// const isExist = current.some(index=>containers[index + currentPosition].classList.contains('taken'));
function moveLeft(){
    unDraw();
    const isLeftSide = current.some(index=>(index + currentPosition) % width === 0);
    
    if(!isLeftSide){
        freeze();
        currentPosition -= 1;
        if(current.some(index=>containers[currentPosition + index].classList.contains('taken'))){
            currentPosition += 1 ;
            // freeze();
        }
    
    }
    draw();
}