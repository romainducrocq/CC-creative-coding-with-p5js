let cities = [];
let totalCities = 20;

let recordDistance = Infinity;
let bestOrder;
let currentBestOrder;

let population = [];
let populationSize = 10000;

let fitness = [];

let mutationRate = 0.01;

let generations = 1;
let bestFrom = 1;

let statusDiv;

function setup() {
  createCanvas(600, 300*2);
  let order = [];
  for(let i = 0; i < totalCities; i++){
    let v = createVector(random(width), random(height/2));
    cities[i] = v;
    order[i] = i;
  }

  for(let i = 0; i < populationSize; i++){
    population[i] = shuffle(order);
  }

  statusDiv = createDiv("");
  statusDiv.position(10, height + 10);
  statusDiv.style('font-size', '16px');
  statusDiv.style('font-family','Ubuntu, sans-serif');
}

function draw() {
  background(220);

  //GA
  calcFitness();
  displayBest(bestOrder, "Best:\nFrom generation: " + bestFrom);
  displayCurrentBest();

  generations++;
  nextGeneration();

  displayInfos();
}

function displayBest(order, txt){
  fill(51);
   for(let i = 0; i < cities.length; i++){
     ellipse(cities[i].x, cities[i].y, 8, 8);
   }
  stroke(51);
  strokeWeight(2);
  noFill();
  beginShape();
  for(let i = 0; i < order.length; i++){
    vertex(cities[order[i]].x, cities[order[i]].y);
  }
  endShape();
  fill(0,0,255);
  noStroke();
  text(txt,10, 18);
}

function displayCurrentBest(){
  push();
  translate(0, height / 2);
  displayBest(currentBestOrder, "Best in generation " + generations + ":");
  pop();
}

function displayInfos(){
  statusDiv.html(
    "Number of points: " + totalCities + "<br>" +
    "Population size: " + populationSize + "<br>" +
    "Min distance: " + round(recordDistance) + " px"
  );
}

function calcDist(points, order){
  let sum = 0;
  for(let i = 0; i < order.length-1; i++){
    let d = dist(points[order[i]].x, points[order[i]].y, points[order[i+1]].x, points[order[i+1]].y);
    sum += d;
  }
  return sum;
}

function swap(a, i, j){
  let tmp = a[i];
  a[i] = a[j];
  a[j] = tmp;
}
