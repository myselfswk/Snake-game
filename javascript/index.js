
// Direction, our snake is still when game is start
// Game constants and variable
let inputDir = {
    x: 0,
    y: 0
}

// audio of the game
const foodSound = new Audio('./Sounds/food.mp3');
const gameOverSound = new Audio('./Sounds/gameover.mp3');
const moveSound = new Audio('./Sounds/move.mp3');
const musicSound = new Audio('./Sounds/music.mp3');

//speed variable is used to speed up the snake
let speed = 10;
let lastPaintTime = 0;
let score = 0;

// Snake Array
let snakeArr = [
    //it is like x-axis and y-axis co-ordinates
    { x: 13, y: 15 }
]

food = { x: 6, y: 7 }

// Game Functions
function main(ctime) {
    //this function will call again and again
    window.requestAnimationFrame(main);
    //constrol FPS to speed down
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }

    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //if you bump into yourself
    for (let j = 1; j < snakeArr.length; j++) {
        if (snake[j].x === snake[0].x && snake[j].y === snake[0].y) {
            return true;
        }
    }

    //if you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    // updating the snake array
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        // musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over, Press any key to play again");
        snakeArr = [
            { x: 13, y: 15 }
        ]

        // musicSound.play();
        score = 0;
    }

    //if you eaten the food, increament the score and regenerate the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score += 1;
        if (score > highscoreval) {
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "High Score: ".concat(highscoreval);
        }
        scoreBox.innerHTML = "Score: ".concat(score);
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        })

        let a = 2;
        let b = 16;

        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        }
    }

    //Moving the Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // const element = snakeArr[i];
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // render the food and snake
    board.innerHTML = "";
    //board is an id picks by innerHTML

    //Display the Snake
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    })

    //Display the Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');

    board.appendChild(foodElement);
}

// Game main Logic
// musicSound.play();

let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
} else {
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "High Score: ".concat(highscore);
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }  //start the game
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})