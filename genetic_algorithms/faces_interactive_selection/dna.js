//constructor makes a random dna
class DNA{
  constructor(newgenes){
    //dna is random floating point values between 0 and 1
    //the genetic sequence
    let len =  20; //arbitrary length
    if(newgenes){
      this.genes = newgenes;
    }else{
      this.genes = new Array(len);
      for(let i = 0; i < this.genes.length; i++){
        this.genes[i] = random(0, 1);
      }
    }
  }

  //crossover
  //creates new dna sequence from two
  crossover(partner){
    let child = new Array(this.genes.length);
    let crossover = floor(random(this.genes.length));
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

  //based on a mutation probability, picks up a new random character in array spots
  mutate(m){
    for(let i = 0; i < this.genes.length; i++){
      if(random(1) < m) {
        this.genes[i] = random(0, 1);
      }
    }
  }








}
