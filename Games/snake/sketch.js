let canvas;

let sclTab = [10,20,50];
let xyTab = [[400,400],[600,400],[800,400]];
let frateTab = [5,10,20];

let scl = sclTab[1];
let xmax = xyTab[1][0];
let ymax = xyTab[1][1];

let s;
let food;

let col;
let lastcol;

let title;
let score;

let tagGo;
let tagSpeed;
let tagSnakeSize;
let tagBoardSize;
let tagBorders;
let tagPause;
let tagPressP;

let sliderSpeed;
let sliderSnakeSize;
let sliderBoardSize;
let checkBoxBorders;

let goButton;
let buttonPause;
let buttonUp;
let buttonRight;
let buttonDown;
let buttonLeft;

let dirPadding = "15px 15px 15px 15px";


let borders = true;

let pause = false;

function setup() {
  canvas = createCanvas(xmax, ymax);
  canvas.position(0, 50);
  s = new Snake();
  frameRate(frateTab[1]);
  pickLocation();

  setColor("DEFAULT");

  title = createDiv('The snake game');
  title.position(10, 10);
  title.style('font-size', '24px');
  title.style('font-family','Ubuntu, sans-serif');
  title.style('color',color(51));

  score = createDiv('Score : ' + s.getTotal());
  score.position(width/2 + 10, 10);
  score.style('font-size', '24px');
  score.style('font-family','Ubuntu, sans-serif');
  score.style('color',color(255, 0, 100));

  tagGo = createDiv('New game : ');
  tagGo.position(10, height + 60);
  tagGo.style('font-size', '16px');
  tagGo.style('font-family','Ubuntu, sans-serif');
  tagGo.style('color',color(51));

  tagSpeed = createDiv('Speed : ');
  tagSpeed.position(10, height + 90);
  tagSpeed.style('font-size', '16px');
  tagSpeed.style('font-family','Ubuntu, sans-serif');
  tagSpeed.style('color',color(51));

  tagSnakeSize = createDiv('Snake size : ');
  tagSnakeSize.position(10, height + 120);
  tagSnakeSize.style('font-size', '16px');
  tagSnakeSize.style('font-family','Ubuntu, sans-serif');
  tagSnakeSize.style('color',color(51));

  tagBoardSize = createDiv('Board size : ');
  tagBoardSize.position(10, height + 150);
  tagBoardSize.style('font-size', '16px');
  tagBoardSize.style('font-family','Ubuntu, sans-serif');
  tagBoardSize.style('color',color(51));

  tagBorders = createDiv('Borders : ');
  tagBorders.position(10, height + 180);
  tagBorders.style('font-size', '16px');
  tagBorders.style('font-family','Ubuntu, sans-serif');
  tagBorders.style('color',color(51));

  tagPause = createDiv('Pause : ');
  tagPause.position(10, height + 210);
  tagPause.style('font-size', '16px');
  tagPause.style('font-family','Ubuntu, sans-serif');
  tagPause.style('color',color(51));

  button = createButton("GO!");
  button.position(1/4*width + 10, height + 60);
  button.mousePressed(newGame);

  sliderSpeed = createSlider(1, 3, 2);
  sliderSpeed.position(1/4*width + 10, height + 90);

  sliderSnakeSize = createSlider(1, 3, 2);
  sliderSnakeSize.position(1/4*width + 10, height + 120);

  sliderBoardSize = createSlider(1, 3, 2);
  sliderBoardSize.position(1/4*width + 10, height + 150);

  checkBoxBorders = createCheckbox('', borders);
  checkBoxBorders.position(1/4*width + 10, height + 180);

  buttonPause = createButton("PAUSE");
  buttonPause.position(1/4*width + 10, height + 210);
  buttonPause.mousePressed(pauseGame);

  tagPressP = createDiv('or press P');
  tagPressP.position(buttonPause.x + buttonPause.width + 10, height + 210);
  tagPressP.style('font-size', '16px');
  tagPressP.style('font-family','Ubuntu, sans-serif');
  tagPressP.style('color',color(51));

  buttonUp = createButton("^");
  buttonUp.position(3/4*width + 10, height + 60);
  buttonUp.style("padding", dirPadding);
  buttonUp.mousePressed(up);

  buttonRight = createButton(">");
  buttonRight.position(buttonUp.x + buttonUp.width*2, buttonUp.y + buttonUp.height*2);
  buttonRight.style("padding", dirPadding);
  buttonRight.mousePressed(right);

  buttonDown = createButton("v");
  buttonDown.position(buttonUp.x, buttonUp.y + buttonUp.height*4);
  buttonDown.style("padding", dirPadding);
  buttonDown.mousePressed(down);

  buttonLeft = createButton("<");
  buttonLeft.position(buttonUp.x - buttonUp.width*2, buttonUp.y + buttonUp.height*2);
  buttonLeft.style("padding", dirPadding);
  buttonLeft.mousePressed(left);


}

