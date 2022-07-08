//Rock Paper Scissors https://github.com/kubowania/rock-paper-scissors-x3
const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const rpsResultDisplay = document.getElementById('rpsResult');
const possibleChoices = document.querySelectorAll('.rpsButton');
let userChoice;
let computerChoice;

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice
    generateComputerChoice()
    getResult()
  }));

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length);
    if (randomNumber === 0) {
        computerChoice = 'Rock'
    }
    if (randomNumber === 1) {
        computerChoice = 'Paper'
    }
    if (randomNumber === 2) {
        computerChoice = 'Scissors'
    }
    computerChoiceDisplay.innerHTML = computerChoice
}

function getResult() {
    if (computerChoice === userChoice) {
        result = 'You\'ve drawn'
      }
      if (computerChoice === 'Rock' && userChoice === "Paper") {
        result = 'You\'ve won'
      }
      if (computerChoice === 'Rock' && userChoice === "Scissors") {
        result = 'You\'ve lost'
      }
      if (computerChoice === 'Paper' && userChoice === "Scissors") {
        result = 'You\'ve won'
      }
      if (computerChoice === 'Paper' && userChoice === "Rock") {
        result = 'You\'ve lost'
      }
      if (computerChoice === 'Scissors' && userChoice === "Rock") {
        result = 'You\'ve won'
      }
      if (computerChoice === 'Scissors' && userChoice === "Paper") {
        result = 'You\'ve lost'
      }
      rpsResultDisplay.innerHTML = result
}
//Memory https://github.com/kubowania/memory-game
const cardArray = [
    {
        name: 'cheeseburger',
        img: 'Resources/memory/cheeseburger.png'
    },
    {
        name: 'fries',
        img: 'Resources/memory/fries.png'
    },
    {
        name: 'hotdog',
        img: 'Resources/memory/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'Resources/memory/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'Resources/memory/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'Resources/memory/pizza.png'
    },
    {
        name: 'cheeseburger',
        img: 'Resources/memory/cheeseburger.png'
    },
    {
        name: 'fries',
        img: 'Resources/memory/fries.png'
    },
    {
        name: 'hotdog',
        img: 'Resources/memory/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'Resources/memory/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'Resources/memory/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'Resources/memory/pizza.png'
    }
]
cardArray.sort(() => 0.5 - Math.random());
const gridDisplay = document.getElementById('memGrid');
const memScoreDisplay = document.getElementById('memScore');
let cardsChosen = [];
let cardsChosenId = [];
const cardsWon = [];

function createBoard () {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', './Resources/memory/blank.png');
        card.setAttribute('data-id', i);
        card.setAttribute('class', 'memCard')
        card.addEventListener('click', flipCard);
        gridDisplay.append(card);
    }
}
createBoard();

function checkMatch() {
    const cards = document.querySelectorAll('.memCard');
    if (cardsChosenId[0] === cardsChosenId[1]) {
        alert('don\'t pick the same one twice');
        cards[cardsChosenId[0]].setAttribute('src','./Resources/memory/blank.png');
        cards[cardsChosenId[1]].setAttribute('src','./Resources/memory/blank.png');
    }
    else {
        if (cardsChosen[0] == cardsChosen[1]) {
            //alert('You\'ve found a match');
        //cards[cardsChosenId[0]].setAttribute('src','./Resources/memory/white.png'); //changes to cleared image
        //cards[cardsChosenId[1]].setAttribute('src','./Resources/memory/white.png');
        cards[cardsChosenId[0]].style.opacity = '0.0';
        cards[cardsChosenId[1]].style.opacity = '0.0';
        cards[cardsChosenId[0]].removeEventListener('click', flipCard);
        cards[cardsChosenId[1]].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
        }
        else {
            cards[cardsChosenId[0]].setAttribute('src','./Resources/memory/blank.png');
            cards[cardsChosenId[1]].setAttribute('src','./Resources/memory/blank.png');
        }
    }
    cardsChosen = [];
    cardsChosenId = [];
    memScoreDisplay.innerHTML = cardsWon.length;

    if (cardsWon.length == cards.length/2) {
        memScoreDisplay.innerHTML = 'You\'re a winner';

    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length ===2) {
        setTimeout((checkMatch),500);
    }
}

