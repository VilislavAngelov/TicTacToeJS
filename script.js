//after each playRound the console logs undefined which idk where it's coming frrom and alos checkwin doesn't work yet.
function gameBoard() {

    const board = [];

    for(i = 0; i < 3; i++) {
        let row = [];
        for(j = 0; j < 3; j++){
            row[j] = 0;
        }
        board[i] = row
    }

    const getBoard = () => board;

    const getRow = (row) => board[row];

    const getColumn = (column) => board.map(row => row[column]);

    const getCell = (row,column) => board[row][column];
    

    const setCell = (row,column,marker) => {
        if(board[row][column] != 0) {
            console.log("There's already a marker in this cell")
            return;
        }
        board[row][column] = marker;
    }

    return {getBoard, getRow, getColumn, getCell, setCell};
};

function player(name, marker) {
    const playerName = name; 
    const playerMarker = marker
    return {name, marker}
}

function gameController() {
    const board = gameBoard();
    const player1 = player("p1", "O");
    const player2 = player("p2", "X");
    let currentPlayer = player1;

    let gameOver = false;

    const playRound = (i, j) => {
        board.setCell(i, j, currentPlayer.marker);

        checkWin();
        switchPlayer();
        console.log(board.getBoard().map(row => [...row]));
    }

    const switchPlayer = () => currentPlayer = currentPlayer === player1 ? player2 : player1;


    function checkWin() {
        for(i = 0; i < 3; i++) {
            if( board.getRow(i) == [currentPlayer.marker, currentPlayer.marker, currentPlayer.marker] ||
                board.getColumn(i) == [currentPlayer.marker, currentPlayer.marker, currentPlayer.marker]
             ) {
                console.log(`${currentPlayer} won the game!`)
                return;
             }
        }
    }


    console.log(board.getBoard().map(row => [...row]));

    return {playRound};

}

const game = gameController();