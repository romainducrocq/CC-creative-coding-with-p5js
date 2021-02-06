let population;

let lifespan = 400;
let count = 0;
let gen = 1;
let maxForce = 0.1;

let obstacle = { x: 100, y: 150, w: 200, h:10 }
let target;

let generationP;
let stepP;
let maxfitnessP;

function setup() {
  createCanvas(400, 300);
  //rocket = new Rocket();
  population = new Population();
  target = createVector(width / 2, 50);

  generationP = createP();
  stepP = createP();
  maxfitnessP = createP();
}

function draw() {
  background(51);
  population.run();

  count++;
  if(count == lifespan){
    population.evaluate();
    population.selection();
    //population = new Population();
    count = 0;
    gen++;
  }

  fill(220);
  rect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);

  ellipse(target.x, target.y, 16, 16);

  generationP.html("generation: " + gen);
  stepP.html("step: " + count);
}
