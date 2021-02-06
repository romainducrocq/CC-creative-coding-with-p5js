function Population(){
  this.rockets = [];
  this.popsize = 25;
  this.matingPool = [];

  for(let i = 0; i < this.popsize; i++){
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function(){
    let maxfit = 0;
    for(let i = 0; i < this.popsize; i++){
      this.rockets[i].calcFitness();
      if(this.rockets[i].fitness > maxfit){
        maxfit = this.rockets[i].fitness;
      }
    }
    maxfitnessP.html("max fitness: " + round(maxfit, 0));
    //console.log(this.rockets);

    this.matingPool = [];
    for(let i = 0; i < this.popsize; i++){
      //TODO
      //change from here
      //normalize fitness between 0 and 1
      this.rockets[i].fitness /= maxfit;
      let n = this.rockets[i].fitness * 100;
      for(let j = 0; j < n; j++){
        this.matingPool.push(this.rockets[i]);
        //console.log(this.matingPool.length);
      }
      //to here
    }
  }

  this.selection = function(){
    let newRockets = [];
    for(i = 0; i < this.rockets.length; i++){
      let dadDNA = random(this.matingPool).dna;
      let momDNA = random(this.matingPool).dna;
      let childDNA = momDNA.crossover(dadDNA);
      childDNA.mutation();
      newRockets[i] = new Rocket(childDNA);
    }
    this.rockets = newRockets;
  }

  this.run = function(){
    for(let i = 0; i < this.popsize; i++){
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }

}
