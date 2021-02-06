let canvas;
let ycanvas = 50;

let cols;
let rows;
let resolution = 1;

let defaultRule = 110;
let rule = defaultRule;
let ruleset = [];

let ca;

let divTitle;

let inputRule;

let buttonNew;
let buttonPause;

let pause = false;

function setup() {
  canvas = createCanvas(0, 0);
  canvas.position(0, ycanvas);
  setSize();

  frameRate(24);

  cols = width / resolution;
  rows = height / resolution;

  setRuleset(rule);

  ca = new CA(ruleset, cols, resolution);

  logs();

  background(220);
  noStroke();

  divTitle = createDiv('Wolfram cellular automata - Rule : ');
  divTitle.position(10, 10);
  divTitle.style('font-size', '24px');
  divTitle.style('font-family','Ubuntu, sans-serif');
  divTitle.style('color',color(51));

  inputRule = createInput("" + rule);
  inputRule.position(400, 10);
  inputRule.size(50);

  buttonNew = createButton("NEW");
  buttonNew.position(inputRule.x + inputRule.width + 10, 10);
  buttonNew.mousePressed(newRule);

  buttonPause = createButton("PAUSE");
  buttonPause.position(buttonNew.x + buttonNew.width + 10, 10);
  buttonPause.mousePressed(pauseRule);
}

function draw() {
  if(!pause){
    ca.display();
    ca.generate();

    if(ca.generation%rows === 0){
      background(220);
      ca.generation = 0;
    }
  }
}

function setRuleset(r) {
  if(isNaN(r) || r < 1 || r > 255){
    r = defaultRule;
  }
  rule = r;

  let bits = [0,0,0,0,0,0,0,0];
  for(let i = 7; i >= 0; i--){
    if(r >= 2**i){
      r -= 2**i;
      bits[i] = 1;
    }
  }
  ruleset = bits;
}

function setSize() {
  let w = getMaxWidth();
  let h = getMaxHeight();

  if(w%resolution !== 0){
      w -= w%resolution;
  }
  if(h%resolution !== 0){
      h -= h%resolution;
  }

  resizeCanvas(w, h);
}

function getMaxWidth() {
  return windowWidth;
}

function getMaxHeight() {
  return windowHeight - ycanvas;
}

function newRule(){
  setRuleset(int(inputRule.value()));
  setSize();
  cols = width / resolution;
  rows = height / resolution;
  logs();

  pause = false;
  buttonPause.style('color',color(51));
  inputRule.value("" + rule);

  background(220);
  ca = new CA(ruleset, cols, resolution);
}

function logs(){
  console.log("Resolution : " + resolution);
  console.log("Width : " + width);
  console.log("Height : " + height);
  console.log("Columns : " + cols);
  console.log("Rows : " + rows);
  console.log("Rule : " + rule);
  console.log("Ruleset : " + ruleset);
  console.log(" ");
}

function pauseRule() {
  pause = !pause;
  if(pause){
    buttonPause.style('color',color(255, 0, 100));
  }else{
    buttonPause.style('color',color(51));
  }
}