//Whack a Mole https://github.com/kubowania/whac-a-mole
const holes = document.querySelectorAll('.moleHole');
const mole = document.querySelector('.mole');
const moleTimeDisplay = document.querySelector('#moleTime');
const moleScoreDisplay = document.querySelector('#moleScore');
let moleStarted = false;

let moleScore = 0;
let moleTarget = 0;
let moleTime = 60;
let moleCountDownTimer = null;
let moleMoveTimer = null;

function randomHole() {
    holes.forEach(hole => {
        hole.classList.remove('mole');
    })

    let randomHole = holes[Math.floor(Math.random() * 9)];
    randomHole.classList.add('mole');

    moleTarget = randomHole.id;
}
holes.forEach(hole => {
    hole.addEventListener('mousedown', () => {
        if (hole.id == moleTarget) {
            moleScore++;
            //hole.style.border = '' todo set border normal
            moleScoreDisplay.innerHTML = moleScore;
            moleTarget = null;
        }
    })
})
function startMole() {
    moleMoveTimer = setInterval(randomHole, 700);
    moleCountDownTimer = setInterval(moleCountDown, 1000);
}
function moleCountDown() {
    moleTime--;
    moleTimeDisplay.innerHTML = moleTime;
    if (moleTime <= 0) {
        clearInterval(moleCountDownTimer);
        clearInterval(moleMoveTimer);
    }
}
document.getElementById('moleStart').addEventListener('click', async () => { //start button
    if (!moleStarted) {
        startMole();
        moleStarted = true;
    }
});

//Breakout https://github.com/kubowania/breakout
const breakGrid = document.querySelector('#breakGrid');
const scoreDisplay = document.querySelector('#breakScore')
const breakBlockWidth = 100;
const breakBlockHeight = 20;
const breakBallDiameter = 20
const breakBoardWidth = 600
const breakBoardHeight = 300
let xDirection = -2
let yDirection = 2
let breakStarted = false;

const breakUserStart = [230, 10]
let currentPosition = breakUserStart

const breakBallStart = [270, 40]
let breakBallCurrentPosition = breakBallStart

let breakTimerId
let score = 0

