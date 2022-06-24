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

//my breakBlock
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
}

//Frogger https://github.com/kubowania/Frogger
const timeLeftDisplay = document.querySelector('#frogTime')
const resultDisplay = document.querySelector('#frogScore')
const frogStart = document.querySelector('#frogStart')
const squares = document.querySelectorAll('.frogGrid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

let currentIndex = 76
const width = 9
let frogTimerId
let outcomeTimerId
let currentTime = 60

function moveFrog(e) {
    squares[currentIndex].classList.remove('frog')

    switch(e.key) {
        case 'ArrowLeft' :
             if (currentIndex % width !== 0) currentIndex -= 1
            break
        case 'ArrowRight' :
            if (currentIndex % width < width - 1) currentIndex += 1
            break
        case 'ArrowUp' :
            if (currentIndex - width >=0 ) currentIndex -= width
            break
        case 'ArrowDown' :
            if (currentIndex + width < width * width) currentIndex += width
            break
    }
    squares[currentIndex].classList.add('frog')
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
        squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('l5') ||
        currentTime <= 0
    ) {
        resultDisplay.textContent = 'You\'ve lost'
        clearInterval(frogTimerId)
        clearInterval(outcomeTimerId)
        squares[currentIndex].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog)
    }
}

function win() {
    if (squares[currentIndex].classList.contains('ending-block')) {
        resultDisplay.textContent = 'You\'ve won'
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