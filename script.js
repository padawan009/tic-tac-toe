let gameBoard = document.querySelector('.board');
let blockCell = document.querySelectorAll('.board-cell');
const restartBtn = document.querySelector('.restart-btn')
let marker = 'cross';
let winner ='';

console.log(blockCell);

function changeMarker() {
    marker = marker === 'circle' ? 'cross' : 'circle';
}

changeMarker();

blockCell.forEach((cell) => {
    cell.addEventListener('click', () => {
        if (winner || cell.classList.contains('circle') || cell.classList.contains('cross')) return;

        cell.classList.add(marker);
        cell.textContent = marker === 'cross' ? 'X' : 'O';
        if (checkWinner(marker)) return;
        changeMarker();
        console.log()
    })
})

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
    const board = Gameboard.getBoard();

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = ''; 
        }
    }

    blockCell.forEach(cell => {
        cell.classList.remove('cross', 'circle', 'win-color');
        cell.textContent = '';
    });

    winner = ''; 
    gameBoard.style.pointerEvents = 'auto'; 
}

const winnerCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWinner(marker) {
    let i = 0;
    while (i < winnerCombinations.length) {
        if (blockCell[winnerCombinations[i][0]].classList.contains(marker) && 
        blockCell[winnerCombinations[i][1]].classList.contains(marker) && 
        blockCell[winnerCombinations[i][2]].classList.contains(marker)) {
            blockCell[winnerCombinations[i][0]].classList.add('win-color'); 
            blockCell[winnerCombinations[i][1]].classList.add('win-color'); 
            blockCell[winnerCombinations[i][2]].classList.add('win-color');
            winner = marker;
            endGame(winner);
            console.log(winner);
            return true;
        }
        i++;
    }
    return false;
}


function endGame(winner) {
    gameBoard.style.pointerEvents = 'none';
    alert('game is overrrr')
}

restartBtn.addEventListener('click', () => {
    resetBoard();
})
