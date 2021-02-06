function Rocket(dna){
  this.pos = createVector(width / 2, height);
  this.vel = createVector();
  this.acc = createVector();
  this.completed = false;
  this.crashed = false;
  if(dna){
    this.dna = dna;
  }else {
    this.dna = new DNA();
  }
  this.fitness = 0;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

/*
// FITNESS FUNCTION
  // distance = distance from target
  // finish = what order did i finish (first, second, etc. . .)
  // f(distance,finish) =   (1.0f / finish^1.5) * (1.0f / distance^6);
  // a lower finish is rewarded (exponentially) and/or shorter distance to target (exponetially)
  calcFitness() {
    if (this.recordDist < 1) this.recordDist = 1;

    // Reward finishing faster and getting close
    this.fitness = (1 / (this.finishTime * this.recordDist));

    // Make the function exponential
    this.fitness = pow(this.fitness, 4);

    if (this.hitObstacle) this.fitness *= 0.1; // lose 90% of fitness hitting an obstacle
    if (this.hitTarget) this.fitness *= 2; // twice the fitness for finishing!
  }

  // Run in relation to all the obstacles
  // If I'm stuck, don't bother updating or checking for intersection
  run(os) {
    if (!this.hitObstacle && !this.hitTarget) {
      this.applyForce(this.dna.genes[this.geneCounter]);
      this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
      this.update();
      // If I hit an edge or an obstacle
      this.obstacles(os);
    }
    // Draw me!
    if (!this.hitObstacle) {
      this.display();
    }
  }
*/

  this.calcFitness = function(){
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = map(d, 0, width, width, 0);

    if(!this.crashed){
      this.fitness = pow(this.fitness, 2);
      if(this.pos.y < obstacle.y + obstacle.h){
        this.fitness = pow(this.fitness, 2);
        if(this.completed){
          this.fitness = pow(this.fitness, 2);
        }
      }
    }else{
      this.fitness = 1
    }

  /*  if(this.completed){
      this.fitness *= 10;
    }
    if(this.crashed){
      this.fitness = 1;
    }*/
  }

  this.update = function(){

    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if(d < 10){
      this.completed = true;
      this.pos = target.copy();
    }

    if(
      (this.pos.x > obstacle.x &&
        this.pos.x < obstacle.x + obstacle.w &&
        this.pos.y > obstacle.y &&
        this.pos.y < obstacle.y + obstacle.h) ||
      (this.pos.x > width ||
        this.pos.x < 0 ||
        this.pos.y > height ||
        this.pos.y < 0)
    ){
      this.crashed = true;
    }

    this.applyForce(this.dna.genes[count]);

    if(!this.completed && !this.crashed){
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      //this.vel.limit(4);
    }
  }

  this.show = function() {
    push();
    noStroke();
    fill(255, 150);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  }
}
