//smart rockets with genetic algorithm

//each rocket's dna is an array of PVectors
//each PVector acts as a force for each frame of animation
//Imagine a booster on the end of the rocket that can polet in any direction
//and fire at any strength every frame

//the rocket's fitness is a function of how close it gets to the target as well as how fast it gets there

let lifetime; //how long should each generation live

let population; //population

let lifecycle; //timer for cycle of generation
let recordtime; //fastest time to target

let target; //target position

let obstacles = []; //an array list to keep track of all obstacles

function setup() {
  createCanvas(640, 360);
  //the number of cycles we will allow a generation to live
  lifetime = 300;

  //init varaibales
  lifecycle = 0;
  recordtime = lifetime;

  target = new Obstacle(width / 2 - 12, 24, 24, 24);

  //create a population with a mutation rate and population max
  let mutationRate = 0.01;
  population = new Population(mutationRate, 50);

  //create the obstacle course
  obstacles = [];
  obstacles.push(new Obstacle(width / 2 - 100, height / 2, 200, 10));
}

function draw() {
  background(127);

  //draw the start and target positions
  target.display();

  //if the generation hasn't ended yet
  if(lifecycle < lifetime){
    population.live(obstacles);
    if(population.targetReached() && lifecycle < recordtime){
      recordtime = lifecycle;
    }
    lifecycle++;
    //Otherwise a new generation
  }else {
    lifecycle = 0;
    population.calcFitness();
    population.selection();
    population.reproduction();
  }

  //draw the obstacles
  for(let i = 0; i < obstacles.length; i++){
    obstacles[i].display();
  }

  //display some info
  fill(0);
  noStroke();
  text("Generation #: " + population.getGenerations(), 10, 18);
  text("Cycles left: " + (lifetime - lifecycle), 10, 36);
  text("Record cycles: " + recordtime, 10, 54);
}

//move the target if the mouse is pressed
//system will adapt to the new target
function mousePressed(){
  target.position.x = mouseX;
  target.position.y = mouseY;
  recordtime = lifetime;
}
