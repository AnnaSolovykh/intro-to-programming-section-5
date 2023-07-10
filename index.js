const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.querySelectorAll('.message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0; // not a constant variable
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;
  hideAllMessages();
  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = 'block';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }
  let remainingAttempts = maxNumberOfAttempts - attempts;
  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = 'block';
    } else if (guess > targetNumber) {
     // tooLowMessage.style.display = 'block';  
     // the number here is too high, not too low 
      tooHighMessage.style.display = 'block';
    }

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;

      // if we write nothing, we get NaN, we need to fix it
      //also, we shouldn't let guess more that 100 and less than 0
    if (isNaN(guess) || guess<=0 || guess >= 100  ) {
      //but this still counts for an attempt, let's fix it
      -- attempts;
      ++ remainingAttempts;
      alert("Type a number from 1 to 99");
      numberOfGuessesMessage.innerHTML = `Your guess doesn't count. <br> ${remainingAttempts} guesses remaining`;
      tooHighMessage.style.display = 'none';
      tooLowMessage.style.display = 'none';
    }

  }

  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true; 
    guessInput.disabled = true; 
  }

  guessInput.value = '';

  resetButton.style.display = '';

}

function hideAllMessages() {
  for (let i = 0; i < messages.length; i++) {
    messages[i].style.display = 'none';
  }
  resetButton.style.display="none";
  //after we reset the game we don't need this button during the game
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
//  maxNumberOfAttempts = 0;  - wrong, 
//  we neet to reset only the number od attemp to start again
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false; // spelling
  guessInput.disabled = false;

  hideAllMessages();
  //  resetButton.style.display = 'none'; 
  //  we need to hide it as we don't need to reset during the game
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
