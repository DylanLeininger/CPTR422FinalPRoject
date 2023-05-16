let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

// Function to make a move
function makeMove(index) {
  if (!gameOver && board[index] === '') {
    board[index] = currentPlayer;
    document.getElementsByClassName('cell')[index].innerText = currentPlayer;
    checkWin();
    togglePlayer();
    if (!gameOver && currentPlayer === 'O') {
      makeComputerMove();
    }
  }
}

// Function to toggle players
function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to make a computer move
function makeComputerMove() {
  let availableMoves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
        availableMoves.push(i);
      }
    }
    if (availableMoves.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      const move = availableMoves[randomIndex];
      setTimeout(() => makeMove(move), 500);
    }
  }
  
  // Function to check for a win
  function checkWin() {
    const winningPositions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]              // Diagonals
    ];
  
    for (let i = 0; i < winningPositions.length; i++) {
      const [a, b, c] = winningPositions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        gameOver = true;
        document.getElementById('message').innerText = `Player ${currentPlayer} wins!`;
        break;
      }
    }
  
    if (!board.includes('') && !gameOver) {
      gameOver = true;
      document.getElementById('message').innerText = "It's a draw!";
    }
  }
  
  // Function to reset the game
  function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = '';
    }
    document.getElementById('message').innerText = '';
  }
  // Add an event listener to the reset button
  document.getElementById('resetButton').addEventListener('click', resetGame);