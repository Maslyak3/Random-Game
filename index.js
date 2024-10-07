const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
canvas.width = 400;
canvas.height = 400;
const squareAmount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let moveDirection = { x: 1, y: 0 };
let item = { x: 5, y: 5 };

function game() {
    progress();
    drawSnake();
}

function progress() {
    const newHead = {
        x: snake[0].x + moveDirection.x,
        y: snake[0].y + moveDirection.y
    }
    console.log(newHead);

   snake.unshift(newHead);
    if (
        newHead.x === item.x && newHead.y === item.y) {
        item = {
            x: Math.floor(Math.random() * squareAmount),
            y: Math.floor(Math.random() * squareAmount)
        }
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

// function endGame() {
//     snake = [{ x: 10, y: 10 }];
//     moveDirection = [{ x: 1, y: 0 }];
//     item = [{ x: 5, y: 5 }];

// }

window.addEventListener('keydown', action => {
    clearInterval(interval);

    switch (action.key) {
        case 'ArrowUp':
            if (moveDirection.y === 0) moveDirection = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (moveDirection.y === 0) moveDirection = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (moveDirection.x === 0) moveDirection = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (moveDirection.x === 0) moveDirection = { x: 1, y: 0 };
            break;
    }
    progress();
    interval = setInterval(game, 500);
});

drawFood();
let interval = setInterval(game, 500);