//a world of creatures that eat food
//the more they eat, the longer they survive
//the longer they survive, the more likely they are to reproduce
//the bigger they are, the easier it is to land on food
//the bigger they are, the slower they are to find food
//when a creature die, food is left behind

let world;

function setup() {
  createCanvas(640, 360);
  //world starts with 20 creatures
  //and 20 pieces of food
  world = new World(20);
}

function draw() {
  background(175);
  world.run();
}

//we can add a creature manually
function mousePressed(){
  world.born(mouseX, mouseY);
}

function mouseDragged() {
  world.born(mouseX, mouseY);
}
