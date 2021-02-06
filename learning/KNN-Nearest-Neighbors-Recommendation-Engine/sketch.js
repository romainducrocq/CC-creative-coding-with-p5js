//python3 -m http.server
//fx http://localhost:8000/index.html

let data;
let users = {};
let titles = [];

let h1;

let dropdown1;
let button;
let scoresP;

let formTitle;
let formDivs = [];
let formDropdowns = [];
let formButton;
let predictP;

//https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808
async function loadData(){
  let response = await fetch('movies.json');
  let d = await response.json();
  return d;
}

function setup() {
  noCanvas();
  loadData()
  .then(d => setup_(d))
  .catch(reason => console.log(reason.message))
}

function setup_(d){
  data = d;

  h1 = createP("<strong>Star Wars Recommendation Engine</strong>")

  dropdown1 = createSelect('');
  button = createButton('submit');
  scoresP = createP('');

  for(let i = 0; i < data.users.length; i++){
    let name = data.users[i].name;
    users[name] = data.users[i];

    dropdown1.option(name);
  }

  titles = Object.keys(data.users[0]);
  titles.splice(titles.indexOf('timestamp'),1);
  titles.splice(titles.indexOf('name'),1);

  button.mousePressed(forChosenUser =>
    { findNearestNeighbors(users[dropdown1.value()], 5, false); });

  formTitle = createP("My ratings:");

  for(let i = 0; i < titles.length; i++){
    formDivs[i] = createDiv(titles[i] + ": ");
    formDropdowns[i] = createSelect('');
    formDropdowns[i].parent(formDivs[i]);
    formDropdowns[i].title = titles[i];
    formDropdowns[i].option('None');
    for(let j = 1; j <= 5; j++){
      formDropdowns[i].option(j);
    }
  }

  formButton = createButton('submit');
  predictP = createP('');

  formButton.mousePressed(predictRatings);
}

function draw() {
  noLoop();
}

function findNearestNeighbors(user1, knn, predict){

  if(user1 === undefined){
    scoresP.html("undefined");
    return;
  }

  let similarityScores = {};
  for(let i = 0; i < data.users.length; i++){
    let name2 = data.users[i].name;
    if(name2 != user1.name){
      //similarityScores[name2] = euclideanSimilarityScore(user1, users[name2]).similarityScore;
      similarityScores[name2] = pearsonCoefficient(user1, users[name2]).pearson;
    } else {
      similarityScores[name2] = -1;
    }
  }

  data.users.sort(compareSimilarity);
  function compareSimilarity(a, b) {
    return similarityScores[b.name] - similarityScores[a.name];
  }

  let str = knn + " Nearest Neighbors:" + "<br>";
  for(let i = 0; i < knn; i++){
    str += data.users[i].name + ": " + nf(similarityScores[data.users[i].name], 1, 2) + "<br>";
  }
  if(!predict){
    scoresP.html(str);
  }else{
    let suggestions = [];
    str += "<br><br>" + "SUGGESTIONS: " + "<br>";
    for(let i = 0; i < titles.length; i++){
      if(user1[titles[i]] == null ){

        let weightedScore = 0;
        let similarityScore = 0;
        let score = 0;
        for(j = 0; j < knn; j++){
          let similarity = similarityScores[data.users[j].name];
          let rating = data.users[j][titles[i]];
          if(rating != null){
            weightedScore += rating * similarity;
            similarityScore += similarity;
          }
        }
        if(similarityScore == 0){
          score = 0;
        }else{
          score = weightedScore / similarityScore;
        }

        suggestions.push({'title': titles[i], 'score': score});
      }
    }

    suggestions.sort(comparesScores);
    function comparesScores(a, b) {
      return b.score - a.score;
    }

    for(let i = 0; i < suggestions.length; i++){
      str += suggestions[i].title + ": " + nf(suggestions[i].score, 1, 2) + "<br>";
    }

    predictP.html(str);
  }
}

function predictRatings(){
  let newUser = {};
  for(let i = 0; i < formDropdowns.length; i++){
    newUser[formDropdowns[i].title] = int(formDropdowns[i].value());
    if(isNaN(newUser[formDropdowns[i].title])){
      newUser[formDropdowns[i].title] = null;
    }
  }
  findNearestNeighbors(newUser, 5, true);

}





























//
