const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let score = document.querySelector(".score");
const reset = document.querySelector('.reset')
let scoreCount = 0;
const gridSize = 20;
canvas.width = 400;
canvas.height = 400;
const squareAmount = canvas.width / gridSize;
let previousResults = document.querySelector('.previous-results');
let stringResults = localStorage.getItem('statistic');
let results;



if (stringResults) {
    results = JSON.parse(stringResults);
} else {
    results = [];
};
console.log(results)
const foodAudio = new Audio('src/food.mp3');
const moveAudio = new Audio('src/move.mp3');
const endGameAudio = new Audio('src/gameover.mp3');
const winAudio = new Audio('src/win.mp3');

let snake = [{ x: 10, y: 10 }];
let moveDirection = { x: 1, y: 0 };
let item = { x: 5, y: 5 };

let startOrNot = false;
document.addEventListener('keydown', (interaction) => {
    startOrNot = true;
    });

function game() {
    if (startOrNot) {
        progress();
        drawSnake();
    }
}

function progress() {
    const newHead = {
        x: snake[0].x + moveDirection.x,
        y: snake[0].y + moveDirection.y
    }
    if (
      newHead.x < 0 ||
      newHead.x > squareAmount ||
      newHead.y < 0 ||
      newHead.y > squareAmount
    ) {
        endGame();
        endGameAudio.play();
      return;
    }

   snake.unshift(newHead);
    if (
        newHead.x === item.x && newHead.y === item.y) {
        item = {
            x: Math.floor(Math.random() * squareAmount),
            y: Math.floor(Math.random() * squareAmount)
        }

        scoreCount++
        if (scoreCount === 10) {
            score.innerHTML = `You win, your score: ${scoreCount}`;
            clearTimeout(interval);
            winAudio.play();

        }
                else {
            score.innerHTML = (`Your score: ${scoreCount}`)
        }
        foodAudio.play()

        drawFood();
    }
    else {
       snake.pop();
    }
}


function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(
          segment.x * gridSize,
          segment.y * gridSize,
          gridSize,
          gridSize
        );
        drawFood();
    });

}

function drawFood() {
  ctx.fillStyle = 'red';
    ctx.fillRect(
      item.x * gridSize,
      item.y * gridSize,
      gridSize,
      gridSize
    );
}

function endGame() {
    snake = [{ x: 10, y: 10 }];
    moveDirection = [{ x: 1, y: 0 }];
    item = [{ x: 5, y: 5 }];
    score.innerHTML = `You failed with the score ${scoreCount}`;
    results.unshift(scoreCount);

    localStorage.setItem('statistic', JSON.stringify(results));
}
function resultsHistory() {
    previousResults.innerHTML = `Previous results: `;
    results.forEach(score => {
    previousResults.innerHTML += '<br> ' + score;
    })
}

reset.addEventListener('click', resetGame);
function resetGame() {
    scoreCount = 0;
    snake = [{ x: 10, y: 10 }];
    moveDirection = { x: 1, y: 0 };
    item = { x: 5, y: 5 };
    game();
    resultsHistory();
    }

window.addEventListener('keydown', action => {
    clearInterval(interval);

    switch (action.key) {
        case 'ArrowUp':
            moveAudio.play()
            if (moveDirection.y === 0) moveDirection = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            moveAudio.play();
            if (moveDirection.y === 0) moveDirection = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            moveAudio.play();
            if (moveDirection.x === 0) moveDirection = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            moveAudio.play();
            if (moveDirection.x === 0) moveDirection = { x: 1, y: 0 };
            break;
    }
    progress();
    interval = setInterval(game, 200);
});

drawFood();
let interval = setInterval(game, 200);