function newGame(){
  setSpeed();
  setSnakeSize();
  setBoardSize();
  setBorders();
  s.resetGame();
  pickLocation();
  setColor("DEFAULT");
  pause = false;
  buttonPause.style('color',color(51));
}

function pickLocation(){
  let cols = floor(xmax/scl);
  let rows = floor(ymax/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function setColor(type){
  switch (type) {
    case "DEFAULT":
      lastcol = color(255);
      col = color(255, 0, 100);
      break;
    case "RANDOM":
      lastcol = col;
      col = color(floor(random(255)), floor(random(255)), floor(random(255)));
      break;
    default:
      break;
  }
}

function draw() {

if(!pause){

  background(51);

  if(s.eat(food)){
    pickLocation();
    setColor("RANDOM");
  }

  if(s.update()){
    setColor("DEFAULT");
  }
  s.show();

  showFood();
  showText();
  showBorders();
  }
}

function showFood(){
  fill(col);
  rect(food.x, food.y, scl, scl);
}

function showText(){
  score.html('Score : ' + s.getTotal());
}

function showBorders(){
  if(borders){
    stroke(255, 0, 100);
    strokeWeight(3);
    line(0, 0, xmax, 0);
    line(0, 0, 0, ymax);
    line(xmax, 0, xmax, ymax);
    line(0, ymax, xmax, ymax);
    stroke(0);
    strokeWeight(1);
  }
}

function setSpeed() {
  switch(sliderSpeed.value()) {
    case 1:
      frameRate(frateTab[0]);
      break;
    case 2:
        frameRate(frateTab[1]);
        break;
    case 3:
        frameRate(frateTab[2]);
        break;
    default:
        frameRate(frateTab[1]);
        break;
      }
}

function setSnakeSize() {
  switch(sliderSnakeSize.value()) {
      case 1:
        scl = sclTab[0];
        break;
      case 2:
          scl = sclTab[1];
          break;
      case 3:
          scl = sclTab[2];
          break;
      default:
          scl = sclTab[1];
          break;
        }
}

function setBoardSize() {
  switch(sliderBoardSize.value()) {
      case 1:
        xmax = xyTab[0][0];
        ymax = xyTab[0][1];
        break;
      case 2:
        xmax = xyTab[1][0];
        ymax = xyTab[1][1];
        break;
      case 3:
        xmax = xyTab[2][0];
        ymax = xyTab[2][1];
        break;
      default:
        xmax = xyTab[1][0];
        ymax = xyTab[1][1];
        break;
        }
    resizeCanvas(xmax, ymax);
}

function setBorders() {
  borders = checkBoxBorders.checked();
}

function up(){
  if(s.canTurn("UP") && !pause){
    s.dir(0, -1);
    s.setLastDir("UP");
  }
}

function down(){
  if(s.canTurn("DOWN") && !pause){
    s.dir(0, 1);
    s.setLastDir("DOWN");
  }
}

function left(){
  if(s.canTurn("LEFT") && !pause){
    s.dir(-1, 0);
    s.setLastDir("LEFT");
  }
}

function right(){
  if(s.canTurn("RIGHT") && !pause){
    s.dir(1, 0);
    s.setLastDir("RIGHT");
  }
}

function keyPressed() {
  if(keyCode === 80){ //P
    pauseGame();
  }else if(keyCode === UP_ARROW){
    up();
  }else if (keyCode === DOWN_ARROW){
    down();
  }else if (keyCode === LEFT_ARROW){
    left();
  }else if (keyCode === RIGHT_ARROW){
    right();
  }
}

function pauseGame() {
  pause = !pause;
  if(pause){
    buttonPause.style('color',color(255, 0, 100));
  }else{
    buttonPause.style('color',color(51));
  }
}