/*//my breakBlock
class BreakBlock {
    constructor(xAxis, yAxis) {
      this.bottomLeft = [xAxis, yAxis]
      this.bottomRight = [xAxis + breakBlockWidth, yAxis]
      this.topRight = [xAxis + breakBlockWidth, yAxis + breakBlockHeight]
      this.topLeft = [xAxis, yAxis + breakBlockHeight]
    }
  }
const breakBlocks = [
    new BreakBlock(10, 270),
    new BreakBlock(120, 270),
    new BreakBlock(230, 270),
    new BreakBlock(340, 270),
    new BreakBlock(450, 270),
    new BreakBlock(10, 240),
    new BreakBlock(120, 240),
    new BreakBlock(230, 240),
    new BreakBlock(340, 240),
    new BreakBlock(450, 240),
    new BreakBlock(10, 210),
    new BreakBlock(120, 210),
    new BreakBlock(230, 210),
    new BreakBlock(340, 210),
    new BreakBlock(450, 210)
];

function addBlocks() {
    for (let i = 0; i < breakBlocks.length; i++) {
      const breakBlock = document.createElement('div')
      breakBlock.classList.add('breakBlock')
      breakBlock.style.left = breakBlocks[i].bottomLeft[0] + 'px'  
      breakBlock.style.bottom = breakBlocks[i].bottomLeft[1] + 'px'  
      breakGrid.appendChild(breakBlock)
    }
  }
  addBlocks()

  document.getElementById('breakStart').addEventListener('click', async () => { //start button
    if (!breakStarted) {
        breakStarted = true;
        breakTimerId = setInterval(moveBall, 30)
    }
});
  //add user
const breakUser = document.createElement('div')
breakUser.classList.add('breakUser')
breakGrid.appendChild(breakUser)
drawUser()

//add breakBall
const breakBall = document.createElement('div')
breakBall.classList.add('breakBall')
breakGrid.appendChild(breakBall)
drawBall()

//move breakUser
function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10
        drawUser()   
      }
      break
    case 'ArrowRight':
      if (currentPosition[0] < (breakBoardWidth - breakBlockWidth)) {
        currentPosition[0] += 10
        drawUser()   
      }
      break
  }
}
document.addEventListener('keydown', moveUser)

//draw User
function drawUser() {
  breakUser.style.left = currentPosition[0] + 'px'
  breakUser.style.bottom = currentPosition[1] + 'px'
}

//draw Ball
function drawBall() {
  breakBall.style.left = breakBallCurrentPosition[0] + 'px'
  breakBall.style.bottom = breakBallCurrentPosition[1] + 'px'
}

//move breakBall
function moveBall() {
    breakBallCurrentPosition[0] += xDirection
    breakBallCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

//check for collisions
function checkForCollisions() {
  //check for breakBlock collision
  for (let i = 0; i < breakBlocks.length; i++){
    if
    (
      (breakBallCurrentPosition[0] > breakBlocks[i].bottomLeft[0] && breakBallCurrentPosition[0] < breakBlocks[i].bottomRight[0]) &&
      ((breakBallCurrentPosition[1] + breakBallDiameter) > breakBlocks[i].bottomLeft[1] && breakBallCurrentPosition[1] < breakBlocks[i].topLeft[1]) 
    )
      {
      const allBlocks = Array.from(document.querySelectorAll('.breakBlock'))
      allBlocks[i].classList.remove('breakBlock')
      breakBlocks.splice(i,1)
      changeDirection()   
      score++
      scoreDisplay.innerHTML = score
      if (breakBlocks.length == 0) {
        scoreDisplay.innerHTML = 'You\'ve Won'
        clearInterval(breakTimerId)
        document.removeEventListener('keydown', moveUser)
      }
    }
  }
  // check for wall hits
  if (breakBallCurrentPosition[0] >= (breakBoardWidth - breakBallDiameter) || breakBallCurrentPosition[0] <= 0 || breakBallCurrentPosition[1] >= (breakBoardHeight - breakBallDiameter))
  {
    changeDirection()
  }

  //check for breakUser collision
  if
  (
    (breakBallCurrentPosition[0] > currentPosition[0] && breakBallCurrentPosition[0] < currentPosition[0] + breakBlockWidth) &&
    (breakBallCurrentPosition[1] > currentPosition[1] && breakBallCurrentPosition[1] < currentPosition[1] + breakBlockHeight ) 
  )
  {
    changeDirection()
  }

  //game over
  if (breakBallCurrentPosition[1] <= 0) {
    clearInterval(breakTimerId)
    scoreDisplay.innerHTML = 'You\'ve lost'
    document.removeEventListener('keydown', moveUser)
  }
}


function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2
    return
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2
    return
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2
    return
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2
    return
  }
}*/

