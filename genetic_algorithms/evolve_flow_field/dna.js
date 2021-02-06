//dna is an array of vectors

//constructor makes a dna of random pvectors
class DNA{
  constructor(num){
    //the genetic sequence
    if(num instanceof Array){
      let newgenes = num;
      this.genes = newgenes;
    }else {
      this.genes = new Array(num);
      for(let i = 0; i < this.genes.length; i++){
        this.genes[i] = p5.Vector.random2D();
      }
    }
  }

  //crossover
  //creates new dna sequence from two (this & partner)
  crossover(partner){
    let child = [];
    //pick a midpoint
    let crossover = floor(random(this.genes.length));
    //take half from one and half from the other
    for(let i = 0; i < this.genes.length; i++){
      if(i > crossover){
        child[i] = this.genes[i];
      }else {
        child[i] = partner.genes[i];
      }
    }
    let newgenes = new DNA(child);
    return newgenes;
  }

  //based on a mutation probability, picks a new random vector
  mutate(m){
    for(let i = 0; i < this.genes.length; i++){
      if(random(1) < m){
        this.genes[i] = p5.Vector.random2D();
      }
    }
  }

  debugDraw(){
    let cols = floor(width / gridscale);
    let rows = floor(height / gridscale);
    for(let i = 0; i < cols; i++){
      for(let j = 0; j < rows; j++){
        this.drawVector(this.genes[i + j * cols], i * gridscale, j * gridscale, gridscale - 2);
      }
    }
  }

  //renders a vector object v as an arrow and a location x, y
  drawVector(v, x, y, scayl){
    push();
    let arrowsize = 4;
    //translate to location to render vector
    translate(x + gridscale / 2, y);
    stroke(0, 100);
    //call vector heading function to get direction (pointing up is a heading of 0) and rotate
    rotate(v.heading());
    //calculate length of vector and scale it to be bigger or smaller if necessary
    let len = v.mag() * scayl;
    //draw three lines to make an arrow (draw pointing up since weve rotate to the proper direction)
    line(-len /2, 0, len / 2, 0);
    //noFill();
    //ellipse(-len / 2, 0, 2, 2);
    pop();
  }

}
