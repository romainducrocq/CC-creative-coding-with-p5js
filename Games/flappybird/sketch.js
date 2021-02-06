let canvas;

let difficulty = [[2,192,70],[2,160,60],[3,128,50]];
let speed = difficulty[1][0];
let space = difficulty[1][1];
let fcount = difficulty[1][2];

let titleDiv;
let scoreDiv;

let tagGo;
let tagDifficulty;
let tagPause;
let tagPressP;

let sliderDifficulty;

let button;
let buttonPause;
let buttonUp;

let bird;
let pipes = [];
let score = 0;

let pause = false;

function setup() {
  canvas = createCanvas(400, 400);
  canvas.position(0, 50);
  canvas.mousePressed(up);

  titleDiv = createDiv('Flappy bird');
  titleDiv.position(10, 10);
  titleDiv.style('font-size', '24px');
  titleDiv.style('font-family','Ubuntu, sans-serif');
  titleDiv.style('color',color(51));

  scoreDiv = createDiv('Score : ' + score);
  scoreDiv.position(width/2 + 10, 10);
  scoreDiv.style('font-size', '24px');
  scoreDiv.style('font-family','Ubuntu, sans-serif');
  scoreDiv.style('color',color("#77DD77"));

  tagGo = createDiv('New game : ');
  tagGo.position(10, height + 60);
  tagGo.style('font-size', '16px');
  tagGo.style('font-family','Ubuntu, sans-serif');
  tagGo.style('color',color(51));

  tagDifficulty = createDiv('Difficulty : ');
  tagDifficulty.position(10, height + 90);
  tagDifficulty.style('font-size', '16px');
  tagDifficulty.style('font-family','Ubuntu, sans-serif');
  tagDifficulty.style('color',color(51));

  tagPause = createDiv('Pause : ');
  tagPause.position(10, height + 120);
  tagPause.style('font-size', '16px');
  tagPause.style('font-family','Ubuntu, sans-serif');
  tagPause.style('color',color(51));

  button = createButton("GO!");
  button.position(1/4*width + 10, height + 60);
  button.mousePressed(newGame);

  sliderDifficulty = createSlider(1, 3, 2);
  sliderDifficulty.position(1/4*width + 10, height + 90);

  buttonPause = createButton("PAUSE");
  buttonPause.position(1/4*width + 10, height + 120);
  buttonPause.mousePressed(pauseGame);

  tagPressP = createDiv('or press P');
  tagPressP.position(buttonPause.x + buttonPause.width + 10, height + 120);
  tagPressP.style('font-size', '16px');
  tagPressP.style('font-family','Ubuntu, sans-serif');
  tagPressP.style('color',color(51));

  buttonUp = createButton("^");
  buttonUp.position(3/4*width + 10, height + 60);
  buttonUp.style("padding", "30px 30px 30px 30px");
  buttonUp.mousePressed(up);

  bird = new Bird();
  pipes.push(new Pipe(speed,space));
}

function draw() {
  if(!pause){

    background("#77DD77");

    for(let i = pipes.length-1; i >= 0; i--){
      pipes[i].show();
      pipes[i].update();

      if(pipes[i].hits(bird)){
        resetGame();
        break;
      }

      if(pipes[i].passed(bird)){
        score++;
      }

      if(pipes[i].offscreen()){
        pipes.splice(i, 1);
      }
    }

    bird.update();
    bird.show();

    showText();

    if(frameCount % fcount === 0){
      pipes.push(new Pipe(speed,space));
    }
  }
}

function resetGame() {
  bird = new Bird();
  pipes = [];
  score = 0;
}

function newGame(){
  setDifficulty();
  resetGame();
  pause = false;
  buttonPause.style('color',color(51));
}

function setDifficulty() {
  speed = difficulty[sliderDifficulty.value()-1][0];
  space = difficulty[sliderDifficulty.value()-1][1];
  fcount = difficulty[sliderDifficulty.value()-1][2];
}

function showText(){
  scoreDiv.html('Score : ' + score);
}

function keyPressed() {
  if(keyCode === 80){
    pauseGame();
  }else if(keyCode === 32  && !pause){
    up();
  }
}

function up() {
  bird.up();
}

function pauseGame() {
  pause = !pause;
  if(pause){
    buttonPause.style('color',color(255, 0, 100));
  }else{
    buttonPause.style('color',color(51));
  }
}