//Frogger https://github.com/kubowania/Frogger
const timeLeftDisplay = document.querySelector('#frogTime')
const frogResultDisplay = document.querySelector('#frogScore')
const frogStart = document.querySelector('#frogStart')
const frogSquares = document.querySelectorAll('.frogGrid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

let currentIndex = 76
const frogWidth = 9
let frogTimerId
let outcomeTimerId
let currentTime = 60

function moveFrog(e) {
    frogSquares[currentIndex].classList.remove('frog')

    switch(e.key) {
        case 'ArrowLeft' :
             if (currentIndex % frogWidth !== 0) currentIndex -= 1
            break
        case 'ArrowRight' :
            if (currentIndex % frogWidth < frogWidth - 1) currentIndex += 1
            break
        case 'ArrowUp' :
            if (currentIndex - frogWidth >=0 ) currentIndex -= frogWidth
            break
        case 'ArrowDown' :
            if (currentIndex + frogWidth < frogWidth * frogWidth) currentIndex += frogWidth
            break
    }
    frogSquares[currentIndex].classList.add('frog')
}

function autoMoveElements() {
    currentTime--
    timeLeftDisplay.textContent = currentTime
    logsLeft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
}

function checkOutComes() {
    lose()
    win()
}

function moveLogLeft(logLeft) {
    switch(true) {
        case logLeft.classList.contains('l1') :
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break
        case logLeft.classList.contains('l2') :
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break
        case logLeft.classList.contains('l3') :
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break
        case logLeft.classList.contains('l4') :
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break
        case logLeft.classList.contains('l5') :
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break
    }
}

function moveLogRight(logRight) {
    switch(true) {
        case logRight.classList.contains('l1') :
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break
        case logRight.classList.contains('l2') :
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break
        case logRight.classList.contains('l3') :
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break
        case logRight.classList.contains('l4') :
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break
        case logRight.classList.contains('l5') :
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break
    }
}

function moveCarLeft(carLeft) {
    switch(true) {
        case carLeft.classList.contains('c1') :
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2') :
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3') :
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break
    }
}

function moveCarRight(carRight) {
    switch(true) {
        case carRight.classList.contains('c1') :
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
            break
        case carRight.classList.contains('c2') :
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break
        case carRight.classList.contains('c3') :
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break
    }
}

function lose() {
    if (
        frogSquares[currentIndex].classList.contains('c1') ||
        frogSquares[currentIndex].classList.contains('l4') ||
        frogSquares[currentIndex].classList.contains('l5') ||
        currentTime <= 0
    ) {
        frogResultDisplay.textContent = 'You\'ve lost'
        clearInterval(frogTimerId)
        clearInterval(outcomeTimerId)
        frogSquares[currentIndex].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog)
    }
}
frogResultDisplay
function win() {
    if (frogSquares[currentIndex].classList.contains('ending-block')) {
        frogResultDisplay.textContent = 'You\'ve won'
        clearInterval(frogTimerId)
        clearInterval(outcomeTimerId)
        document.removeEventListener('keyup', moveFrog)
    }
}

frogStart.addEventListener('click', () => {
    if (frogTimerId) {
        clearInterval(frogTimerId)
        clearInterval(outcomeTimerId)
        outcomeTimerId = null
        frogTimerId = null
        document.removeEventListener('keyup', moveFrog)
    } else {
        frogTimerId = setInterval(autoMoveElements, 1000)
        outcomeTimerId = setInterval(checkOutComes, 50)
        document.addEventListener('keyup', moveFrog)
    }
})
// Connect4 https://github.com/kubowania/connect-four
const connect4Squares = document.querySelectorAll('.connect4Grid div')
const connect4Win = document.querySelector('#connect4Result')
const displayCurrentPlayer = document.querySelector('#connect4Current-player')
let currentPlayer = 1

const winningArrays = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
]

function checkBoard() {
    for (let i = 0; i < winningArrays.length; i++) {
        const square1 = connect4Squares[winningArrays[i][0]]
        const square2 = connect4Squares[winningArrays[i][1]]
        const square3 = connect4Squares[winningArrays[i][2]]
        const square4 = connect4Squares[winningArrays[i][3]]
    
    //check those squares to see if they all have the class of connect4Player-one
    if 
    (square1.classList.contains('connect4Player-one') && 
    square2.classList.contains('connect4Player-one') &&
    square3.classList.contains('connect4Player-one') &&
    square4.classList.contains('connect4Player-one')
    )
     {
        connect4Result.innerHTML = 'Player One Wins!'
    }
    //check squares to see if they all have the class of connect4Player-two
    if 
    (square1.classList.contains('connect4Player-two') && 
    square2.classList.contains('connect4Player-two') &&
    square3.classList.contains('connect4Player-two') &&
    square4.classList.contains('connect4Player-two')
    )
     {
        connect4Result.innerHTML = 'Player Two Wins!'
    }
}
}


