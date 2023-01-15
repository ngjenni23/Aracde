const board = document.getElementById("board");
const context = board.getContext("2d");
const scoreDisplay = document.getElementById("score");
const roundDisplay = document.getElementById("round");
const title = document.getElementById("title");
const startButton = document.getElementById("start")
const resetButton = document.getElementById("reset");
class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let speed = 5;
let boardSize = 20;
let cellSize = board.width / boardSize - 2;

let snakeHeadX = 10;
let snakeHeadY = 10;
const snakeSegments = [];
let snakeBody = 2;

let appleX = 5;
let appleY = 5;

let speedX = 0;
let speedY = 0;

let score = 0;
let round = 1;

startButton.addEventListener("click", function () {
    renderBoard();
});

function renderBoard () {
    moveSnake();
    let result = checkGameOver ();
    if (result) {
        return;
    }
    clearBoard();
    
    checkEatApple();
    renderApple();
    renderSnake();
    setTimeout(renderBoard, 1000 / speed);

    if (score > 2) {
        speed = 8;
    }
    if (score > 6) {
        speed = 11;
    }
    if (score > 10) {
        speed = 14;
    }
    if (score > 15) {
        speed = 17;
    }
}

function checkGameOver () {
    let gameOver = false;
    
    if (speedX === 0 && speedY === 0 ) {
        return false;
    }

    if (snakeHeadX < 0 || snakeHeadX === boardSize) {
        gameOver = true;
    }
    if (snakeHeadY < 0 || snakeHeadY === boardSize) {
        gameOver = true;
    }
    for (let i = 0; i < snakeSegments.length; i++) {
        let part = snakeSegments[i];
        if (part.x === snakeHeadX && part.y === snakeHeadY) { 
            gameOver = true;
            break;
        }
    }
    if (gameOver) {
        title.innerText = "Game Over!";
        title.style.color = "red";
    }
    return gameOver;
}

function clearBoard () {
    context.fillStyle = 'black';
    context.fillRect(0,0, board.clientWidth, board.height);
}

function renderSnake () {
   context.fillStyle = 'green';
    for (let i = 0; i < snakeSegments.length; i++) {
        let part = snakeSegments[i];
        context.fillRect(part.x * boardSize, part.y * boardSize, cellSize, cellSize);
    }

    snakeSegments.push(new SnakePart(snakeHeadX, snakeHeadY));
    if(snakeSegments.length > snakeBody) {
        snakeSegments.shift();
    }

    context.fillStyle = 'lime';
    context.fillRect(snakeHeadX * boardSize, snakeHeadY * boardSize, cellSize, cellSize);
}

function moveSnake () {
    snakeHeadX = snakeHeadX + speedX;
    snakeHeadY = snakeHeadY + speedY;
}

function renderApple () {
    context.fillStyle = "red";
    context.fillRect(appleX * boardSize, appleY * boardSize, cellSize, cellSize);
}

function checkEatApple () {
    if (snakeHeadX === appleX && snakeHeadY === appleY) {
        appleX = Math.floor(Math.random() * boardSize);
        appleY = Math.floor(Math.random() * boardSize);
        snakeBody++;
        score++;
        console.log('score', score);
    }
}

//SCORE DISPLAY NOT UPDATING
function renderScore () {
    scoreDisplay.innerText = `Score: ${score}`;
}
//ROUND NOT RENDERING
function renderRound () {
    roundDisplay.innterText = `Round: ${round}`;
    console.log('round', round);
}

document.body.addEventListener('keydown', moveDirection);

function moveDirection(event) {
    if (event.keyCode == 38) {
        if (speedY == 1) {
            return;
        }
        speedY = -1;
        speedX = 0;
    }
    if (event.keyCode == 40) {
        if (speedY == -1) {
            return;
        }
        speedY = 1;
        speedX = 0;
    }
    if (event.keyCode == 37) {
        if (speedX == 1) {
            return;
        }
        speedY = 0;
        speedX = -1;
    }
    if (event.keyCode == 39) {
        if (speedX == -1) {
            return;
        }
        speedY = 0;
        speedX = 1;
    }
}

//Does not fully reset game
resetButton.addEventListener("click", function () {

    let score = 0;

    round++;
    title.innerText = "Snake";
    title.style.color = "white";
    
});

renderScore();
renderRound();