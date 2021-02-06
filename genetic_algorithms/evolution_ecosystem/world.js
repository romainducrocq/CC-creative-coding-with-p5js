//the world we live in
//has bloops and food

//constructor
class World{
  constructor(num){
    //start with initial food and creatures
    this.food = new Food(num);
    this.bloops = []; //an array for all creatures
    for(let i = 0; i < num; i++){
      let l = createVector(random(width), random(height));
      let dna = new DNA();
      this.bloops.push(new Bloop(l, dna));
    }
  }

  //make new creature
  born(x, y){
    let l = createVector(x, y);
    let dna = new DNA();
    this.bloops.push(new Bloop(l, dna));
  }

  //run the world
  run(){
    //deal with food
    this.food.run();

    //cycle through the ArrayList backwards bc deleting
    for(let i = this.bloops.length - 1; i >= 0; i--){
      //all bloops run and eat
      let b = this.bloops[i];
      b.run();
      b.eat(this.food);
      //if it's dead, kill it and make food
      if(b.dead()){
        this.bloops.splice(i, 1);
        this.food.add(b.position);
      }
      //perhaps this bloop would like to make a baby ?
      let child = b.reproduce();
      if(child != null){
        this.bloops.push(child);
      }
    }
  }
}
