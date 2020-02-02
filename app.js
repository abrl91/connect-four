// colors
const COLOR_EMPTY_CELL = "white";
const COLOR_PLAYER1 = "red";
const COLOR_PLAYER2 = "yellow";

// game parameters
const COLS = 7; // number of game columns
const ROWS = 6; // number of game rows === tableRow.length
const HORIZONTAL_WIN = 4;
const VERTICAL_WIN = 3;
const DIAGONAL_COLS = 4;
const DIAGONAL_RIGHT_WIN = 3;

// text
const TEXT_TIE = "DRAW";
const TEXT_WIN = "WINS!";

let player1;
let player2;
let player1Color;
let player2Color;
let currentPlayer = 1;

let gamePlaying = true;

let tableRow = document.getElementsByTagName('tr');
let tableCell = document.getElementsByTagName('td');
let slots = document.querySelectorAll('.slot');
const playerTurn = document.querySelector('.player-turn');
const resetBtn = document.querySelector('.reset');
const startGameBtn = document.querySelector('.start-game');

startPlay = () => {
    startGameBtn.style.display = 'none';
    while (!player1){
        player1 = prompt(`Player One: Enter your name. You will be ${COLOR_PLAYER1}.`);
    }
    player1Color = COLOR_PLAYER1;

    while (!player2){
        player2 = prompt(`Player Two: Enter your name. You will be ${COLOR_PLAYER2}.`);
    }
    player2Color = COLOR_PLAYER2;

    playerTurn.textContent = `${player1}'s turn!`;


// Functions

    const checkWinsOrDraw = e => {
        // Get clicked column index
        let column = e.target.cellIndex;
        let row = [];

        // check the bottom row first
        for (let i = 5; i > -1; i--) {
            if (tableRow[i].children[column].style.backgroundColor === COLOR_EMPTY_CELL && gamePlaying){
                row.push(tableRow[i].children[column]);
                if (currentPlayer === 1) {
                    row[0].style.backgroundColor = COLOR_PLAYER1;
                    if (horizontalCheck() || verticalCheck() || diagonalRightCheck() || diagonalLeftCheck()) {
                        playerTurn.textContent = `${player1} ${TEXT_WIN}!!`;
                        playerTurn.style.color = player1Color;
                        gamePlaying = false;
                        // return alert(`${player1} ${TEXT_WIN}!!`);
                    } else if (drawCheck()) {
                        playerTurn.textContent = TEXT_TIE;
                        return alert(`${TEXT_TIE}`);
                    } else {
                        playerTurn.textContent = `${player2}'s turn`;
                        return currentPlayer = 2;
                    }
                } else {
                    row[0].style.backgroundColor = COLOR_PLAYER2;
                    if (horizontalCheck() || verticalCheck() || diagonalRightCheck() || diagonalLeftCheck()) {
                        playerTurn.textContent = `${player2} ${TEXT_WIN}!!`;
                        playerTurn.style.color = player2Color;
                        gamePlaying = false;
                        // return alert(`${player2} ${TEXT_WIN}!!`);
                    } else if (drawCheck()) {
                        playerTurn.textContent = TEXT_TIE;
                        return alert(`${TEXT_TIE}`);
                    } else{
                        playerTurn.textContent = `${player1}'s turn`;
                        return currentPlayer = 1;
                    }

                }
            }
        }

    };

    Array.prototype.forEach.call(tableCell, (cell) => {
        cell.addEventListener('click', checkWinsOrDraw);
        // set all slots to white for new game.
        cell.style.backgroundColor = COLOR_EMPTY_CELL;
    });


    const colorMatchCheck = (one, two, three, four) => {
        return (one === two && one === three && one === four && one !== COLOR_EMPTY_CELL && one !== undefined);
    };

    const horizontalCheck = () => {
        // 6 rows
        for (let row = 0; row < tableRow.length; row++) {
            // four4 possible ways to win horizontally in a row
            for (let col = 0; col < HORIZONTAL_WIN; col++){
                if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor,tableRow[row].children[col+1].style.backgroundColor,
                    tableRow[row].children[col+2].style.backgroundColor, tableRow[row].children[col+3].style.backgroundColor)){
                    return true;
                }
            }
        }
    };

    const verticalCheck = () => {
        // 7 columns
        for (let col = 0; col < COLS; col++) {
            // 3 possible ways to win vertically in a column
            for (let row = 0; row < VERTICAL_WIN; row++){
                if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col].style.backgroundColor,
                    tableRow[row+2].children[col].style.backgroundColor,tableRow[row+3].children[col].style.backgroundColor)){
                    return true;
                }
            }
        }
    };

    const diagonalRightCheck = () => {
        // 4 filled cells
        for(let col = 0; col < DIAGONAL_COLS; col++){
            // 3 ways for diagonal
            for (let row = 0; row < DIAGONAL_RIGHT_WIN; row++){
                if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col+1].style.backgroundColor,
                    tableRow[row+2].children[col+2].style.backgroundColor,tableRow[row+3].children[col+3].style.backgroundColor)){
                    return true;
                }
            }
        }

    };

    const diagonalLeftCheck = () => {
        for(let col = 0; col < DIAGONAL_COLS; col++) {
            // start from 5 (the bottom row) and as long as I am in a row that greater then index 2 (start from index 0 --> the top row) I can make a diagonal
            for (let row = 5; row > 2; row--){
                if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row-1].children[col+1].style.backgroundColor,
                    tableRow[row-2].children[col+2].style.backgroundColor,tableRow[row-3].children[col+3].style.backgroundColor)){
                    return true;
                }
            }
        }
    };

    const drawCheck = () => {
        let fullSlot = [];
        for (let i = 0; i < tableCell.length; i++){
            if (tableCell[i].style.backgroundColor !== COLOR_EMPTY_CELL){
                fullSlot.push(tableCell[i]);
            }
        }
        if (fullSlot.length === tableCell.length){
            return true;
        }
    };


    resetBtn.addEventListener('click', () => {
        slots.forEach(slot => {
            slot.style.backgroundColor = COLOR_EMPTY_CELL;
        });
        playerTurn.style.color = 'black';
        gamePlaying = true;
        return (currentPlayer === 1 ? playerTurn.textContent = `${player1}'s turn` : playerTurn.textContent = `${player2}'s turn`);
    });


};

















// play vs computer - minimax algorithm
// ----------------------------------//
// return a value if a terminal state is found (+10, 0, -10)
// go through available spots on the board
// call the minimax function on each available spot (recursion)
// evaluate returning values from function calls  and return the best value

