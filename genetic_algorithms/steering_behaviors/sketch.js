//seeking "vehicle" follows the mouse position

//implements craig reynold's atonomous steering behaviors
//one vehicle seeks = desired - velocity
//http://www.red3d.com/cwr/

let population = [];
let food = [];
let poison = [];

//hyperparameters to tune
/////////////////////////
let populationSize = 50;
let nFood = 40;
let nPoison = 20;

let probNewFood = 0.1;
let probNewPoison = 0.01;
/////////////////////////

let bDist = 25;
let debug;

function setup(){
  createCanvas(640, 360);

  for(let i = 0; i < populationSize; i++){
    population[i] = new Vehicle(random(width), random(height), null);
  }
  for(let i = 0; i < nFood; i++){
    food.push(createVector(random(width), random(height)));
  }
  for(let i = 0; i < nPoison; i++){
    poison.push(createVector(random(width), random(height)));
  }

  debug = createCheckbox('Debug', true);
}

function draw() {
  background(51);

  if(debug.checked()){
    stroke(220);
    noFill();
    rectMode(CENTER);
    rect(width / 2, height / 2, width - 2 * bDist, height - 2 * bDist);
  }

  if(random(1) < probNewFood){
    food.push(createVector(random(width), random(height)));
  }

  if(random(1) < probNewPoison){
    poison.push(createVector(random(width), random(height)));
  }

  for(let i = 0; i < food.length; i++){
    fill(0, 255, 0, 100);
    noStroke();
    ellipse(food[i].x, food[i].y, 4, 4);
  }

  for(let i = 0; i < poison.length; i++){
    fill(255, 0, 0, 100);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 4, 4);
  }

  for(i = population.length - 1; i >= 0; i--){
    //call the appropriate steering behaviors for our agents
    population[i].boundaries();

    population[i].steerBehavior(food, poison);

    population[i].update();
    population[i].display();

    let child = population[i].clone();
    if(child){
      population.push(child);
    }

    if(population[i].dead()){
      food.push(createVector(population[i].position.x, population[i].position.y));
      population.splice(i, 1);
    }
  }
}

function mouseDragged(){
  population.push(new Vehicle(mouseX, mouseY, null));
}

function stop(){
  noLoop();
}
