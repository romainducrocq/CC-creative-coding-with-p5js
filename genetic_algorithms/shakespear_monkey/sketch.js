// Genetic Algorithm, Evolving Shakespear
//
// Demonstration of using a genetic algorithm to perform a search
//
// setup()
// Step 1: The population
//  - Create an empty population (an array of ArrayList)
//  - Fill it with DNA encoded objects (pick random values to start)
//
// Step 2: Reproduction
//  - Create a new empty population
//  - Fill the new population by executing the following steps:
//      1. Pick two parent objects from the mating pool
//      2. Crossover -- create a child object by mating these two parents
//      3. Mutate -- mutate the child's DNA based on a given probability
//      4. Add the child object to the new population
//  - Replace the old population with the new population
//
//  - Rinse and repeat

let target;
let popmax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;

function setup() {
  bestPhrase = createP("Best phrase:");
  bestPhrase.class("best");

  allPhrases = createP("All phrases:");
  allPhrases.position(600, 10);
  allPhrases.class("all");

  stats = createP("Stats");
  stats.class("stats");

  //target = "To be or not to be."
  target = "Je t aime mon bidou.";
  popmax = 200;
  mutationRate = 0.01;

  //Create a population with a target phrase, mutation rate, and population max
  population = new Population(target, mutationRate, popmax);
}

function draw() {
  //Generate mating pool
  population.naturalSelection();
  //Create next generation
  population.generate();
  //Calculate fitness
  population.calcFitness();

  population.evaluate();

  //If we found the target phrase, stop
  if(population.isFinished()){
    noLoop();
  }

  displayInfo();
}

function displayInfo(){
  //Display current status of population
  let answer = population.getBest();

  bestPhrase.html("Best phrase:<br>" + answer);

  let statstext = "total generations: " + population.getGenerations() + "<br>";
  statstext += "average fitness: " + nf(population.getAverageFitness()) + "<br>";
  statstext += "total population: " + popmax + "<br>";
  statstext += "mutation rate: " + floor(mutationRate * 100)+ "%";

  stats.html(statstext);

  allPhrases.html("All phrases:<br>" + population.allPhrases());

}
