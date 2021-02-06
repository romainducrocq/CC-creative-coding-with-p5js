let n;
let a;
let b;

let divFormula;

let divN;
let divA;
let divB;

let sliderN;
let sliderA;
let sliderB;

function setup() {
  createCanvas(400, 400);
  background(51);

  stroke(255)
  noFill();

  divFormula = createDiv('Superellipse : |x/a|ⁿ + |y/b|ⁿ = 1');
  divFormula.position(10, height + 10);
  divFormula.style('font-size', '16px');
  divFormula.style('font-family','Ubuntu, sans-serif');
  divFormula.style('color',color(51));

  divN = createDiv('n : ');
  divN.position(10, height + 40);
  divN.style('font-size', '16px');
  divN.style('font-family','Ubuntu, sans-serif');
  divN.style('color',color(51));

  sliderN = createSlider(0, 10, 2, 0.01);
  sliderN.position(100, height + 40);

  divA = createDiv('a : ');
  divA.position(10, height + 70);
  divA.style('font-size', '16px');
  divA.style('font-family','Ubuntu, sans-serif');
  divA.style('color',color(51));

  sliderA = createSlider(1, 200, 100, 1);
  sliderA.position(100, height + 70);

  divB = createDiv('b : ');
  divB.position(10, height + 100);
  divB.style('font-size', '16px');
  divB.style('font-family','Ubuntu, sans-serif');
  divB.style('color',color(51));

  sliderB = createSlider(1, 200, 100, 1);
  sliderB.position(100, height + 100);

}

function draw() {
  if(n !== sliderN.value() || a !== sliderA.value() || b !== sliderB.value()){
    n = sliderN.value();
    a = sliderA.value();
    b = sliderB.value();
    show();
  }
}

function show() {
  background(51);
  translate(width/2, height/2);

  divN.html("n = " + n + " : ");
  divA.html("a = " + a + " : ");
  divB.html("b = " + b + " : ");

  beginShape();
  for(let angle = 0; angle < TWO_PI; angle+=0.1){
    let x = pow(abs(cos(angle)), (2/n))*a*Math.sign(cos(angle));
    let y = pow(abs(sin(angle)), (2/n))*b*Math.sign(sin(angle));
    vertex(x, y);
  }
  endShape(CLOSE);
}
