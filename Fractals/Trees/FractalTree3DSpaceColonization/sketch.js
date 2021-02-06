let easycam;

let tree;
let maxDist = 100;
let minDist = 10;

let pause = false;

let buttonPause;
let buttonRestart;

let branchLen = 5;

function setup() {
  createCanvas(400, 400, WEBGL);

  Dw.EasyCam.prototype.apply = function(n) {
      var o = this.cam;
      n = n || o.renderer,
      n && (this.camEYE = this.getPosition(this.camEYE), this.camLAT = this.getCenter(this.camLAT), this.camRUP = this.getUpVector(this.camRUP), n._curCamera.camera(this.camEYE[0], this.camEYE[1], this.camEYE[2], this.camLAT[0], this.camLAT[1], this.camLAT[2], this.camRUP[0], this.camRUP[1], this.camRUP[2]))
    };

  easycam = new Dw.EasyCam(this._renderer, {distance:800, center:[0,0,0]});

  tree = new Tree();

  buttonPause = createButton("PAUSE");
  buttonPause.position(10, height + 10);
  buttonPause.mousePressed(pauseTree);

  buttonRestart = createButton("RESTART");
  buttonRestart.position(buttonPause.x + buttonPause.width + 10, height + 10);
  buttonRestart.mousePressed(restart);
}

function draw() {
  if(!pause){
    translate(-width/2,-height/2,0);
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
