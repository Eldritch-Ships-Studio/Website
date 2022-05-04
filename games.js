//Rock Paper Scissors
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
        computerChoice = 'rock'
    }
    if (randomNumber === 1) {
        computerChoice = 'paper'
    }
    if (randomNumber === 2) {
        computerChoice = 'scissors'
    }
    computerChoiceDisplay.innerHTML = computerChoice
}

function getResult() {
    if (computerChoice === userChoice) {
        result = 'You\'ve drawn'
      }
      if (computerChoice === 'rock' && userChoice === "paper") {
        result = 'You\'ve won'
      }
      if (computerChoice === 'rock' && userChoice === "scissors") {
        result = 'You\'ve lost'
      }
      if (computerChoice === 'paper' && userChoice === "scissors") {
        result = 'You\'ve won'
      }
      if (computerChoice === 'paper' && userChoice === "rock") {
        result = 'You\'ve lost'
      }
      if (computerChoice === 'scissors' && userChoice === "rock") {
        result = 'You\'ve won'
      }
      if (computerChoice === 'scissors' && userChoice === "paper") {
        result = 'You\'ve lost'
      }
      rpsResultDisplay.innerHTML = result
}
//Memory
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
const memResultDisplay = document.getElementById('memResult');
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
        cards[cardsChosenId[0]].setAttribute('src','./Resources/memory/white.png');
        cards[cardsChosenId[1]].setAttribute('src','./Resources/memory/white.png');
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
    memResultDisplay.innerHTML = cardsWon.length;

    if (cardsWon.length == cards.length/2) {
        memResultDisplay.innerHTML = 'You\'re a winner';

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