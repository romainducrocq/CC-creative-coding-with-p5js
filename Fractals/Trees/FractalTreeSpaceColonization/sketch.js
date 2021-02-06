let tree;
let maxDist = 100;
let minDist = 10;

let pause = false;

let buttonPause;
let buttonRestart;
let buttonSpeed;
let buttonView;

let branchLen = 1;
let speeds = ["FASTER","SLOWER"];
let views = [{
  view : "SIDE VIEW",
  rootHeight : 400,
  leafMinHeight : 300
},{
  view : "TOP VIEW",
  rootHeight : 200,
  leafMinHeight : 400
}];

let view = 0;

function setup() {
  createCanvas(400, 400);

  tree = new Tree();

  buttonPause = createButton("PAUSE");
  buttonPause.position(10, height + 10);
  buttonPause.mousePressed(pauseTree);

  buttonRestart = createButton("RESTART");
  buttonRestart.position(buttonPause.x + buttonPause.width + 10, height + 10);
  buttonRestart.mousePressed(restart);

  buttonSpeed = createButton(speeds[0]);
  buttonSpeed.position(buttonRestart.x + buttonRestart.width + 10, height + 10);
  buttonSpeed.mousePressed(setSpeed);

  buttonView = createButton(views[1-view].view);
  buttonView.position(buttonSpeed.x + buttonSpeed.width + 10, height + 10);
  buttonView.mousePressed(setView);
}

function draw() {
  if(!pause){
    background(51);
    tree.show();
    tree.grow();
  }
}

function pauseTree() {
  pause = !pause;
  if(pause){
    buttonPause.style('color',color(255, 0, 100));
  }else{
    buttonPause.style('color',color(51));
  }
}

function restart() {
  pause = false;
  buttonPause.style('color',color(51));

  tree = new Tree();
}

function setSpeed() {
  branchLen = 6 - branchLen;
  buttonSpeed.html(speeds[1-(branchLen%5)]);

  pause = false;
  buttonPause.style('color',color(51));

  tree = new Tree();
}

function setView() {
  view = 1 - view;
  buttonView.html(views[1-view].view);

  pause = false;
  buttonPause.style('color',color(51));

  tree = new Tree();
}
