// initBoard------------------------------------------------

const gameboard = document.querySelector('#board');
const numbers = document.querySelector('#numbers');
const letters = document.querySelector('#letters');

let isWhite = true;
let letter = 'ABCDEFGH';
let indNumber = 0;//index of numbers on chessboard
let indLetter = 0;// index of letters on chessboard
//build 64 tiles of chessboard
for (let i = 1; i <= 64; i++) {
    let tile = document.createElement('div');
    tile.classList.add('tile');
    if (!isWhite) {
        tile.classList.add('black');
    }
    tile.setAttribute('id', indNumber.toString() + indLetter.toString());
    isWhite = !isWhite;
    indLetter++;
    //every 8 loops preserve color of the tile
    //increase index of numbers
    //reset index of letters
    if (i % 8 === 0) {
        isWhite = !isWhite;
        indNumber++;
        indLetter = 0;
    }
    gameboard.appendChild(tile);
}
//build numbers and letters indication lines
for (let i = 1; i <= 8; i++) {
    let numberli = document.createElement('li');
    numberli.textContent = i;
    numbers.appendChild(numberli);
    let letterli = document.createElement('li');
    letterli.textContent = letter.charAt(i - 1);
    letters.appendChild(letterli);
}


// main script----------------------------------------

//work array that indicates placement of queens
//index indicates letters (columns) on chessboard and numbers- numbers (rows) on chessboard
let arr = [];
//amount of solutions (92 in ttl)
let count = 0;
//array of all 92 solutions (arrays that indicates placement of 8 queens)
//number of solution indicates index of solution in resultArr
let resultArr = [];
//solution that currently displays on chessboard
let currentArr = [];

//this is recursion function
let eightQeens = (arr, i = 0) => {
    //if it is end of the board (8 column doesnt exist) 
    //save solution in resultArr  
    //Dom- place div with number of solution in menu 
    if (i == 8) {
        saveResutAndDom();
        return;
    }
    // if (i == -1) {
    //     return;
    // }
    for (arr[i] = 0; arr[i] < 8; arr[i]++) {
        if (checkPlacement(i)) {
            //if queen not threating previos queen repeat function:
            // check placement of next queen on next column
            eightQeens(arr, i + 1)
        }
    }
}

//save solution in resultArr  
//Dom- place div with number of solution in menu 
function saveResutAndDom() {
    count++;
    console.log('total deals: ' + count + ' numbers are: ' + arr);
    let currentResult = [...arr];
    resultArr.push(currentResult);
    let solutionMenu = document.getElementById('solutions');
    let solutionNum = document.createElement('div');
    solutionNum.classList.add('solutionNum');
    solutionNum.innerHTML = count;
    //click on every number displays solution on chessboard
    solutionNum.addEventListener('click', (event) => { displayQueens(event) });
    solutionMenu.appendChild(solutionNum);
}

function displayQueens(e) {
    //clear chessboard before display next solution
    if (currentArr != []) {
        erase();
    }
    let solutionNum = e.target.innerHTML;//take number if solution
    currentArr = [...resultArr[solutionNum - 1]]//pick required array from all solutions
    console.log(currentArr);
    //unravel placement of all 8 queens and draw them on chessboard
    currentArr.forEach((val, i) => {
        let currentTile = document.getElementById((7 - val.toString()) + i.toString());
        if (currentTile.classList.contains('black')) {
            currentTile.innerHTML = '&#9813;';
        } else {
            currentTile.innerHTML = '&#9819;';
        }
    });
}
//check if the queen threaten previos queen
function checkPlacement(i) {
    for (let j = 0; j < i; j++) {
        if (arr[i] == arr[j] || Math.abs(arr[i] - arr[j]) == i - j) {
            return false;
        }
    }
    return true;
}
eightQeens(arr);

//Dom- create erase button in menu after all 92 solution numbers
let solutionMenu = document.getElementById('solutions');
let eraseBtn = document.createElement('div');
eraseBtn.innerHTML = 'erase';
eraseBtn.addEventListener('click', erase);
eraseBtn.setAttribute('id', 'eraseBtn');
solutionMenu.appendChild(eraseBtn);

//clear board
function erase() {
    currentArr.forEach((val, i) => {
        let currentTile = document.getElementById((7 - val.toString()) + i.toString());
        currentTile.innerHTML = "";
    });
}

