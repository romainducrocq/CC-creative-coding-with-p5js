function Boid(x, y){

  this.position = createVector(x, y);
  this.velocity = p5.Vector.random2D();
  this.acceleration = createVector(0, 0);
  this.r = 5.0;
  this.maxforce = 0.05;
  this.maxspeed = 3;
  this.col = color(floor(random(255)), floor(random(255)), floor(random(255)));

  this.run = function(boids){
    this.update();
    this.borders();
    this.render();
  }

  this.applyForce = function(force){
    this.acceleration.add(force);
  }

  this.flock = function(boids){
    this.applyForce(this.separate(boids).mult(1.5));
    this.applyForce(this.align(boids).mult(1.0));
    this.applyForce(this.cohesion(boids).mult(1.0));
  }

  this.update = function(){
    this.velocity.add(this.acceleration).limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.render = function(){
    fill(this.col);
    stroke(0);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading() + radians(90));
    beginShape(TRIANGLES);
    vertex(0, -this.r*2);
    vertex(-this.r, this.r*2);
    vertex(this.r, this.r*2);
    endShape();
    pop();
  }

  this.borders = function(){
    if(this.position.x < -this.r) { this.position.x = width + this.r; }
    if(this.position.y < -this.r) { this.position.y = height + this.r; }
    if(this.position.x > width + this.r) { this.position.x = -this.r; }
    if(this.position.y > height + this.r) { this.position.y = -this.r; }
  }

  this.seek = function(target){
    return p5.Vector.sub(
      p5.Vector.sub(target, this.position).normalize().mult(this.maxspeed), //desired
      this.velocity
    ).limit(this.maxforce);
  }

  this.separate = function(boids){
    let desiredseparation = 25.0;
    let steer = createVector(0, 0, 0);
    let count = 0;

    for(let i = 0; i < boids.length; i++){
      let d = p5.Vector.dist(this.position, boids[i].position);
      if(d > 0 && d < desiredseparation){
        steer.add(p5.Vector.sub(this.position, boids[i].position).normalize().div(d));
        count++;
      }
    }

    if(count > 0){
      steer.div(count);
    }

    if(steer.mag() > 0){
      steer.normalize().mult(this.maxspeed).sub(this.velocity).limit(this.maxforce);
    }

    return steer;
  }

  this.align = function(boids){
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;

    for(let i = 0; i < boids.length; i++){
      d = p5.Vector.dist(this.position, boids[i].position);
      if(d > 0 && d < neighbordist){
        sum.add(boids[i].velocity);
        count++;
      }
    }

    if(count > 0){
      return p5.Vector.sub(sum.div(count).normalize().mult(this.maxspeed), this.velocity).limit(this.maxforce);
    }

    return createVector(0, 0);
  }

  this.cohesion = function(boids){
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;

    for(let i = 0; i < boids.length; i++){
      let d = p5.Vector.dist(this.position, boids[i].position);
      if(d > 0 && d < neighbordist){
        sum.add(boids[i].position);
        count++;
      }
    }

    if(count > 0){
      return this.seek(sum.div(count));
    }

    return createVector(0, 0);
  }
}
