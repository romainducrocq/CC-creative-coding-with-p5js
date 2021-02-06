//create the population
class Population{
  constructor(m, num){
    this.mutationRate = m; //mutation rate
    this.population = []; //array to hold the current population
    this.matingPool = [];
    this.generations = 0; //number of generations
    for(let i = 0; i < num; i++){
      this.population[i] = new Face(new DNA(), 50 + i * 75, 60);
    }
  }

  //display all faces
  display(){
    for(let i = 0; i < this.population.length; i++){
      this.population[i].display();
    }
  }

  //are we rolling over any of the faces ?
  rollover(mx, my){
    for(let i = 0; i < this.population.length; i++){
      this.population[i].rollover(mx, my);
    }
  }

  //generate a mating pool
  selection() {
    //clear the arrayList
    this.matingPool = [];

    //calculate total fitness of whole population
    let maxFitness = this.getMaxFitness();

    //calculate fitness for each member of the population (scaled to value between 0 and 1)
    //based on fitness, each member will get added to the mating pool a certain number of times
    //a higher fitness value = more entries to mating pool = more likely to be picked as a parent
    //a lower fitness value = less entries to mating pool = less likely to be picked as a parent
    for(let i = 0; i < this.population.length; i++){
      let fitnessNormal = map(this.population[i].getFitness(), 0, maxFitness, 0, 1);
      let n = floor(fitnessNormal * 100); //arbitrary multiplier

      for(let j = 0; j < n; j++){
        this.matingPool.push(this.population[i]);
      }
    }
  }

  //making the next generation
  reproduction(){
    //refill the population with children from the mating pool
    for(let i = 0; i < this.population.length; i++){
      //swing the wheel of fortune to pick 2 parents
      let m = floor(random(this.matingPool.length));
      let d = floor(random(this.matingPool.length));
      //pick 2 parents
      let mom = this.matingPool[m];
      let dad = this.matingPool[d];
      //get their genes
      let momgenes = mom.getDNA();
      let dadgenes = dad.getDNA();
      //mate their genes
      let child = momgenes.crossover(dadgenes);
      //mutate their genes
      child.mutate(this.mutationRate);
      //fill the new population with the new child
      this.population[i] = new Face(child, 50 + i * 75, 60);
    }
    this.generations++;
  }

  getGenerations() {
    return this.generations;
  }

  //find highest fitness for the population
  getMaxFitness() {
    let record = 0;
    for(let i = 0; i < this.population.length; i++){
      if(this.population[i].getFitness() > record){
        record = this.population[i].getFitness();
      }
    }
    return record;
  }

}
