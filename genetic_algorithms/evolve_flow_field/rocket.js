//rocket class
//constructor
class Rocket{
  constructor(l, dna_){
    //all of our physics stuff
    this.acceleration = createVector();
    this.velocity = createVector();
    this.pos = l.copy();
    this.r = 2;
    this.dna = dna_;
    this.stopped = false; //am i stuck ?
    this.dead = false; //did i hit an obstacle ?
    //what was my finish ?
    this.finish = 100000; //some high number to begin with

    this.recordDist = width;
    this.fitness = 0;
    this.maxspeed = 6.0;
    this.maxforce = 1.0;
  }

  //FITNESS FUNCTION
  //distance = distance from target
  //finish = what order did i finish (1st, 2nd, ...)
  //f(distance, finish) = (1.0f / finish^1.5) * (1.0f /distance^6)
  //a lower finish is rewarded (exponentially) and/or shorter distance to target (exponentially)
  calcFitness(){
    let d = this.recordDist;
    if(d < diam / 2){
      d = 1.0;
    }
    //reward finishing faster and getting closer
    this.fitness = (1 / pow(this.finish, 1.5)) * (1 / (pow(d, 6)));

    //if (dead) fitness = 0;
  }

  setFinish(f){
    this.finish = f;
  }

  run(obs){
    if(!this.stopped){
      this.update();
      //if i hit an edge or an obstacle
      if((this.borders()) || (this.checkObstacles(obs))){
        this.stopped = true;
        this.dead = true;
      }
    }
    //draw me!
    this.display();
  }

  //did i hit an edge
  borders(){
    if((this.pos.x < 0) || (this.pos.y < 0) || (this.pos.x > width) || (this.pos.y > height)){
      return true;
    }else {
      return false;
    }
  }

  //did i make it to the target ?
  finished(){
    let d = p5.Vector.dist(this.pos, target.getCenter());
    if(d < this.recordDist){
      this.recordDist = d;
    }
    if(target.contains(this.pos)){
      this.stopped = true;
      return true;
    }
    return false;
  }

  //did i make it to the target ?
  checkObstacles(obs){
    for(let i = 0; i < obs.length; i++){
      if(obs[i].contains(this.pos)){
        return true;
      }
    }
    return false;
  }

  update(){
    if(!this.finished()){
      //where are we? our pos will tell us what steering vector to look up in our dna
      let x = floor(this.pos.x / gridscale);
      let y = floor(this.pos.y / gridscale);
      x = constrain(x, 0, width / gridscale - 1); //make sure we are not off the edge
      y = constrain(y, 0, height /gridscale - 1); //make sure we are not off the edge

      //get the steering vector out of our genes in the right spot
      //a little reynolds steering here
      let desired = this.dna.genes[x + y * (width / gridscale)].copy();
      desired.mult(this.maxspeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      this.acceleration.add(steer);
      this.acceleration.limit(this.maxforce);

      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxspeed);
      this.pos.add(this.velocity);
      this.acceleration.mult(0);
    }
  }

  display(){
    //fill(0, 150);
    //stroke(0);
    //ellipse(pos.x, pos.y, r, r);
    //let theta = this.velocity.heading() + PI/2;
    fill(200, 100);
    if(!this.velocity.x){
      fill(255, 0, 0);
    }
    stroke(0);
    strokeWeight(0.5);

    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    //push();
    //translate(this.pos.x, this.pos.y);
    //rotate(theta);
    //beginShape(TRIANGLES);
    //vertex(0, -this.r * 2);
    //vertex(-this.r, this.r * 2);
    //vertex(this.r, this.r * 2);
    //endShape(CLOSE);
    //pop();
  }

  highlight(){
    stroke(0);
    let targetPos = target.getCenter();
    line(this.pos.x, this.pos.y, targetPos.x, targetPos.y);
    fill(255, 0, 0, 100);
    ellipse(this.pos.x, this.pos.y, 16, 16);
  }

  getFitness() {
    return this.fitness;
  }

  getDNA(){
    return this.dna;
  }

  isStopped(){
    return this.stopped;
  }

}