for (let i = 0; i < connect4Squares.length; i++) {
    connect4Squares[i].onclick = () => {
        //if the square below your current square is taken,
        //you can go on top of it

        if (connect4Squares[i + 7].classList.contains('taken')) {
          connect4Result.innerHTML = ''
            if (currentPlayer == 1) {
                connect4Squares[i].classList.add('taken')
                connect4Squares[i].classList.add('connect4Player-one')
                currentPlayer = 2
                displayCurrentPlayer.innerHTML = currentPlayer
            }
            else if (currentPlayer ==2) {
            connect4Squares[i].classList.add('taken')
            connect4Squares[i].classList.add('connect4Player-two')
            currentPlayer = 1
            displayCurrentPlayer.innerHTML = currentPlayer
        }
            
        } else connect4Result.innerHTML = 'Can\'t go here'
        checkBoard()
    }
}
//Space Invaders https://github.com/kubowania/space-invaders
/*const spaceGrid = document.querySelector('.spaceGrid')
const spaceScore = document.querySelector('.spaceScore')
let currentShooterIndex = 202
let spaceWidth = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0

for (let i = 0; i < 225; i++) {
  const square = document.createElement('div')
  spaceGrid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.spaceGrid div'))

const alienInvaders = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]

function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if(!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add('invader')
    }
  }
}

draw()

function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove('invader')
  }
}

squares[currentShooterIndex].classList.add('shooter')


function moveShooter(e) {
  squares[currentShooterIndex].classList.remove('shooter')
  switch(e.key) {
    case 'ArrowLeft':
      if (currentShooterIndex % spaceWidth !== 0) currentShooterIndex -=1
      break
    case 'ArrowRight' :
      if (currentShooterIndex % spaceWidth < spaceWidth -1) currentShooterIndex +=1
      break
  }
  squares[currentShooterIndex].classList.add('shooter')
}
document.addEventListener('keydown', moveShooter)

function moveInvaders() {
  const leftEdge = alienInvaders[0] % spaceWidth === 0
  const rightEdge = alienInvaders[alienInvaders.length - 1] % spaceWidth === spaceWidth -1
  remove()

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += spaceWidth +1
      direction = -1
      goingRight = false
    }
  }

  if(leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += spaceWidth -1
      direction = 1
      goingRight = true
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction
  }

  draw()

  if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
    spaceScore.innerHTML = 'GAME OVER'
    clearInterval(invadersId)
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if(alienInvaders[i] > (squares.length)) {
      spaceScore.innerHTML = 'GAME OVER'
      clearInterval(invadersId)
    }
  }
  if (aliensRemoved.length === alienInvaders.length) {
    spaceScore.innerHTML = 'YOU WIN'
    clearInterval(invadersId)
  }
}
invadersId = setInterval(moveInvaders, 600)

function shoot(e) {
  let laserId
  let currentLaserIndex = currentShooterIndex
  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= spaceWidth
    squares[currentLaserIndex].classList.add('laser')

    if (squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.remove('invader')
      squares[currentLaserIndex].classList.add('boom')

      setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
      clearInterval(laserId)

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
      aliensRemoved.push(alienRemoved)
      results++
      spaceScore.innerHTML = results
      console.log(aliensRemoved)

    }

  }
  switch(e.key) {
    case 'ArrowUp':
      laserId = setInterval(moveLaser, 100)
  }
}

document.addEventListener('keydown', shoot)*/