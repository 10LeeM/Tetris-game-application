document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn= document.querySelector('#start-button')
    const width = 10
    let nextRandom=0
    
//The Tetriminoes
 //**************************************Arrays****************************************

const lTetris = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2 ],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2 ] 
]

const mTetris = [
    [0, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1]
]

const nTetris = [
    [1, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1] 
]

const oTetris= [
    [0,1, width,width+1],
    [0,1, width,width+1],
    [0,1, width,width+1],
    [0,1, width,width+1]

]

const pTetris= [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2,width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2,width+3]
    
]

const theTetris = [lTetris, mTetris,nTetris,oTetris,pTetris]

let currentPosition = 4
let currentRotation = 0


//select a tetris randomly and its first rotation
let random =Math.floor(Math.random()*theTetris.length)
let  current = theTetris[random][currentRotation]
console.log(random);

//draw the tetris
function draw(params) {
    current.forEach(index =>{
        squares[currentPosition+ index].classList.add('tetromino')
    })
}

//undraw the tetris
function undraw(params) {
    current.forEach(index =>{
        squares[currentPosition + index].classList.remove('tetromino')
    })
}

draw()

//*************************************************Time and intervals******************************
//Moving the tetris around the grid evry second
 
timerId = setInterval(moveDown, 1000)

//assign functions to keyCodes
function control(e) {
    if(e.keyCode === 37){
        moveLeft()
    } else if(e.keyCode === 38){
        rotate()
    } else if(e.keyCode === 39) {
        moveRight()
    }else if(e.keyCode === 40) {
        moveDown()
  }
}  
document.addEventListener('keyup', control)// control is the function, keyup is the type of event


// common targets are window, document and element
//movedown function
function moveDown(params) {
    undraw()
    currentPosition += width //add a whole widht to the current position
    draw()
    freeze()

    
}

//freeze function

function  freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))

        //start a new tetris falling
        random=nextRandom
        nextRandom= Math.floor(Math.random()* theTetris.length)
        current = theTetris[random][currentRotation]
        currentPosition=4
        draw()
        displayShape()
    }
}


function moveLeft (){
    undraw() //remove any trace of the shape
    const isAtLeftEdge = current.some(index=> (currentPosition + index) % width === 0)

    if(!isAtLeftEdge) currentPosition -=1// only move left if the shape is not at theleft shape

//stop the tetriminoif there is another one already there

    if (current.some(index => squares [currentPosition  + index].classList.contains('taken'))) {
        currentPosition+=1
        
    }
    draw()
}

// move the tetris right , unless is at the edge or there is a blockage
function moveRight (){
    undraw() //remove any trace of the shape
    const isAtRightEdge = current.some(index=> (currentPosition + index) % width === width -1)

    if(!isAtRightEdge) currentPosition +=1// only move right if the shape is not at theleft shape

//stop the tetrimino if there is another one already there

    if (current.some(index => squares [currentPosition  + index].classList.contains('taken'))) {
        currentPosition -=1
    }
    draw()

}
//move tetris down
function rotate (){
    undraw() //remove any trace of the shape
    currentRotation ++
    if(currentRotation ===current.length) {
       // If current rotation gets gets to 4, make it go back to 0
       currentRotation= 0
    }
    current = theTetris[random][currentRotation]
    draw()
}

//show upnext teris in the minigrid display
const displaySquares =document.querySelectorAll('.mini-grid div')
const dispayWidth=4
let displayIndex=0


//tetris without rotations
const upNextTetris = [
    [1, dispayWidth+1, dispayWidth*2+1,2], //ltetris
    [0,dispayWidth, dispayWidth+1,dispayWidth*2+1],//mtetris
    [1, dispayWidth, dispayWidth+1,dispayWidth+2 ],// ntetris
    [0, 1, dispayWidth, dispayWidth+1],//otetris
    [1, dispayWidth+1, dispayWidth*2+1,dispayWidth*3+1 ]
]

//show upnext shape in the mini-grid display

function displayShape(){
    //remove any trace of tetris in the entire grid
    displaySquares.forEach(square =>{
        square.classList.remove('tetromino')
    })
    upNextTetris[nextRandom].forEach(index => {
        displaySquares[displayIndex +index].classList.add('tetromino')
    })
}


})
