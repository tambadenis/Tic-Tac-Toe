// Variables declarations
let isGameActive = true;
let currentPlayer = "X";
let gameStatus = ["", "", "", "", "", "", "", "", ""];

// Constants declarations
const statusDisplay = document.querySelector('.status'); // I stored the game status in the h2 element with "status" class from HTML

const currentPlayerTurn = function() { 
    return "It's " + currentPlayer + " s turn";
}

const winningMessage = function() {
    return "Player " + currentPlayer + " has won!";
} 

const drawMessage = function() { 
    return "It's a draw!"; 
}

const winningConditions = [ // Combinations of Cells for winning situations
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

statusDisplay.innerHTML = currentPlayerTurn(); // Store a message to show which player's turn it is

function handlePlayersSwitch(){
    if (currentPlayer === "X") {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('index'));

    if (gameStatus[clickedCellIndex] !== "" || !isGameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameStatus[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handleResultValidation() {
    let isRoundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let x = gameStatus[winCondition[0]];
        let y = gameStatus[winCondition[1]];
        let z = gameStatus[winCondition[2]];
        if (x === '' || y === '' || z === '') {
            continue;
        }
        if (x === y && y === z) {
            isRoundWon = true;
            break;
        }
    }

    if (isRoundWon) {
        statusDisplay.innerHTML = winningMessage();
        isGameActive = false;
        return;
    }

    let roundDraw = !gameStatus.includes("");

    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        isGameActive = false;
        return;
    }

    handlePlayersSwitch();
}

function handleRestartGame() {
    window.location.reload();
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick)); // Add the event listener to the cells 
document.querySelector('.reset').addEventListener('click', handleRestartGame); // Add the event listener to the "Play again" button