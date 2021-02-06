let n = 0;
let c = 4;

let angles = [137.3, 137.5, 137.6];
let a = 137.5;

let colorBy = 0;

let angleDiv;
let colorDiv;

let angleSlider;
let colorSlider;

let buttonNew;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  background(51);
  colorMode(HSB);
  noStroke();

  angleDiv = createDiv("Angle: 137[.3|.5|.6]");
  angleDiv.position(10, height + 10);
  angleDiv.style('font-size', '16px');
  angleDiv.style('font-family','Ubuntu, sans-serif');
  angleDiv.style('color',color(51));

  angleSlider = createSlider(1, 3, 2, 1);
  angleSlider.position(10, height + 25);

  colorDiv = createDiv("Color by: [angle|size]");
  colorDiv.position(angleSlider.x + angleSlider.width + 10, height + 10);
  colorDiv.style('font-size', '16px');
  colorDiv.style('font-family','Ubuntu, sans-serif');
  colorDiv.style('color',color(51));

  colorSlider = createSlider(1, 2, 1, 1);
  colorSlider.position(angleSlider.x + angleSlider.width + 10, height + 25);

  buttonNew = createButton("NEW");
  buttonNew.position(10, angleSlider.y + angleSlider.height + 10);
  buttonNew.style('font-size', '16px');
  buttonNew.style('font-family','Ubuntu, sans-serif');
  buttonNew.style('color',color(51));
  buttonNew.mousePressed(newPhyllotaxis);
}

function draw() {
  let angle = n * a;
  let r = c * sqrt(n);

  let x = width/2 + r * cos(angle);
  let y = height/2 + r * sin(angle);

  if(colorBy === 0){
    fill(angle % 256, 255, 255);
  }else if(colorBy === 1){
    fill(n % 256, 255, 255);
  }
  ellipse(x, y, 4, 4);

  n++;
}

function newPhyllotaxis() {
  background(51);
  n = 0;
  a = angles[angleSlider.value()-1];
  colorBy = colorSlider.value()-1;
}
