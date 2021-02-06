// rocket class -- with dna & fitness

class Rocket{
  constructor(pos, dna, totalRockets) {
    //all of our physics stuff
    this.acceleration = createVector();
    this.velocity = createVector();
    this.position = pos.copy();
    this.r = 4;
    this.dna = dna;
    this.finishTime = 0; //we're going to count how long it takes to reach target
    this.recordDist = 10000; //some high number that will be beat instantly

    this.fitness = 0;
    this.geneCounter = 0;
    this.hitObstacle = false; // am i stuck on an obstacle ?
    this.hitTarget = false; //did i reach the target ?
  }

  //FITNESS FUNCTION
  //distance = distance from target
  //finish = what order did i finish (first, second, etc...)
  //f(distance, finish) = (1.0f / finish^1.5) * (1.0f / distance^6)
  // a lower finish and/or shorter distance to the target is rewarded exponentially
  calcFitness() {
    if(this.recordDist < 1){
      this.recordDist = 1;
    }

    //reward finishing faster and getting close
    this.fitness = (1 / (this.finishTime * this. recordDist));

    //make exponential
    this.fitness = pow(this.fitness, 4);

    if(this.hitObstacle){
      this.fitness *= 0.1; // loses 90% of fitness hitting an obstacle
    }
    if(this.hitTarget){
      this.fitness *= 2; //twice the fitness for finishing !
    }
  }

  //run in relation to all the obstacles
  //if i'm stuck, don't bother updating or checking for intersection
  run(os){
    if(!this.hitObstacle && !this.hitTarget){
      this.applyForce(this.dna.genes[this.geneCounter]);
      this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
      this.update();
      //if i hit an edge or an obstacle
      this.obstacles(os);
    }
    //draw me
    if(!this.hitObstacle){
      this.display();
    }
  }

  //did i make it to the target ?
  checkTarget(){
    let d = dist(this.position.x, this.position.y, target.position.x, target.position.y);
    if(d < this.recordDist){
      this.recordDist = d;
    }
    if(target.contains(this.position) && !this.hitTarget) {
      this.hitTarget = true;
    } else if (!this.hitTarget) {
      this.finishTime++;
    }
  }

  //did i hit an obstacle ?
  obstacles(os){
    for(let i = 0; i < os.length; i++){
      let obs = os[i];
      if(obs.contains(this.position)){
        this.hitObstacle = true;
      }
    }
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display(){
    let theta = this.velocity.heading() + PI / 2;
    fill(200, 100);
    stroke(0);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);

    //thrusters
    rectMode(CENTER);
    fill(0);
    rect(-this.r / 2, this.r * 2, this.r / 2, this.r);
    rect(this.r / 2, this.r * 2, this.r / 2, this.r);

    //rocket body
    fill(175);
    beginShape(TRIANGLES);
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape();

    pop();
  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

  stopped() {
    return this.hitObstacle;
  }

}
