let canvas;

let cells = [];
let cols;
let rows;
let resolution = 30;
let currentCell;
let stack = [];

let colorPath;
let colorCurrent;

let titleDiv;
let resDiv;

let resSlider;

let newButton;

function setup() {
  canvas = createCanvas(0, 0);
  canvas.position(0, 50);
  setSize((windowWidth < 600 ? windowWidth : 600), ((windowHeight - 100) < 600 ? (windowHeight - 100) : 600));

  colorPath = color(floor(random(255)), floor(random(255)), floor(random(255)));
  colorCurrent = color(floor(random(255)), floor(random(255)), floor(random(255)));

  cols = width / resolution;
  rows = height / resolution;
  for(let j = 0; j < rows; j++){
    for(let i = 0; i < cols; i++){
      let cell = new Cell(i, j);
      cells.push(cell);
    }
  }

  currentCell = cells[0];

  titleDiv = createDiv("Maze generator");
  titleDiv.position(10,10);
  titleDiv.style('font-size', '24px');
  titleDiv.style('font-family','Ubuntu, sans-serif');
  titleDiv.style('color',color(51));

  resDiv = createDiv("Zoom : ");
  resDiv.position(10, height + canvas.y + 10);
  resDiv.style('font-size', '16px');
  resDiv.style('font-family','Ubuntu, sans-serif');
  resDiv.style('color',color(51));

  resSlider = createSlider(20, 40, 30, 10);
  resSlider.position(60, height + canvas.y + 10);
  resSlider.size(100);

  newButton = createButton("NEW");
  newButton.position(resSlider.width + resSlider.x + 10, height + canvas.y + 10);
  newButton.style('font-size', '16px');
  newButton.style('font-family','Ubuntu, sans-serif');
  newButton.style('color',color(51));
  newButton.mousePressed(newMaze);
}

function index(i, j){
  return i + j*cols;
}

function removeWalls(a, b) {
  if(abs(a.i-b.i) === 1) {
    a.walls[2+a.i-b.i] = false;
    b.walls[2-a.i+b.i] = false;
  }else{
    a.walls[1-a.j+b.j] = false;
    b.walls[1+a.j-b.j] = false;
  }
}

function draw() {

  background(51);

  for(let i = 0; i < cells.length; i++) {
    cells[i].show();
  }
  currentCell.highlight();

  currentCell.visited = true;
  let nextCell = currentCell.checkNeighbors();
  if(nextCell) {
    nextCell.visited = true;
    stack.push(currentCell);
    removeWalls(currentCell, nextCell);
    currentCell = nextCell;
  }else if(stack.length > 0){
    currentCell = stack.pop();
  }
}

function setSize(w, h) {
  let maxWidth = getMaxWidth();
  let maxHeight = getMaxHeight();

  if(isNaN(w) || w < 1){
    w = width;
  }else if(w > maxWidth){
    w = maxWidth;
  }
  if(isNaN(h) || h < 1){
    h = height;
  }else if(h > maxHeight){
    h = maxHeight;
  }

  if(w%resolution !== 0){
      w += (resolution - w%resolution);
      if(w > maxWidth){
        w -= resolution;
      }
  }
  if(h%resolution !== 0){
      h += (resolution - h%resolution);
      if(h > maxHeight){
        h -= resolution;
      }
  }

  resizeCanvas(w, h);
}

function getMaxWidth() {
  return windowWidth;
}

function getMaxHeight() {
  return windowHeight - canvas.y;
}

function newMaze() {
  newCells = [];
  resolution = resSlider.value();
  stack = [];

  setSize((windowWidth < 600 ? windowWidth : 600), ((windowHeight - 100) < 600 ? (windowHeight - 100) : 600));

  colorPath = color(floor(random(255)), floor(random(255)), floor(random(255)));
  colorCurrent = color(floor(random(255)), floor(random(255)), floor(random(255)));

  cols = width / resolution;
  rows = height / resolution;
  for(let j = 0; j < rows; j++){
    for(let i = 0; i < cols; i++){
      let cell = new Cell(i, j);
      newCells.push(cell);
    }
  }
  cells = newCells;

  currentCell = cells[0];
}
