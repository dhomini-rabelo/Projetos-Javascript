// Web elements
let weResetButton = document.querySelector('.reset');
let weBoxes = document.querySelectorAll('.item');
let weTurn = document.querySelector('.vez');
let weResult = document.querySelector('.resultado');

// Initial Data
let body = {
    a1 : '', a2 : '', a3 : '',
    b1 : '', b2 : '', b3 : '',
    c1 : '', c2 : '', c3 : '',
};
let turn = Math.random() <= 0.5 ? 'x' : 'o';
let winner = '';
let finished = false;

 // Events
reset();
weResetButton.addEventListener('click', reset);
weBoxes.forEach((item) => (item.addEventListener('click', changeBox)));

// Functions
function reset(){
    winner = '';
    for (let i in body) {body[i] = '';};
    finished = false;
    turn = turn == 'x' ? 'o' : 'x';
    renderBody();
    renderInfo();
}

function renderBody(){
    for (let i in body){
        item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = body[i];
    }
}

function renderInfo(){
    weTurn.innerHTML = turn;
    weResult.innerHTML = winner;
}

function changeBox(event){
    let box = event.target.getAttribute('data-item');
    if (!finished && body[box] == ''){
        body[box] = turn;
        renderBody();
        checkGame();
        turn = turn == 'x' ? 'o' : 'x';
        renderInfo();
    }
}

function checkGame(){
    if (checkWinner('x')){
        winner = 'O "x" venceu';
        finished = true;
    } else if (checkWinner('o')){
        winner = 'O "o" venceu';
        finished = true;
    } else if (checkFull()){
        winner = 'Deu velha';
        finished = true;
    }
}

function checkWinner(player){
    let optionsToWin = [
        'a1, a2, a3',
        'b1, b2, b3',
        'c1, c2, c3',

        'a1, b1, c1',
        'a2, b2, c2',
        'a3, b3, c3',

        'a1, b2, c3',
        'a3, b2, c1',
    ];
    for (let win in optionsToWin){
        let possibilities = optionsToWin[win].split(', ');
        let won = possibilities.every(option => body[option] === player);
        if (won){
            return true;
        }
    }
    return false;
}

function checkFull(){
    for (let i in body){
        if (body[i] == ''){
            return false;
        }
    }
    return true;
}