//pathfinding flowfield with genetic algorithm

//obstacle course with start and finish
//virtual cratures are rewarded for making it closer to the finish

//each creature's dna is a flowfield of pvectors that
//determine steering vectors for each cell on the screen

let gridscale = 10; //scale of grid is 1/24 of screen size

//dna needs one vector for every spot on the grid
//like a pixel array, with vectors instead of colors

let dnasize;

let lifetime; //how long should each generation live

let population; //population
let lifecycle; //timer for a cycle of generation
let recordtime; //fastest time to target
let target; //target position
let start; //start position
let diam = 24; //size of target

let obstacles; //an array list to keep track of all the obstacles

let debug = false;

let newObstacle = null;

let info;

function setup() {
  createCanvas(640, 360);
  info = createP('');
  dnasize = floor(width / gridscale) * floor(height / gridscale);
  lifetime = width / 3;

  //initialize
  lifecycle = 0;
  recordtime = lifetime;
  target = new Obstacle(width - diam - diam / 2, height / 2 - diam / 2, diam, diam);
  start = new Obstacle(diam / 2, height / 2 - diam / 2, diam, diam);

  //create a population with a mutation rate and population max
  let popmax = 500;
  let mutationRate = 0.02;
  population = new Population(mutationRate, popmax);

  //create the obstacle course
  obstacles = [];

  obstacles.push(new Obstacle(width / 4, 80, 10, height - 160));
  obstacles.push(new Obstacle(width / 2, 0, 10, height / 2 - 20));
  obstacles.push(new Obstacle(width / 2, height - height / 2 + 20, 10, height / 2 - 20));
  obstacles.push(new Obstacle(2 * width / 3, height / 2 - height / 8, 10, height  /4));
}

function draw() {
  background(220);

  //draw the target positions
  target.display();

  //draw the obstacles
  for(let i = 0; i < obstacles.length; i++){
    obstacles[i].display();
  }

  //if the generation hasn't ended yet
  if(lifecycle < lifetime){
    population.live(obstacles);
    if((population.targetReached()) && (lifecycle < recordtime)){
      recordtime = lifecycle;
    }
    lifecycle++;
    //otherwise a new generation
  }else {
    lifecycle = 0;
    population.calcFitness();
    population.naturalSelection();
    population.generate();
  }

  //display some info
  if(newObstacle !== null){
    newObstacle.display();
  }

  info.html("Generations #: " + floor(population.getGenerations()) +
  "<br>Cycles left: " + floor(lifetime - lifecycle) +
  "<br>Record cycles: " + floor(recordtime));
}

function keyPressed() {
  console.log(key);
  if(key === 'd' || key === 'D') {
    debug = !debug;
  }
}

function mousePressed(){
  newObstacle = new Obstacle(mouseX, mouseY, 0, 0);
}

function mouseDragged() {
  newObstacle.w = mouseX - newObstacle.position.x;
  newObstacle.h = mouseY - newObstacle.position.y;
}

function mouseReleased() {
  obstacles.push(newObstacle);
  newObstacle = null;
}
