//a collection of food in the world

class Food{
  constructor(num){
    //start with some food
    this.food = [];
    for(let i = 0; i < num; i++){
      this.food.push(createVector(random(width), random(height)));
    }
  }

  //add some food at a location
  add(l){
    this.food.push(l.copy());
  }

  //display the food
  run(){
    for(let i = 0; i < this.food.length; i++){
      let f = this.food[i];
      rectMode(CENTER);
      stroke(0);
      fill(127);
      rect(f.x, f.y, 8, 8);
    }

    //there's a small chance food will appear randomly
    if(random(1) < 0.001){
      this.food.push(createVector(random(width), random(height)));
    }
  }

  //return the list of Food
  getFood(){
    return this.food;
  }
  
}
