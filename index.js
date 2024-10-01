const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const squareAmount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let moveDirection = [{ x: 0, y: 0 }];
let item = [{ x: 5, y: 5 }];

function game() {
    progress();
    draw();
}

function progress {
    const newHead = {
        x: snake[0].x + moveDirection[0].x,
        y: snake[0].y + moveDirection[0].y
    }

    snake.unshift(newHead);



}







function endGame = {
    let snake = [{ x: 10, y: 10 }];
    let moveDirection = [{ x: 0, y: 0 }];
    let item = [{ x: 5, y: 5 }];
}