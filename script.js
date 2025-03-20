let gameBoard = document.querySelector('.board');
let blockCell = document.querySelectorAll('.board-cell');
const restartBtn = document.querySelector('.restart-btn');
const winnerDisplay = document.querySelector('.winner-text');
const body = document.querySelector('body');
let marker = 'cross';
let winner = '';
let counter = 0;
let winCounter1 = 0;
let winCounter2 = 0;

console.log(blockCell);

blockCell.forEach((cell) => {
    cell.addEventListener('click', () => {
        if (winner || cell.classList.contains('circle') || cell.classList.contains('cross')) return;
        cell.classList.add(marker);
        cell.textContent = marker === 'cross' ? 'x' : 'o';
        counter++;
        if (checkWinner(marker)) return;
        changeMarker();
        noWinners();
        
    })
})

function changeMarker() {
    marker = marker === 'circle' ? 'cross' : 'circle';
}


const Gameboard = (function() {
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];

    function getBoard() {
        return board;
    }
    return { getBoard };
})();

function Player (player, marker) {
    this.player = player;
    this.marker = marker;
}

function resetBoard() {
    blockCell.forEach(cell => {
        cell.classList.remove('cross', 'circle', 'win-color');
        cell.textContent = '';
    });

    winner = ''; 
    gameBoard.style.pointerEvents = 'auto'; 
    counter = 0;
    winnerDisplay.textContent = '';
    marker = 'cross';

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
            winner = `Player 1 win!`;
        
        }
        else {
            winCounter2++;
            winner = `Player 2 win!`;
           
        } 
        displayWinCounter(winCounter1, winCounter2);
    }
    // if (winCounter1 === 10 || winCounter2 === 10) {
    //     winner = winCounter1 === 10 ? 'Player 1' : 'Player 2';
    //     endGame(`Victory belongs to Player 1!`);
    // }
        
    }

    // winner = marker === 'circle' ? 'Player 2 win!' : 'Player 1 win!';



let winScore = document.createElement('p');
winScore.classList.add('win-score');
winScore.textContent = 'Player 1: 0 | Player 2: 0'
body.appendChild(winScore);

function displayWinCounter(win1, win2) {
    if (winCounter1 === 10 || winCounter2 === 10) {
        winner = winCounter1 === 10 ? 'Victory belongs to Player 1' : 'Victory belongs to Player 2'
        winCounter1 = 0;
        winCounter2 = 0;
        winScore.textContent = 'Player 1: 0 | Player 2: 0';
        endGame(winner);
    }
    else {
        winScore.textContent = `Player 1: ${win1} | Player 2: ${win2}`;
    }

}

function noWinners() {
    if (!winner && counter === 9) {
        winner = 'What a pity, there are no winners!'
        endGame(winner);
    }
}

function endGame(winner) {
    gameBoard.style.pointerEvents = 'none';
    winnerDisplay.textContent = winner;
}

restartBtn.addEventListener('click', () => {
    resetBoard();
})
