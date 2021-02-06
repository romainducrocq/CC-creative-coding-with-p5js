//initialize the population
class Population{
  constructor(m, num){
    this.mutationRate = m; //mutation rate
    this.population = new Array(num); //array to hold the current population
    this.darwin = []; //array for mating pool
    this.generations = 0; //number of generations
    //make a new set of creatures
    for(let i = 0; i < this.population.length; i++){
      this.population[i] = new Rocket(start.position, new DNA(dnasize));
    }
    this.order = 1; //keep track of the order of creature's finishing the maze
    //first one to finsih will be #1
  }

  live(obstacle){
    let record = 100000;
    let closest = 0;

    //for every creature
    for(let i = 0; i < this.population.length; i++){
      //if it finishes, mark it down as done!
      if((this.population[i].finished())){
        this.population[i].setFinish(this.order);
        this.order++;
      }
      //run it
      this.population[i].run(obstacles);

      if(this.population[i].recordDist < record){ //&& !population[i].dead) {
        record = this.population[i].recordDist;
        closest = i;
      }
    }
    this.population[closest].highlight();
    //drawing one example of the dna
    if(debug){
      this.population[closest].dna.debugDraw();
    }
  }

  //did anything finish ?
  targetReached(){
    for(let i = 0; i < population.length; i++){
      if(this.population[i].finished()){
        return true;
      }
    }
    return false;
  }

  //calculate fitness for each creature
  calcFitness(){
    for(let i = 0; i < this.population.length; i++){
      this.population[i].calcFitness();
    }
    this.order = 1;
  }

  //generate a making pool
  naturalSelection(){
    //clear the arraylist
    this.darwin = [];

    //calculate total fitness of whole population
    let totalFitness = this.getTotalFitness();
    let avgFitness = totalFitness / this.population.length;
    //calculate normalized fitness for each member of the population
    //based on normalized fitness, each member will get added to the mating pool a certain number of times a la roulette wheel
    //higher fitness = more entries to mating pool = more lickely to be picked as a parent
    //lower fitness = less entries to mating pool = less lickely to be picked as a parent
    let count = 0;
    for(let i = 0; i < this.population.length; i++){
      let fitness = this.population[i].getFitness();
      //if(fitness > avgfitness){
      this.count++;
      let fitnessNormal = fitness / totalFitness;
      let n = floor(fitnessNormal * 50000); //arbitrary multiplier, consider mapping fix
      for(let j = 0; j < n; j++){
        this.darwin.push(this.population[i]);
      }
      //}
    }
    //println("Total: " + count + " " + population.length);
  }

  //making the next generation
  generate(){
    //refill the population with children from the mating pool
    for(let i = 0; i < this.population.length; i++){
      let m = floor(random(this.darwin.length));
      let d = floor(random(this.darwin.length));
      //pick 2 parents
      let mom = this.darwin[m];
      let dad = this.darwin[d];
      //get their genes
      let momgenes = mom.getDNA();
      let dadgenes = dad.getDNA();
      //mate their genes
      let child = momgenes.crossover(dadgenes);
      //Mutate their genes
      child.mutate(this.mutationRate);
      //fill the new population with the new child
      let position = start.position.copy();
      this.population[i] = new Rocket(position, child);
    }
    this.generations++;
  }

  getGenerations(){
    return this.generations;
  }

  //compute total fitness for the population
  getTotalFitness(){
    let total = 0;
    for(let i = 0; i < this.population.length; i++){
      total += this.population[i].getFitness();
    }
    return total;
  }

}
