
    const gameboard = document.querySelector('.board');
    const numbers = document.querySelector('.numbers');
    const letters = document.querySelector('.letters');

    let isWhite = true;
    let letter = 'ABCDEFGH';

    for (let i = 1; i <= 64; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        if (!isWhite) {
            square.classList.add('black');
        }
        isWhite = !isWhite;
        if (i % 8 === 0) {
            isWhite = !isWhite;
        }
        gameboard.appendChild(square);
    }
    for (let i = 1; i <= 8; i++) {
        let numberli = document.createElement('li');
        numberli.textContent = i;
        numbers.appendChild(numberli);
        let letterli = document.createElement('li');
        letterli.textContent = letter.charAt(i - 1);
        letters.appendChild(letterli);
    }




