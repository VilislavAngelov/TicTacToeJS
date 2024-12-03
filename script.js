//trying to find a way to map the visual board to the backend board. maybe putting an area label with row and col coordinates on the html cells is cheating but that's what I though of.
function gameBoard() {
  const board = [];

  const makeBoard = () => {
    for (i = 0; i < 3; i++) {
      let row = [];
      for (j = 0; j < 3; j++) {
        row[j] = 0;
      }
      board[i] = row;
    }
  };

  const getBoard = () => board;

  const getRow = (row) => board[row];

  const getColumn = (column) => board.map((row) => row[column]);

  const getDiagonalL = () => [board[0][0],board[1][1],board[2][2]]

  const getDiagonalR = () => [board[0][2],board[1][1],board[2][0]]

  const getCell = (row, column) => board[row][column];

  const setCell = (row, column, marker) => {
    if (board[row][column] != 0) {
      console.log("There's already a marker in this cell");
      return;
    }
    board[row][column] = marker;
  };

  return { getBoard, getRow, getColumn, getCell, setCell, makeBoard, getDiagonalL, getDiagonalR };
}

function player(name, marker) {
  const playerName = name;
  const playerMarker = marker;
  return { name, marker };
}

function gameController() {
  const board = gameBoard();
  const player1 = player("p1", "O");
  const player2 = player("p2", "X");
  let currentPlayer = player1;
  const visual = visualController();

  board.makeBoard();

  document.addEventListener('click', (e) => {
    if(e.target.classList.contains("cell")){
        e.target.innerHTML = "<h1>X</h1>"
    }
    
})

  const playRound = (i, j) => {
    board.setCell(i, j, currentPlayer.marker);
    if (board.getCell(i, j) == currentPlayer.marker) {
      console.log(board.getBoard().map((row) => [...row]));
      if (checkWin()) {
        board.makeBoard();
        return;
      }
      switchPlayer();
    }
  };

  const switchPlayer = () =>
    (currentPlayer = currentPlayer === player1 ? player2 : player1);

  function checkWin() {
    for (let i = 0; i < 3; i++) {
      if (
        board.getRow(i).every((cell) => cell === currentPlayer.marker) ||
        board.getColumn(i).every((cell) => cell === currentPlayer.marker) ||
        board.getDiagonalL().every((cell) => cell === currentPlayer.marker) ||
        board.getDiagonalR().every((cell) => cell === currentPlayer.marker)
      ) {
        console.log(`${currentPlayer.name} won the game!`);
        return true;
      }
    }
  }

  return { playRound };
}

function visualController() {
    const visualBoard = () => document.getElementById('board');
    const cells = () => document.querySelectorAll('.cell');

    return {visualBoard, cells};
}

const game = gameController();
