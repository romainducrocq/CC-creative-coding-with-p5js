let m;
let n1;
let n2;
let n3;
let a;
let b;

let divFormula;

let divM;
let divN1;
let divN2;
let divN3;
let divA;
let divB;

let sliderM;
let sliderN1;
let sliderN2;
let sliderN3;
let sliderA;
let sliderB;

function setup() {
  createCanvas(400, 400);
  background(51);

  stroke(255)
  noFill();

  divFormula = createDiv("<a target='_blank' rel='noopener noreferrer' href='http://paulbourke.net/geometry/supershape/'>Supershape</a>" +
  ":<br>" +
  "(|(1/a)*cos((m/4)*θ)|ⁿ² + |(1/b)*sin((m/4)*θ)|ⁿ³)¹ᐟⁿ¹ =  1/r"
  );
  divFormula.position(10, height + 10);
  divFormula.style('font-size', '16px');
  divFormula.style('font-family','Ubuntu, sans-serif');
  divFormula.style('color',color(51));

  divM = createDiv('m : ');
  divM.position(10, height + 60);
  divM.style('font-size', '16px');
  divM.style('font-family','Ubuntu, sans-serif');
  divM.style('color',color(51));

  sliderM = createSlider(0, 10, 0, 0.01);
  sliderM.position(10, height + 75);

  divA = createDiv('a : ');
  divA.position(10, sliderM.y + sliderM.height + 10);
  divA.style('font-size', '16px');
  divA.style('font-family','Ubuntu, sans-serif');
  divA.style('color',color(51));

  sliderA = createSlider(1, 200, 100, 1);
  sliderA.position(10, sliderM.y + sliderM.height + 25);

  divB = createDiv('b : ');
  divB.position(10, sliderA.y + sliderA.height + 10);
  divB.style('font-size', '16px');
  divB.style('font-family','Ubuntu, sans-serif');
  divB.style('color',color(51));

  sliderB = createSlider(1, 200, 100, 1);
  sliderB.position(10, sliderA.y + sliderA.height + 25);

  divN1 = createDiv('n1 : ');
  divN1.position(sliderM.x + sliderM.width + 10, height + 60);
  divN1.style('font-size', '16px');
  divN1.style('font-family','Ubuntu, sans-serif');
  divN1.style('color',color(51));

  sliderN1 = createSlider(0.01, 100, 1, 0.01);
  sliderN1.position(sliderM.x + sliderM.width + 10, height + 75);

  divN2 = createDiv('n2 : ');
  divN2.position(sliderM.x + sliderM.width + 10, sliderN1.height + sliderN1.y + 10);
  divN2.style('font-size', '16px');
  divN2.style('font-family','Ubuntu, sans-serif');
  divN2.style('color',color(51));

  sliderN2 = createSlider(0.01, 100, 1, 0.01);
  sliderN2.position(sliderM.x + sliderM.width + 10, sliderN1.height + sliderN1.y + 25);

  divN3 = createDiv('n3 : ');
  divN3.position(sliderM.x + sliderM.width + 10, sliderN2.height + sliderN2.y + 10);
  divN3.style('font-size', '16px');
  divN3.style('font-family','Ubuntu, sans-serif');
  divN3.style('color',color(51));

  sliderN3 = createSlider(0.01, 100, 1, 0.01);
  sliderN3.position(sliderM.x + sliderM.width + 10, sliderN2.height + sliderN2.y + 25);

}

function draw() {
  if(m !== sliderM.value()
  || a !== sliderA.value()
  || b !== sliderB.value()
  || n1 !== sliderN1.value()
  || n2 !== sliderN2.value()
  || n3 !== sliderN3.value()
){
    m = sliderM.value();
    a = sliderA.value();
    b = sliderB.value();
    n1 = sliderN1.value();
    n2 = sliderN2.value();
    n3 = sliderN3.value();
    show();
  }
}

function show() {
  background(51);
  translate(width/2, height/2);

  divM.html("m = " + m + " : ");
  divA.html("a = " + a + " : ");
  divB.html("b = " + b + " : ");
  divN1.html("n1 = " + n1 + " : ");
  divN2.html("n2 = " + n2 + " : ");
  divN3.html("n3 = " + n3 + " : ");

  beginShape();
  for(let angle = 0; angle < TWO_PI; angle+=(TWO_PI / 500)){
    let r = supershape(angle);
    let x = r * cos(angle);
    let y = r * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function supershape(phi){
  let r;

  let t1 = cos(m * phi / 4) / a;
  t1 = abs(t1);
  t1 = pow(t1, n2);

  let t2 = sin(m * phi / 4) / b;
  t2 = abs(t2);
  t2 = pow(t2, n3);

  r = pow(t1 + t2, 1 / n1);

  if (abs(r) === 0) {
    r = 0
  } else {
     r = 1 / r;
  }

  return r;
}
