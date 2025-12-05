let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('.guessSubmit');
const userInput = document.querySelector('.guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const loworHigh = document.querySelector('.loworhigh');
const startOver = document.querySelector('.result');

const p = document.createElement(`p`);

let prevGuess = [];
let numGuesses = 1;
let playGame = true;

if (playGame) {
  submit.addEventListener('click', function(e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  })
}

function validateGuess(guess) {
  if (isNaN(guess) || guess < 1 || guess > 100) {
    alert('Please enter a valid number between 1 and 100!');
  } else {
    prevGuess.push(guess);
    if (numGuesses == 10) {
      displayGuess(guess);
      displayMessage(`Game Over. Random number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess == randomNumber) {
    displayMessage(`You guessed it right`);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`Guess is toooo LOW!`);
  } else {
    displayMessage(`Guess is toooo HIGH!`);
  }
}

function displayGuess(guess) {
  userInput.value = ``;
  guessSlot.innerHTML += `${guess}  `;
  numGuesses++;
  remaining.innerHTML = `${11 - numGuesses}`
}

function displayMessage(message) {
  loworHigh.innerHTML = `<h3>${message}</h3>`
}

function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function(e) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuesses = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${11 - numGuesses}`
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
  })
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<h3 id="newGame">Start new game</h3>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}