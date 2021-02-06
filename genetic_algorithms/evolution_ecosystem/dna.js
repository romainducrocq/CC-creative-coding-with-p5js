//constructor makes a random DNA
class DNA{
  constructor(newgenes){
    if(newgenes){
      this.genes = newgenes;
    }else {
      //the genetic sequence
      //dna is a random floating point value between 0 and 1
      this.genes = new Array(1);
      for(let i = 0; i < this.genes.length; i++) {
        this.genes[i] = random(0, 1);
      }
    }
  }

  copy() {
    let newgenes = [];
    for(let i = 0; i < this.genes.length; i++){
      newgenes[i] = this.genes[i];
    }
    return new DNA(newgenes);
  }

  //based on mutation probability
  mutate(m){
    for(let i = 0; i < this.genes.length; i++){
      if(random(1) < m){
        this.genes[i] = random(0, 1);
      }
    }
  }

}
