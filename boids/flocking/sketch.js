let flock;

function setup() {
  createCanvas(640, 360);
  flock = new Flock();

  for(let i = 0; i < 50; i++){
    flock.addBoid(new Boid(width/2 + random(0.75), height + random(0.75)));
  }

  createDiv("Add boids by dragging the mouse on the canvas.")
    .style('font-family','Ubuntu, sans-serif')
    .style('color',color(51))
    .style('font-size', '18px');
}

function draw() {
  background(51);
  flock.run();
}

function mouseDragged(){
  flock.addBoid(new Boid(mouseX, mouseY));
}
