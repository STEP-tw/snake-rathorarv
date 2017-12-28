const Game = function(numberOfRows,numberOfCols){
  this.rows = numberOfRows;
  this.columns = numberOfCols;
  this.snake = {};
}

Game.prototype.addSnake = function(snake){
  this.snake = snake;
}

Game.prototype.hasSnakeTouchWall = function() {
  return !this.snake.isWithinRange(this.rows,this.columns);
};
