//create a bloop creature
class Bloop{
  constructor(l, dna_){
    this.position = l.copy(); //location
    this.health = 400; //life timer
    this.xoff = random(1000); //for perlin noise
    this.yoff = random(1000);
    this.dna = dna_; //dna
    //dna will determine size and maxspeed
    //the bigger the bloop, the slower it is
    this.maxspeed = map(this.dna.genes[0], 0, 1, 15, 0);
    this.r = map(this.dna.genes[0], 0, 1, 0, 50);
  }

  run(){
    this.update();
    this.borders();
    this.display();
  }

  //a bloop can find food and eat it
  eat(f) {
    let food = f.getFood();
    //are we touching any food objects ?
    for(let i = food.length - 1; i >= 0; i--){
      let foodLocation = food[i];
      let d = p5.Vector.dist(this.position, foodLocation);
      //if we are, juice up strength
      if(d < this.r / 2){
        this.health += 100;
        food.splice(i, 1);
      }
    }
  }

  //at any moment there is a teeny, tiny chance a bloop will reproduce
  reproduce(){
    //asexual reproduction
    if(random(1) < 0.0005){
      //child is exact copy of single parent
      let childDNA = this.dna.copy();
      //child DNA can mutate
      childDNA.mutate(0.01);
      return new Bloop(this.position, childDNA);
    }else {
      return null;
    }
  }

  //method to update position
  update() {
    //simple movement based on perlon noise
    let vx = map(noise(this.xoff), 0, 1, -this.maxspeed, this.maxspeed);
    let vy = map(noise(this.yoff), 0, 1, -this.maxspeed, this.maxspeed);
    let velocity = createVector(vx, vy);
    this.xoff += 0.01;
    this.yoff += 0.01;

    this.position.add(velocity);
    //death always looming
    this.health -= 0.2;
  }

  //wraparound
  borders(){
    if(this.position.x < -this.r){
      this.position.x = width + this.r;
    }
    if(this.position.y < -this.r){
      this.position.y = height + this.r;
    }
    if(this.position.x > this.width + this.r){
      this.position.x = -r;
    }
    if(this.position.y > this.height + this.r){
      this.position.y = -r;
    }
  }

  //method to display
  display() {
    ellipseMode(CENTER);
    stroke(0, this.health);
    fill(0, this.health);
    ellipse(this.position.x, this.position.y, this.r, this.r);
  }

  //death
  dead(){
    if(this.health < 0.0){
      return true;
    }else {
      return false;
    }
  }

}
