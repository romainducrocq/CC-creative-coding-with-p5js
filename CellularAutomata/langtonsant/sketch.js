function make2DArray(col, row){
  let arr = new Array(col);
  for(let i=0; i < arr.length; i++){
    arr[i] = new Array(row);
  }
  return arr;
}

let canvas;
let ycanvas = 50;

let resolutions = [4, 10, 50];
let speeds = [2, 60, 500];
let sizes = [[800,800],[1200,800],[1200,1200]];

let x;
let y;
let dir;
let grid;
let cols;
let rows;
let resolution = resolutions[1];
let speed = speeds[1];
let steps = 0;

const ANTUP = 0;
const ANTRIGHT = 1;
const ANTDOWN = 2;
const ANTLEFT = 3;

let divTitle;
let divSteps;
let divResolution;
let divSpeed;
let divSize;

let buttonNew;
let buttonStart;
let buttonPause;

let sliderResolution;
let sliderSpeed;
let sliderSize;

let pause = false;
let start = false;
let randomize = false;

function setup() {
  canvas = createCanvas(sizes[1][0], sizes[1][1]);
  canvas.position(0, ycanvas);
  canvas.mousePressed(randomizeAnt);

  frameRate(speed);

  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols,rows);
  for(let i = 0; i < cols; i ++){
    for(let j = 0; j < rows; j++){
      grid[i][j] = 0;
    }
  }

  x = floor(cols/2);
  y = floor(rows/2);
  dir = ANTUP;

  background(220);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Click to randomize.\n|\nV', floor((width+resolution)/2), floor(height/3));
  fill(255, 0, 100);
  rect(x*resolution, y*resolution, resolution, resolution);

  divTitle = createDiv('Langton\'s ant');
  divTitle.position(10, 10);
  divTitle.style('font-size', '24px');
  divTitle.style('font-family','Ubuntu, sans-serif');
  divTitle.style('color',color(51));

  divSteps = createDiv('Steps : ' + steps);
  divSteps.position(200 + 10, 10);
  divSteps.style('font-size', '24px');
  divSteps.style('font-family','Ubuntu, sans-serif');
  divSteps.style('color',color(255, 0, 100));

  buttonStart = createButton("START");
  buttonStart.position(400 + 10, 10);
  buttonStart.mousePressed(startAnt);

  buttonPause = createButton("PAUSE");
  buttonPause.position(buttonStart.x + buttonStart.width + 10, 10);
  buttonPause.mousePressed(pauseAnt);

  buttonNew = createButton("NEW");
  buttonNew.position(buttonPause.x + buttonPause.width + 10, 10);
  buttonNew.mousePressed(newAnt);

  divResolution = createDiv('Zoom : ');
  divResolution.position(buttonNew.x + buttonNew.width + 10, 10);
  divResolution.style('font-size', '16px');
  divResolution.style('font-family','Ubuntu, sans-serif');
  divResolution.style('color',color(51));

  sliderResolution = createSlider(1, 3, 2);
  sliderResolution.position(buttonNew.x + buttonNew.width + 10, 25);

  divSpeed = createDiv('Speed : ');
  divSpeed.position(sliderResolution.x + sliderResolution.width + 10, 10);
  divSpeed.style('font-size', '16px');
  divSpeed.style('font-family','Ubuntu, sans-serif');
  divSpeed.style('color',color(51));

  sliderSpeed = createSlider(1, 3, 2);
  sliderSpeed.position(sliderResolution.x + sliderResolution.width + 10, 25);

  divSize = createDiv('Size [1:1|3:2|1:1] : ');
  divSize.position(sliderSpeed.x + sliderSpeed.width + 10, 10);
  divSize.style('font-size', '16px');
  divSize.style('font-family','Ubuntu, sans-serif');
  divSize.style('color',color(51));

  sliderSize = createSlider(1, 3, 2);
  sliderSize.position(sliderSpeed.x + sliderSpeed.width + 10, 25);
}

function turn() {
  if(grid[x][y] === 0){
    dir = (dir+1)%4; //right
  }else if(grid[x][y] === 1){
    dir = (dir+3)%4; //left
  }
}

function flip() {
  grid[x][y] = 1 - grid[x][y];
}

function move(){
  switch (dir) {
    case ANTUP:
      y = (y - 1 + rows)%rows;
      break;
    case ANTRIGHT:
      x = (x + 1 + cols)%cols;
      break;
    case ANTDOWN:
      y = (y + 1 + rows)%rows;
      break;
    case ANTLEFT:
      x = (x - 1 + cols)%cols;
      break;
    default:
      break;
  }
}

function draw() {
  if(!pause && start){

    fill(220*(1-grid[x][y]));
    rect(x*resolution, y*resolution, resolution, resolution);

    turn();
    flip();
    move();

    fill(255, 0, 100);
    rect(x*resolution, y*resolution, resolution, resolution);

    steps++;
    showSteps();
  }
}

function showSteps(){
  divSteps.html('Steps : ' + steps);
}

function newAnt(){
  setSize();
  setZoom();
  setSpeed();

  frameRate(speed);

  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols,rows);
  for(let i = 0; i < cols; i ++){
    for(let j = 0; j < rows; j++){
      grid[i][j] = 0;
    }
  }

  x = floor(cols/2);
  y = floor(rows/2);
  dir = ANTUP;

  steps = 0;
  showSteps();
  pause = false;
  buttonPause.style('color',color(51));
  start = false;
  randomize = false;

  background(220);
  fill(0);
  text('Click to randomize.\n|\nV', floor((width+resolution)/2), floor(height/3));
  fill(255, 0, 100);
  rect(x*resolution, y*resolution, resolution, resolution);
}

function setSize() {
  resizeCanvas(sizes[sliderSize.value()-1][0], sizes[sliderSize.value()-1][1]);
}

function setZoom() {
  resolution = resolutions[sliderResolution.value()-1];
}

function setSpeed() {
  speed = speeds[sliderSpeed.value()-1];
}

function startAnt() {
  if(!start){
    start = true;

    if(!randomize){
      background(220);
      fill(255, 0, 100);
      rect(x*resolution, y*resolution, resolution, resolution);
    }
  }
}

function pauseAnt() {
  pause = !pause;
  if(pause){
    buttonPause.style('color',color(255, 0, 100));
  }else{
    buttonPause.style('color',color(51));
  }
}

function randomizeAnt() {
  if(!start && !randomize){
    randomize = true;

    background(220);

    let w = (cols + rows) / 10 - 1;
    for(let i = -floor(w/2); i < floor(w/2) + 1; i++){
      for(let j = -floor(w/2); j < floor(w/2) + 1; j++){
        grid[x+i][y+j] = floor(random(2));
        fill(220*(1-grid[x+i][y+j]));
        rect((x+i)*resolution, (y+j)*resolution, resolution, resolution);
      }
    }

    fill(255, 0, 100);
    rect(x*resolution, y*resolution, resolution, resolution);
  }
}
