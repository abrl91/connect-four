let player1;
while (!player1){
    player1 = prompt('Player One: Enter your name. You will be red.');
}
let player1Color = 'red';

let player2;
while (!player2){
    player2 = prompt('Player Two: Enter your name. You will be yellow.');
}
let player2Color = 'yellow';

let tableRow = document.getElementsByTagName('tr');
let tableCell = document.getElementsByTagName('td');
let slots = document.querySelectorAll('.slot');
const playerTurn = document.querySelector('.player-turn');
const resetBtn = document.querySelector('.reset');

let currentPlayer = 1;
playerTurn.textContent = `${player1}'s turn!`;

// Log cell coordinates when clicked

for (let cell = 0; cell < tableCell.length; cell++){
    tableCell[cell].addEventListener('click', (e) =>{
        console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`)
    });
}


// Functions

changeColor = e => {
    // Get clicked column index
    console.log(e.target.cellIndex);
    let column = e.target.cellIndex;
    let row = [];

    // check the bottom row first
    for (let i = 5; i > -1; i--) {
        if (tableRow[i].children[column].style.backgroundColor === 'white'){
            row.push(tableRow[i].children[column]);
            if (currentPlayer === 1) {
                row[0].style.backgroundColor = 'red';
                if (horizontalCheck() || verticalCheck() || diagonalRightCheck() || diagonalLeftCheck()){
                    playerTurn.textContent = `${player1} WINS!!`;
                    playerTurn.style.color = player1Color;
                    return alert(`${player1} WINS!!`);
                } else if (drawCheck()) {
                    playerTurn.textContent = 'DRAW!';
                    return alert('DRAW!');
                } else {
                    playerTurn.textContent = `${player2}'s turn`;
                    return currentPlayer = 2;
                }
            } else {
                row[0].style.backgroundColor = 'yellow';
                if (horizontalCheck() || verticalCheck() || diagonalRightCheck() || diagonalLeftCheck()){
                    playerTurn.textContent = `${player2} WINS!!`;
                    playerTurn.style.color = player2Color;
                    return alert(`${player2} WINS!!`);
                } else if (drawCheck()) {
                    playerTurn.textContent = 'DRAW!';
                    return alert('DRAW!');
                } else{
                    playerTurn.textContent = `${player1}'s turn`;
                    return currentPlayer = 1;
                }

            }
        }
    }
};

Array.prototype.forEach.call(tableCell, (cell) => {
    cell.addEventListener('click', changeColor);
    // set all slots to white for new game.
    cell.style.backgroundColor = 'white';
});

colorMatchCheck = (one, two, three, four) => {
    return (one === two && one === three && one === four && one !== 'white' && one !== undefined);
};

horizontalCheck = () => {
    for (let row = 0; row < tableRow.length; row++) {
        // four possible ways to win horizontally in a row
        for (let col = 0; col < 4; col++){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor,tableRow[row].children[col+1].style.backgroundColor,
                tableRow[row].children[col+2].style.backgroundColor, tableRow[row].children[col+3].style.backgroundColor)){
                return true;
            }
        }
    }
};

verticalCheck = () => {
    // 7 columns
    for (let col = 0; col < 7; col++) {
        // three possible ways to win vertically in a column
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col].style.backgroundColor,
                tableRow[row+2].children[col].style.backgroundColor,tableRow[row+3].children[col].style.backgroundColor)){
                return true;
            }
        }
    }
};

diagonalRightCheck = () => {
    // 4 ways for diagonal
    for(let col = 0; col < 4; col++){
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col+1].style.backgroundColor,
                tableRow[row+2].children[col+2].style.backgroundColor,tableRow[row+3].children[col+3].style.backgroundColor)){
                return true;
            }
        }
    }

};

diagonalLeftCheck = () => {
    for(let col = 0; col < 4; col++) {
        for (let row = 5; row > 2; row--){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row-1].children[col+1].style.backgroundColor,
                tableRow[row-2].children[col+2].style.backgroundColor,tableRow[row-3].children[col+3].style.backgroundColor)){
                return true;
            }
        }
    }
};

drawCheck = () => {
    let fullSlot = [];
    for (let i = 0; i < tableCell.length; i++){
        if (tableCell[i].style.backgroundColor !== 'white'){
            fullSlot.push(tableCell[i]);
        }
    }
    if (fullSlot.length === tableCell.length){
        return true;
    }
};

resetBtn.addEventListener('click', () => {
    slots.forEach(slot => {
        slot.style.backgroundColor = 'white';
    });
    playerTurn.style.color = 'black';
    return (currentPlayer === 1 ? playerTurn.textContent = `${player1}'s turn` : playerTurn.textContent = `${player2}'s turn`);
});
