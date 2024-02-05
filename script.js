document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetBtn = document.getElementById("resetBtn");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    function renderBoard() {
        board.innerHTML = "";
        gameBoard.forEach((value, index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = value;
            cell.addEventListener("click", () => handleCellClick(index));
            board.appendChild(cell);
        });
    }

    function handleCellClick(index) {
        if (gameBoard[index] === "" && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                status.textContent = `Player ${currentPlayer} wins!`;
            } else if (gameBoard.every(cell => cell !== "")) {
                status.textContent = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.textContent = `Current player: ${currentPlayer}`;
            }
        }
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]            
        ];

        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }

    function resetGame() {
        currentPlayer = "X";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        status.textContent = `Current player: ${currentPlayer}`;
        renderBoard();
    }

    resetBtn.addEventListener("click", resetGame);

    resetGame(); 
});
