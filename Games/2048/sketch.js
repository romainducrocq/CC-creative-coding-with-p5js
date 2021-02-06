let grid;
let score = 0;

let touchStartX;
let touchStartY;
let minTouch = 50;

let canvas;

let titleDiv;
let scoreDiv;

let newButton;

let cStroke;
let cText;
let c0;
let c2;
let c4;
let c8;
let c16;
let c32;
let c64;
let c128;
let c256;
let c512;
let c1024;
let c2048;

function emptyGrid() {
  return [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
}

function setup() {

  canvas = createCanvas(410, 410);
  canvas.position(0, 50);
  noLoop();

  cStroke = color(187, 173, 160);
  cText = color(119, 110, 101);
  c0 = color(205, 193, 180);
  c2 = color(238, 228, 218);
  c4 = color(237, 224, 200);
  c8 = color(242 ,177 ,121);
  c16 = color(245 ,149 ,99);
  c32 = color(246 ,124 ,95);
  c64 = color(246 ,94 ,59);
  c128 = color(237 ,207 ,114);
  c256 = color(237 ,204 ,98);
  c512 = color(237 ,200 ,80);
  c1024 = color(237 ,197 ,63);
  c2048 = color(237 ,194 ,45);

  grid = emptyGrid();

  addNumber();
  addNumber();

  updateCanvas();

  titleDiv = createDiv("2048");
  titleDiv.position(10, 10);
  titleDiv.style('font-size', '24px');
  titleDiv.style('font-family','Ubuntu, sans-serif');
  titleDiv.style('color',color(51));

  scoreDiv = createDiv("Score: " + score);
  scoreDiv.position(width/2 + 10, 10);
  scoreDiv.style('font-size', '24px');
  scoreDiv.style('font-family','Ubuntu, sans-serif');
  scoreDiv.style('color',color(51));

  newButton = createButton("NEW");
  newButton.position(10, height + canvas.y + 10);
  newButton.style('font-size', '16px');
  newButton.style('font-family','Ubuntu, sans-serif');
  newButton.style('color',color(51));
  newButton.mousePressed(newGame);
}

function draw() {
}

function updateCanvas() {
  background(cStroke);
  drawGrid();
}

function addNumber() {
  let emptyCells = [];
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      if(grid[i][j] === 0){
        emptyCells.push({
          x: i,
          y: j
        });
      }
    }
  }
  if(emptyCells.length > 0){
    let cell = random(emptyCells);
    grid[cell.x][cell.y] = random(2) > 0.5 ? 2 : 4;
  }
}

function slide(row) {
  let arr = row.filter(val => val);
  let zeros = Array(4 - arr.length).fill(0);
  arr = zeros.concat(arr);
  return arr;
}

function combine(row) {
  for(let i = 3; i >= 1; i--){
    let a = row[i];
    let b = row[i-1];
    if(a === b){
      row[i] = a + b;
      row[i-1] = 0;
      score += row[i];
      scoreDiv.html("Score: " + score);
    }
  }
  return row;
}

function operate() {
  for(let i = 0; i < 4; i++){
    grid[i] = slide(grid[i]);
    grid[i] = combine(grid[i]);
    grid[i] = slide(grid[i]);
  }
}

function flipGrid() {
  for(let i = 0; i < 4; i++) {
    grid[i].reverse();
  }
}

function rotateGrid() {
  let rotGrid = emptyGrid();
  for(let i = 0; i < 4; i++) {
    for(let j = 0; j < 4; j++) {
      rotGrid[i][j] = grid[j][i];
    }
  }
  grid = rotGrid;
}

function isGameOver() {
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      if(grid[i][j] === 0){
        return false;
      }
      if(j < 3 && grid[i][j] === grid[i][j + 1]) {
        return false;
      }
      if(i < 3 && grid[i][j] === grid[i + 1][j]) {
        return false;
      }
    }
  }
  return true;
}

/*function copyGrid(grid) {
  let cp = emptyGrid();

  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      cp[i][j] = grid[i][j];
    }
  }
  return cp;
}

function compareGrids(a, b) {
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      if(a[i][j] !== b[i][j]){
        return true;
      }
    }
  }
  return false;
}*/

function down(){
  //let cp = copyGrid(grid);
  operate();
  //if(compareGrids(cp, grid)){
  addNumber();
  //}
  updateCanvas();
  if(isGameOver()){
    fill(0);
    textSize(64);
    text("GAME OVER", width/2, height/2);
  }
}

function up() {
  flipGrid();
  //let cp = copyGrid(grid);
  operate();
  flipGrid();
  //if(compareGrids(cp, grid)){
  addNumber();
  //}
  updateCanvas();
  if(isGameOver()){
    fill(0);
    textSize(64);
    text("GAME OVER", width/2, height/2);
  }
}

function right() {
  rotateGrid();
  //let cp = copyGrid(grid);
  operate();
  rotateGrid();
  //if(compareGrids(cp, grid)){
  addNumber();
  //}
  updateCanvas();
  if(isGameOver()){
    fill(0);
    textSize(64);
    text("GAME OVER", width/2, height/2);
  }
}

function left() {
  rotateGrid();
  flipGrid();
  //let cp = copyGrid(grid);
  operate();
  flipGrid();
  rotateGrid();
  //if(compareGrids(cp, grid)){
  addNumber();
  //}
  updateCanvas();
  if(isGameOver()){
    fill(0);
    textSize(64);
    text("GAME OVER", width/2, height/2);
  }
}

function keyPressed() {
  if(keyCode === DOWN_ARROW){
    down();
  }else if (keyCode === UP_ARROW){
    up();
  }else if (keyCode === RIGHT_ARROW){
    right();
  }else if (keyCode === LEFT_ARROW){
    left();
  }
}

function drawGrid() {
  let w = (width-10)/4;
  strokeWeight(10);
  textAlign(CENTER, CENTER);
  textSize(32);
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
        stroke(cStroke);
      if(grid[i][j] === 0){
        fill(c0);
        rect(i*w + 5, j*w + 5, w, w, 10);
      }else{
        switch (grid[i][j]) {
          case 2:
            fill(c2);
            break;
          case 4:
            fill(c4);
            break;
          case 8:
            fill(c8);
            break;
          case 16:
            fill(c16);
            break;
          case 32:
            fill(c32);
            break;
          case 64:
            fill(c64);
            break;
          case 128:
            fill(c128);
            break;
          case 256:
            fill(c256);
            break;
          case 512:
            fill(c512);
            break;
          case 1024:
            fill(c1024);
            break;
          case 2048:
            fill(c2048);
            break;
          default:
            fill(c2048);
            break;
        }
        rect(i*w + 5, j*w + 5, w, w, 10);
        fill(cText);
        noStroke();
        text(grid[i][j], i * w + w/2 + 5, j * w + w/2 + 10);
      }
    }
  }
}

function newGame() {
  grid = emptyGrid();
  addNumber();
  addNumber();

  updateCanvas();

  score = 0;
  scoreDiv.html("Score: " + score);
}

function touchStarted(event) {
  touchStartX = mouseX;
  touchStartY = mouseY;
}

function touchEnded(event) {
  if(abs(mouseY - touchStartY) >= abs(mouseX - touchStartX)){
    if(abs(mouseY - touchStartY) >= minTouch){
      if(touchStartY < mouseY){
        down();
      }else{
        up();
      }
    }
  }else{
    if(abs(mouseX - touchStartX) >= minTouch){
      if(touchStartX <= mouseX){
        right();
      }
      else {
        left();
      }
    }
  }
}
