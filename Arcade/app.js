const board = document.getElementById("board");
const context = board.getContext("2d");
const scoreDisplay = document.getElementById("score");
const roundDisplay = document.getElementById("round");
const highestScoreDisplay = document.getElementById("highestScore");
const title = document.getElementById("title");
const subtitle = document.querySelector(".subtitle");
const startButton = document.getElementById("start")
const resetButton = document.getElementById("reset");
class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let speed = 6;
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

const scoreHistory = [];
let highestScore = 0;
let speedIncrease = false;

window.onload = function startScreen () {
    board.style.display = "none";
    resetButton.style.display = "none";
    subtitle.style.display = "none";
    startButton.style.margin = "200px";
}

startButton.addEventListener("click", function () {
    startButton.style.display = "none";
    board.style.display = "block";
    subtitle.style.display = "flex";
    scoreDisplay.innerText = `Current Score:${score}`;
    roundDisplay.innerText = `Round:${round}`;
    highestScoreDisplay.innerText = `Highest Score:${highestScore}`;

    renderBoard();
});

function renderBoard () {
    moveSnake();
    let result = checkGameOver ();
    if (result) {
        return;
    }
    
    if (score > 2 && !speedIncrease) {
        speed += 3;
        console.log('speedIncrease:', speedIncrease);
        speedIncrease = true;
        console.log('speed', speed);
        console.log('speedIncrease:', speedIncrease)
    }
    clearBoard();
    checkEatApple();
    renderApple();
    renderSnake();
    setTimeout(renderBoard, 1000 / speed);

    
    //unoptimized score inc
    /*
    if (score > 3) {
        speed = 9;
    }
    if (score > 6) {
        speed = 11;
    }
    if (score > 9) {
        speed = 14;
    }
    if (score > 14) {
        speed = 17;
    }*/
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
        resetButton.style.display = "block";
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
        scoreDisplay.innerText = `Current Score:${score}`;
        console.log('score', score);
        
        scoreHistory.push(score)
        console.log("scoreHistory",scoreHistory);
        getHighestScore();
        highestScoreDisplay.innerHTML = `Highest Score:${highestScore}`;
    }
}

function getHighestScore () {
   highestScore =  Math.max(...scoreHistory);
   console.log("highestScore", highestScore, "type", typeof highestScore);
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

resetButton.addEventListener("click", function () {
    clearBoard();

    snakeSegments.length = 0;
    snakeBody = 2;
    snakeHeadX = 10;
    snakeHeadY = 10;
    renderSnake();

    appleX = 5
    appleY = 5
    renderApple();

    speedX = 0;
    speedY = 0;

    setTimeout(renderBoard, 1000 / speed);

    score = 0;
    scoreDisplay.innerText = `Score:${score}`;

    round++;
    roundDisplay.innerText = `Round:${round}`;

    title.innerText = "Snake";
    title.style.color = "white";
    
    resetButton.style.display = "none";
});

