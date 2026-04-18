const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status span');
const overlay = document.getElementById('winnerOverlay');
const winnerMsg = document.getElementById('winnerMsg');

const popSound = document.getElementById('popSound');
const winSound = document.getElementById('winSound');

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
    const idx = e.target.getAttribute('data-index');

    if (gameState[idx] !== "" || !gameActive) return;

    // Play soft pop sound
    popSound.currentTime = 0;
    popSound.play();

    gameState[idx] = currentPlayer;
    e.target.innerText = currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());

    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        winSound.play();
        showModal(`Yay! Player ${currentPlayer} Won! ✨`);
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        showModal("It's a Tie! 🧸");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = currentPlayer;
}

function showModal(msg) {
    winnerMsg.innerText = msg;
    overlay.style.display = "flex";
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.innerText = "X";
    overlay.style.display = "none";
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('x', 'o');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('resetBtn').addEventListener('click', resetGame);