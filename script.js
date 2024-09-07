const icons = ['📱', '💻', '📺', '📷', '🔊', '📲'];
let cardsArray = [...icons, ...icons];  // Create pairs
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create cards and add to the game board
function createBoard() {
  const gameBoard = document.getElementById('gameBoard');
  shuffle(cardsArray);
  
  cardsArray.forEach((icon) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back">${icon}</div>
      </div>
    `;
    gameBoard.appendChild(card);

    card.addEventListener('click', flipCard);
  });
}

// Flip card function
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Check if the two cards match
function checkForMatch() {
  const isMatch = firstCard.innerHTML === secondCard.innerHTML;

  isMatch ? disableCards() : unflipCards();
}

// Disable matched cards
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

// Unflip cards if not matched
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    
    resetBoard();
  }, 1000);
}

// Reset the board state after each turn
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Initialize the game
createBoard();