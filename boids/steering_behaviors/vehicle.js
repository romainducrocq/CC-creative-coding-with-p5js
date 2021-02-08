//vehicle class

function Vehicle(x, y, dna){
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 4;
    this.maxspeed = 5;
    this.maxforce = 0.5;

    this.health = 1;

//hyperparameters to tune
/////////////////////////
    this.healthDecreaseStep = 0.005;
    this.foodNutrition = 0.2;
    this.poisonNutrition = -1;

    this.cloneRate = 0.002;
    this.mutationRate = 0.01;
/////////////////////////

    this.mutate = function(dna){
      if(random(1) < this.mutationRate){
        dna[0] += random(-0.1, 0.1);
      }
      if(random(1) < this.mutationRate){
        dna[1] += random(-0.1, 0.1);
      }
      if(random(1) < this.mutationRate){
        dna[2] += random(-10, 10);
      }
      if(random(1) < this.mutationRate){
        dna[3] += random(-10, 10);
      }
      return dna;
    }

    //the dna is a 4 element array with
    //the weights of the forces of attraction
    this.maxattraction = 2;
    this.minattraction = -2;
    //the perception radiuses of the environment
    this.perceptionRadius = 100;
    //0 is the attraction force to food (attraction)
    //1 is the attraction force to poison (repulsion)
    //2 is the perception radius of the food
    //3 is the perception radius of the poison
    this.dna = [];
    if(dna){
      this.dna = this.mutate(dna);
    }else {
      this.dna[0] = random(this.minattraction, this.maxattraction);
      this.dna[1] = random(this.minattraction, this.maxattraction);
      this.dna[2] = random(0, this.perceptionRadius);
      this.dna[3] = random(0, this.perceptionRadius);
    }

  //method to update location
  this.update = function(){
    this.health -= this.healthDecreaseStep;
    //update velocity
    this.velocity.add(this.acceleration);
    //limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    //reset acceleration to 0 each cycle
    this.acceleration.mult(0);
  }

  this.applyForce = function(force){
    //we could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  //a method that calculates a steering force towards a target
  //steer = desired velocity - current velocity
  this.seek = function(target){
    //a vector pointing from the location to the target
    let desired = p5.Vector.sub(target, this.position);
    //scale to maximum speed
    desired.setMag(this.maxspeed);
    //steering = desired - velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    //limit to maximum steering force
    steer.limit(this.maxforce);

    return steer;
   }

   this.eat = function(list, nutrition, perception){
     let record = Infinity;
     let closest = null;
     for(let i = list.length - 1; i >= 0; i--){
       let d = this.position.dist(list[i]);

       if(d < this.maxspeed){
         list.splice(i, 1);
         this.health += nutrition;
       } else if(d < record && d < perception){
         record = d;
         closest = list[i];
       }
     }

     if (closest != null) {
       return this.seek(closest);
     }

     return createVector(0, 0);
   }

   this.steerBehavior = function(attract, repulse){
     let steerA = this.eat(attract, this.foodNutrition, this.dna[2]);
     let steerR = this.eat(repulse, this.poisonNutrition, this.dna[3]);

     steerA.mult(this.dna[0]);
     steerR.mult(this.dna[1]);

     this.applyForce(steerA);
     this.applyForce(steerR);
   }

   this.dead = function(){
     return (this.health < 0);
   }

   this.boundaries = function(){
     let desired = null;

     if(this.position.x < bDist){
       desired = createVector(this.maxspeed, this.velocity.y);
     } else if (this.position.x > width - bDist) {
       desired = createVector(-this.maxspeed, this.velocity.y);
     }

     if(this.position.y  < bDist){
       desired = createVector(this.velocity.x, this.maxspeed);
     } else if (this.position.y > height - bDist) {
       desired = createVector(this.velocity.x, -this.maxspeed);
     }

     if(desired !== null){
       desired.normalize();
       desired.mult(this.maxspeed);
       let steer = p5.Vector.sub(desired, this.velocity);
       steer.limit(this.maxforce);
       this.applyForce(steer);
     }
   }

   this.clone = function(){
     if(random(1) < this.cloneRate){
       return new Vehicle(this.position.x, this.position.y, this.dna);
     }
     return null;
   }

   this.display = function(){
     //draw health
     let h = lerpColor(color(255, 0, 0, 100), color(0, 255, 0, 100), this.health);

     //draw a triangle rotated in the direction of velocity
     let theta = this.velocity.heading() + PI / 2;
     fill(h);
     stroke(h);
     strokeWeight(1);
     push();
     translate(this.position.x, this.position.y);
     rotate(theta);
     beginShape();
     vertex(0, -this.r * 2);
     vertex(-this.r, this.r * 2);
     vertex(this.r, this.r * 2);
     endShape(CLOSE);

     if(debug.checked()){
       noFill();
       stroke(0, 255, 0, 100);
       line(5, 0, 5, -this.dna[0]*50);
       ellipse(0,0, this.dna[2] * 2);
       stroke(255, 0, 0, 100);
       line(-5, 0, -5, -this.dna[1]*50);
       ellipse(0,0, this.dna[3] * 2); 
     }

     pop();
   }
}
