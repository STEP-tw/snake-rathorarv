let snake = undefined;
let food = undefined;
let numberOfRows = 60;
let numberOfCols = 120;
let animator = undefined;

const animateSnake = function() {
  let oldHead = snake.getHead();
  let oldTail = snake.move();
  let head = snake.getHead();
  let game = new Game(numberOfRows,numberOfCols);
  if (head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows, numberOfCols);
    drawFood(food);
  }
  if (game.hasSnakeTouchWall()) {
    clearInterval(animator);
    displayGameOver();
    return;
  };
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if (snake.checkForTouchBody()) {
    clearInterval(animator);
    displayGameOver();
  }
}

const changeSnakeDirection = function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const addKeyListener = function() {
  let grid = document.getElementById("keys");
  grid.onkeyup = changeSnakeDirection;
  grid.focus();
}

const createSnake = function() {
  let tail = new Position(12, 10, "west");
  let body = [];
  body.push(tail);
  body.push(tail.next());
  let head = tail.next().next();

  snake = new Snake(head, body);
}

const createFood = function(numberOfRows, numberOfCols) {
  food = generateRandomPosition(numberOfCols, numberOfRows);
}

const startGame = function() {
  createSnake();
  drawGrids(numberOfRows, numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows, numberOfCols);
  drawFood(food);
  addKeyListener();
  animator = setInterval(animateSnake, 140);
}

const restart = function(){
  location.reload();
}
window.onload = startGame;
