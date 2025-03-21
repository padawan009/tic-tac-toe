let gameBoard = document.querySelector('.board');
let blockCell = document.querySelectorAll('.board-cell');
const restartBtn = document.querySelector('.restart-btn');
const winnerDisplay = document.querySelector('.winner-text');
const winScore = document.querySelector('.win-score');
const inputValuePlayer1 = document.querySelector('#player1');
const inputValuePlayer2 = document.querySelector('#player2');
const submitInputBtn = document.querySelectorAll('.submit-name-btn')
let marker = 'cross';
let winner = '';
let cellCounter = 0;
let winCounter1 = 0;
let winCounter2 = 0;
let player1 = '';
let player2 = '';

console.log(blockCell);

function checkInputs() {
    if (!inputValuePlayer1.value.trim() && !inputValuePlayer2.value.trim()) {
        alert('Enter the names of the players before starting the game.!');
        return false;
    }
    else if (!inputValuePlayer1.value.trim() || !inputValuePlayer2.value.trim()) {
        alert('Enter the names of BOTH players!');
        return false;
    }
    return true;
}

function submitInputs() {
    submitInputBtn.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            player1 = inputValuePlayer1.value.trim() || 'Player 1';
            player2 = inputValuePlayer2.value.trim() || 'Player 2';

            winCounter1 = 0;
            winCounter2 = 0;

            winScore.innerHTML = `${player1}: ${winCounter1} | ${player2}: ${winCounter2}`;
            checkInputs();
        })
    });
}


function startGame() {
    blockCell.forEach((cell) => {
        cell.addEventListener('click', () => {
            if (!checkInputs()) return;

            if (winner || cell.classList.contains('circle') || cell.classList.contains('cross')) return;

            cell.classList.add(marker);
            cell.textContent = marker === 'cross' ? 'x' : 'o';
            cellCounter++;

            if (checkWinner(marker)) return;
            changeMarker();
            noWinners();
        })
    })
}


function changeMarker() {
    marker = marker === 'circle' ? 'cross' : 'circle';
}


// const Gameboard = (function() {
//     let board = [
//         ['', '', ''],
//         ['', '', ''],
//         ['', '', ''],
//     ];

//     function getBoard() {
//         return board;
//     }
//     return { getBoard };
// })();

function resetBoard() {
    blockCell.forEach(cell => {
        cell.classList.remove('cross', 'circle', 'win-color');
        cell.textContent = '';
    });

    winner = ''; 
    gameBoard.style.pointerEvents = 'auto'; 
    cellCounter = 0;
    winnerDisplay.textContent = '';
    marker = 'cross';

    if (winCounter1 === 10 || winCounter2 === 10) {
        winCounter1 = 0;
        winCounter2 = 0;
        winScore.innerHTML = `${player1}: 0 | ${player2}: 0`;
    }
}

const winnerCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWinner(marker) {
    for (let combination of winnerCombinations) {
        if (
            blockCell[combination[0]].classList.contains(marker) && 
            blockCell[combination[1]].classList.contains(marker) && 
            blockCell[combination[2]].classList.contains(marker)
        ) {
            combination.forEach(index => blockCell[index].classList.add('win-color'))
            countWin(marker);
            endGame(winner);
            console.log(winner);
            return true;
        }
    }
    return false;
}

function countWin(marker) {
    if (winCounter1 < 10 && winCounter2 < 10) {
        if (marker === 'cross') {
            winCounter1++;
            winner = `${player1} wins!`;
        }
        else {
            winCounter2++;
            winner = `${player2} wins!`; 
        } 
        displayWinCounter(winCounter1, winCounter2);
    }
}

function displayWinCounter(winCounter1, winCounter2) {
    if (winCounter1 === 10 || winCounter2 === 10) {
        winner = winCounter1 === 10 ? `Victory belongs to ${player1}` : `Victory belongs to ${player2}`
        endGame(winner);
    }
    winScore.innerHTML = `${player1}: <span>${winCounter1}</span> | ${player2}: <span>${winCounter2}</span>`;
}

function noWinners() {
    if (!winner && cellCounter === 9) {
        winner = 'What a pity, there are no winners!'
        endGame(winner);
    }
}

function endGame(message) {
    gameBoard.style.pointerEvents = 'none';
    winnerDisplay.textContent = message;
}

restartBtn.addEventListener('click', () => {
    resetBoard();
})

submitInputs();
startGame();