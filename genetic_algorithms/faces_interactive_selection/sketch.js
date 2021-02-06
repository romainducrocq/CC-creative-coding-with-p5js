//interactive selection
//http://www.genarts.com/karl/papers/siggraph91.html

let population;
let info;

function setup() {
  createCanvas(800, 124);
  colorMode(RGB , 1.0, 1.0, 1.0, 1.0);
  let popmax = 10;
  let mutationRate = 0.05; //pretty high mutation rate, population is small, we need to enforce variety*
  //create a population with a mutation rate and a population max
  population = new Population(mutationRate, popmax);
  //a simple button class
  button = createButton("evolve new generation");
  button.mousePressed(nextGen);
  button.position(10, 140);
  info = createDiv('');
  info.position(10, 175);
}

function draw() {
  background(1);
  //display the faces
  population.display();
  population.rollover(mouseX, mouseY);
  info.html("Generation #:" + population.getGenerations());
}

//if the button is clicked, evolve next generation
function nextGen(){
  population.selection();
  population.reproduction();
}
