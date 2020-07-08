let currentPlayer = "X";

let gameActive = true; // change to false when the game is over - back to true when the restart button is pressed

let gameState = ['','','','','','','','',''];

let msg = document.querySelector('h2');

let winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

document.querySelector('.btnRestart').addEventListener('click', handleRestartButton);

msg.innerHTML = currentPlayer + "'s turn";

function handleRestartButton() {
    gameState = ['','','','','','','','',''];
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
    currentPlayer = 'X';
    gameActive = true;
}

function handleCellClick(e) {
    const cellClicked = e.target;

    const cellClickedIndex = parseInt(cellClicked.getAttribute('data-cell-index'));

    gameState[cellClicked] = currentPlayer;

    // update game if cell is not taken
    if(gameState[cellClickedIndex] !== "" || !gameActive) {
        return
    }

    updateGame(cellClicked, cellClickedIndex);

    // check if game is over
    checkGameOver();

}

function updateGame(cellClicked, cellClickedIndex) {
    gameState[cellClickedIndex] = currentPlayer;
    cellClicked.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    msg.innerHTML = currentPlayer + "'s turn";
}

function checkGameOver() {
    let roundWon = false;

    for(let i=0, max = winCondition.length; i < max; i++) {
        let winConditions = winCondition[i];
        let a = gameState[winConditions[0]];
        let b = gameState[winConditions[1]];
        let c = gameState[winConditions[2]];

        if(a === '' || b === '' || c === '') {
            continue;
        }

        if(a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if(roundWon) {
        msg.innerHTML = "GAME OVER!";
        gameActive = false;
        return;
    }

    let roundTie = gameState.includes('');
    if(!roundTie) {
        msg.innerHTML = "TIE GAME!";
        gameActive = false;
        return
    }

    handlePlayerChange();
}