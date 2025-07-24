const cells = document.querySelectorAll(".cell");
const statusDisplay = document.querySelector(".status");
const resetButton = document.querySelector(".reset");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Combinations to win the game
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Fill the input box on each click.
function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (boardState[index] !== "" || !gameActive) return;

    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    // Add class for styling
    event.target.classList.add(currentPlayer === "X" ? "player-x" : "player-o");

    checkResult();
}

// To check the game result after moves.
function checkResult() {
    let roundWon = false;// if no round won

    for (let condition of winningCombinations) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            // Highlight winning cells
            condition.forEach(index => cells[index].classList.add('winning-cell'));
            break;
        }
    }
    // Winning condition for a player
    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} Wins! Want to Play Again Reset the Game`;
        gameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        statusDisplay.textContent = "It's a Tie!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

// Reset the board after each gameplay
function resetGame() {
    boardState.fill("");
    gameActive = true;
    currentPlayer = "X";
    statusDisplay.textContent = "Player X's Turn"; // Corrected initial turn message
    cells.forEach(cell => {
        cell.textContent = "";
        // Remove player and winning classes
        cell.classList.remove("player-x", "player-o", "winning-cell");
    });
}



// Setting the onClick Listener for each click on the desired area.
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);