let time = 0;
let wave = [];

let step = 0.05;

let canvas;
let titleDiv;
let termsDiv;
let partialSumDiv;
let formulaDiv;
let termsSlider;
let partialSumSlider;

function setup() {
  canvas = createCanvas(600, 400);
  canvas.position(0, 50);

  termsSlider = createSlider(1, 20, 1, 1);
  termsSlider.position(10, height + canvas.y + 25);

  partialSumSlider = createSlider(0, 1, 0, 1);
  partialSumSlider.position(termsSlider.width + termsSlider.x + 10, height + canvas.y + 25);

  invertButton = createButton("INVERT");
  invertButton.position(partialSumSlider.width + partialSumSlider.x + 10, height + canvas.y + 10);
  invertButton.style('font-size', '16px');
  invertButton.style('font-family','Ubuntu, sans-serif');
  invertButton.style('color',color(51));
  invertButton.mousePressed(invert);

  titleDiv = createDiv("Fourier series");
  titleDiv.position(10, 10);
  titleDiv.style('font-size', '24px');
  titleDiv.style('font-family','Ubuntu, sans-serif');
  titleDiv.style('color',color(51));

  termsDiv = createDiv("");
  termsDiv.position(10, height + canvas.y + 10);
  termsDiv.style('font-size', '16px');
  termsDiv.style('font-family','Ubuntu, sans-serif');
  termsDiv.style('color',color(51));

  partialSumDiv = createDiv("");
  partialSumDiv.position(termsSlider.width + termsSlider.x + 10, height + canvas.y + 10);
  partialSumDiv.style('font-size', '16px');
  partialSumDiv.style('font-family','Ubuntu, sans-serif');
  partialSumDiv.style('color',color(51));

  formulaDiv = createDiv("Fourier series decomposes periodic functions or periodic signals into the sum of a set of simple oscillating functions, sines and cosines (or complex exponentials).<br><br>" +
  "Fourier sum = SUM{K=0:N}(4*sin((K*2+1)*θ)/(±(K*2+1)*pi))<br>" +
  "Partial sum = SUM{K=0:N}(2*sin((K+1)*θ)/(±(K+1)*pi))"
  );
  formulaDiv.position(10, termsSlider.height + termsSlider.y + 10);
  formulaDiv.style('font-size', '16px');
  formulaDiv.style('font-family','Ubuntu, sans-serif');
  formulaDiv.style('color',color(51));
  formulaDiv.size(width);
}

function draw() {
  background(51);
  translate(150, 200);
  termsDiv.html("N terms in sum: " + nTerms(termsSlider.value()));
  partialSumDiv.html("Partial sum: " + ((partialSumSlider.value() === 0) ? "No" : "Yes"));

  let x = 0;
  let y = 0;

  for(let i = 0; i < nTerms(termsSlider.value()); i++){
    let prevx = x;
    let prevy = y;
    let n = i * (1 + (1-partialSumSlider.value())) + 1;
    let radius = 75 * ((4 /(partialSumSlider.value()+1)) / (n * PI));
    x += radius * cos(n * -time);
    y += radius * sin(n * -time);

    (i > 0 ? stroke(220, 100) : stroke(220));
    noFill();
    ellipse(prevx, prevy, radius*2);
    stroke(220);

    fill(220);
    line(prevx, prevy, x, y);
  }

  wave.unshift(y);
  translate(200, 0);
  line(x-200, y, 0, wave[0]);

  beginShape();
  noFill();
  for(let i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
  }
  endShape();

  time += step;

  if(wave.length > 250) {
    wave.pop();
  }
}

function invert() {
  step = -step;
}

function nTerms(n) {
  return (n > 10 ? (n-10)*10 : n);
}

/*

Div = createDiv("");
Div.position(,);
Div.style('font-size', '16px');
Div.style('font-family','Ubuntu, sans-serif');
Div.style('color',color(51));
// let val = Div.html(); //get
// Div.html(""); //set

Button = createButton("");
Button.position(,);
Button.style('font-size', '16px');
Button.style('font-family','Ubuntu, sans-serif');
Button.style('color',color(51));
Button.mousePressed(function);

Slider = createSlider(1, 3, 2, 1);
Slider.position(,);
// let val = Slider.value(); //get
// Slider.value(int); //set

Input = createInput("");
Input.position(,);
Input.size(50);
Input.value("");
// let val = Input.value(); //get
// Input.value(""); //set

Checkbox = createCheckbox("", boolean);
Checkbox.position(,);
// let val = Checkbox.checked(); //get
// Checkbox.checked(boolean); //set

function keyPressed() {
  if(keyCode === 80){ //P
  }else if(keyCode === 32){ //SPACE
  }else if(keyCode === UP_ARROW){
  }else if (keyCode === DOWN_ARROW){
  }else if (keyCode === LEFT_ARROW){
  }else if (keyCode === RIGHT_ARROW){
  }
}

function mousePressed() {
}
*/
