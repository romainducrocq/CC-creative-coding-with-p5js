let cities = [];
let totalCities = 6;

let order = [];

let recordDistance;
let bestOrder;

let totalPermutations;
let count = 0;

let statusDiv;

function setup() {
  createCanvas(400, 600);
  for(let i = 0; i < totalCities; i++){
    let v = createVector(random(width), random(height/2));
    cities[i] = v;
    order[i] = i;
  }

  recordDistance = calcDist();
  bestOrder = order.slice();

  totalPermutations = factorial(totalCities);
  statusDiv = createDiv("");
  statusDiv.position(10, height + 10);
  statusDiv.style('font-size', '16px');
  statusDiv.style('font-family','Ubuntu, sans-serif');
}

function draw() {
  background(0);
  display();
  displayBest();

  let d = calcDist();
  if(d < recordDistance){
    recordDistance = d;
    bestOrder = order.slice();
  }

  nextOrder();
  displayNextOrder();
}

function display() {
  fill(255);
  for(let i = 0; i < cities.length; i++){
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for(let i = 0; i < order.length; i++){
    vertex(cities[order[i]].x, cities[order[i]].y);
  }
  endShape();
}

function displayBest(){
  push();
  translate(0, height/2);
  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for(let i = 0; i < bestOrder.length; i++){
    vertex(cities[bestOrder[i]].x, cities[bestOrder[i]].y);
  }
  endShape();
  pop();
}

function swap(a, i, j){
  let tmp = a[i];
  a[i] = a[j];
  a[j] = tmp;
}

function calcDist(){
  let sum = 0;
  for(let i = 0; i < order.length-1; i++){
    let d = dist(cities[order[i]].x, cities[order[i]].y, cities[order[i+1]].x, cities[order[i+1]].y);
    sum += d;
  }
  return sum;
}

//lexicographical order algorithm
//see ./lexicographical_order
//https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
function nextOrder(){
  count++;

  //step 1
  let largestI = -1;
  for(let i = 0; i < order.length-1; i++){
    if(order[i] < order[i + 1]){
      largestI = i;
    }
  }

  if(largestI == -1){
    noLoop();
    return;
  }

  //step 2
  let largestJ = -1;
  for(let j = 0; j < order.length; j++){
    if(order[largestI] < order[j]){
      largestJ = j;
    }
  }

  //step 3
  swap(order, largestI, largestJ);

  //step 4
  let endArray = order.splice(largestI+1);
  endArray.reverse();
  order = order.concat(endArray);
}

function displayNextOrder(){
  let s = '';
  for(let i = 0; i < order.length; i++){
    s += order[i];
    //s = order[i] + s;
  }
  let percent = 100 * (count / totalPermutations);
  statusDiv.html(
    "Number of points: " + totalCities + "<br>" +
    "Total permutations: " + totalPermutations +  "<br>" +
    "Min distance: " + round(recordDistance) + " px" + "<br>" +
    "Lexicographical order: " + s + "<br>" +
    "Progress: " + nf(percent, 0, 2) +  "%"
  );
}

function factorial(n){
  if(n <= 1){
    return 1;
  }else{
    return n * factorial(n - 1);
  }
}
