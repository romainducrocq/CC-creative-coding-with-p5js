//dna is the order to visit the cities

//FITNESS
function calcFitness(){
  let currentRecord = Infinity;
    for(let i = 0; i < population.length; i++){
      let d = calcDist(cities, population[i]);
      if(d < recordDistance){
         recordDistance = d;
         bestOrder = population[i].slice();
         bestFrom = generations;
      }
      if(d < currentRecord){
         currentRecord = d;
         currentBestOrder = population[i].slice();
      }
      fitness[i] = 1 / (d + 1);
      fitness[i] = pow(fitness[i], 4);
    }
    normalizeFitness();
}

function normalizeFitness() {
  let sum = 0;
  for(let i = 0; i < fitness.length; i++){
    sum += fitness[i];
  }
  for(let i = 0; i < fitness.length; i++){
    fitness[i] = fitness[i] / sum;
  }
}

//NEXT GENERATION
function nextGeneration(){
  let newPopulation = [];
  for(let i = 0; i < population.length; i++){
    let orderA = pickOne(population, fitness);
    let orderB = pickOne(population, fitness);
    let order = crossOver(orderA, orderB);
    //let order = crossOver2(orderA, orderB);
    mutate(order, mutationRate);
    newPopulation[i] = order;
  }
  population = newPopulation;
}

function pickOne(list, prob){
  let index = 0;
  let r = random(1);
  while(r > 0){
    r = r - prob[index];
    index++;
  }
  index--;
  return list[index].slice();
}

function crossOver(orderA, orderB){
  let start = floor(random(orderA.length));
  let end = floor(random(start + 1, orderA.length));
  let newOrder = orderA.slice(start, end);

  for(i = 0; i < orderB.length; i++){
    if(!newOrder.includes(orderB[i])){
      newOrder.push(orderB[i]);
    }
  }
  return newOrder;
}

function mutate(order, mutationRate){
  for(let i = 0; i < totalCities; i++){
    if(random(1) < mutationRate){
      let indexA = floor(random(order.length));
      let indexB = (indexA + 1) % totalCities;
      swap(order, indexA, indexB);
    }
  }
}

//////////////////////////////////////////
//other crossover method
//less efficient
function crossOver2(orderA, orderB){
  let leftovers = [];
  let newOrder = [];
  for(let i = 0; i < orderA.length; i++){
    if(orderA[i] == orderB[i]){
      newOrder[i] = orderA[i];
    }else {
      newOrder[i] = -1;
      leftovers.push(orderA[i]);
    }
  }
  shuffle(leftovers, true);
  for(let i = 0; i < newOrder.length; i++){
    if(newOrder[i] == -1){
      newOrder[i] = leftovers.pop();
    }
  }
  return newOrder;
}
