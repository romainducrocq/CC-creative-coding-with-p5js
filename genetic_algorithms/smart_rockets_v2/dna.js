// dna is an array of vectors

class DNA{
  constructor(newgenes){
    // the maximum strength of the forces
    this.maxforce = 0.1;

    //The genetic sequence
    if (newgenes) {
      this.genes = newgenes;
    } else {
      this.genes = [];
      //constructor (makes a DNA of random PVectors)
      for(let i = 0; i < lifetime; i++){
        let angle = random(TWO_PI);
        this.genes[i] = createVector(cos(angle), sin(angle));
        this.genes[i].mult(random(0, this.maxforce));
      }
    }

    //let's give each rocket an extra boost of strength for its first frame
    this.genes[0].normalize();
  }

  // crossover
  //creates a new dna sequence from two (this & partner)
  crossover(partner){
    let child = new Array(this.genes.length);
    // pick a midpoint
    let crossover = int(random(this.genes.length));
    // take genes from one and from other
    for(let i = 0; i < this.genes.length; i++){
      if(i > crossover){
        child[i] = this.genes[i];
      } else {
        child[i] = partner.genes[i];
      }
    }
    let newgenes = new DNA(child);
    return newgenes;
  }

  //based on a mutation probability, picks a new random Vector
  mutate(m){
    for(let i = 0; i < this.genes.length; i++){
      if(random(1) < m){
        let angle = random(TWO_PI);
        this.genes[i] = createVector(cos(angle), sin(angle));
        this.genes[i].mult(random(0, this.maxforce));
        if(i == 0){
          this.genes[i].normalize();
        }
      }
    }
  }
}
