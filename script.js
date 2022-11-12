let score = 0;
let fps = 0;
let maxStep = 6;

let config = {
  stop: 0,
  sizeCell: 16,
  sizeBarry: 16,
};
let snake = {
  x: 160,
  y: 160,
  dx: config.sizeCell,
  dy: 0,
  tails: [],
  maxTails: 1,
};
let berry = {
  x: 16,
  y: 16,
};

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const scoreBlock = document.querySelector("#score-num");
const options = document.querySelector("#options");

const controller = document.querySelector(".controller");
const leftArrow = document.querySelector(".leftArrow");
const rightArrow = document.querySelector(".rightArrow");
const topArrow = document.querySelector(".topArrow");
const bottomArrow = document.querySelector(".bottomArrow");

if (window.innerWidth > 668) {
  controller.style.display = "none";
}

options.addEventListener("click", function (e) {
  if (e.target.options.selectedIndex == 0) maxStep = 6;
  else if (e.target.options.selectedIndex == 1) maxStep = 3;
  else if (e.target.options.selectedIndex == 2) maxStep = 1;
});

document.addEventListener("keydown", function (e) {
  if (e.keyCode === 37 && snake.dx === 0) {
    snake.dx = -config.sizeCell;
    snake.dy = 0;
  } else if (e.keyCode === 38 && snake.dy === 0) {
    snake.dx = 0;
    snake.dy = -config.sizeCell;
  } else if (e.keyCode === 39 && snake.dx === 0) {
    snake.dx = config.sizeCell;
    snake.dy = 0;
  } else if (e.keyCode === 40 && snake.dy === 0) {
    snake.dx = 0;
    snake.dy = config.sizeCell;
  }
});
leftArrow.addEventListener("click", function (e) {
  if (snake.dx === 0) {
    snake.dx = -config.sizeCell;
    snake.dy = 0;
  }
});
topArrow.addEventListener("click", function (e) {
  if (snake.dy === 0) {
    snake.dx = 0;
    snake.dy = -config.sizeCell;
  }
});
rightArrow.addEventListener("click", function (e) {
  if (snake.dx === 0) {
    snake.dx = config.sizeCell;
    snake.dy = 0;
  }
});
bottomArrow.addEventListener("click", function (e) {
  if (snake.dy === 0) {
    snake.dx = 0;
    snake.dy = config.sizeCell;
  }
});

function gameLoop() {
  requestAnimationFrame(gameLoop);
  if (++fps < maxStep) {
    // 60 / 6 = 10fps tezlik bilan kadr almashadi
    return;
  }
  fps = 0;

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawBerry();
}

function drawSnake() {
  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x >= canvas.width) {
    snake.x = 0;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  } else if (snake.x < 0) {
    snake.x = canvas.width;
  } else if (snake.y < 0) {
    snake.y = canvas.height;
  }

  snake.tails.unshift({ x: snake.x, y: snake.y });

  if (snake.tails.length > snake.maxTails) {
    snake.tails.pop();
  }

  snake.tails.forEach(function (el, index) {
    if (index === 0) {
      context.fillStyle = "#fa0556";
    } else {
      context.fillStyle = "#a00034";
    }
    context.fillRect(el.x, el.y, config.sizeCell, config.sizeCell);

    if (el.x === berry.x && el.y === berry.y) {
      snake.maxTails++;
      incScore();
      randomPositionBerry();
    }

    for (let i = index + 1; i < snake.tails.length; i++) {
      if (el.x == snake.tails[i].x && el.y == snake.tails[i].y) {
        refreshGame();
      }
    }
  });
}
function drawBerry() {
  context.fillStyle = "#fff";
  context.fillRect(berry.x, berry.y, config.sizeBarry, config.sizeBarry);
}
function randomPositionBerry() {
  berry.x = getRandomInt(0, 20) * config.sizeBarry;
  berry.y = getRandomInt(0, 25) * config.sizeBarry;
}
function incScore() {
  score++;
  drawScore();
}
function drawScore() {
  scoreBlock.innerHTML = score;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function refreshGame() {
  score = 0;
  snake.x = 160;
  snake.y = 160;
  snake.dx = config.sizeCell;
  snake.dy = 0;
  snake.tails = [];
  snake.maxTails = 1;
  randomPositionBerry();
  scoreBlock.innerHTML = 0;
}

gameLoop();
