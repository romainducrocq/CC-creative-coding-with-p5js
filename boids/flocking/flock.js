function Flock(){

  this.boids = [];

  this.run = function(){

    for(let i = 0; i < this.boids.length; i++){
      this.boids[i].flock(this.boids);
    }

    for(let i = 0; i < this.boids.length; i++){
      this.boids[i].run(this.boids);
    }
  }

  this.addBoid = function(b){
    this.boids.push(b);
  }
}
