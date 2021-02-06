function make2DArray(cols, rows){
  let arr = new Array(cols);
  for(let i=0; i < arr.length; i++){
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 20;

const openSet = new Set();
const closeSet = new Set();

let start;
let end;

let path;

let maxW = 800;
let maxH = 600;

let obstacles = 0.3;

let diagonal = true;

let canvas;
let widthInput;
let heightInput;
let zoomSlider;
let obstacleSlider;
let diagCheckbox;

function setup() {
  canvas = createCanvas(0, 0);
  canvas.position(0, 50);
  gui();

  reset();
}

function draw() {
  if(openSet.size > 0){

    let current;

    openSet.forEach(function(node){
      if (!current || node.f < current.f){
        current = node;
      }
    });

    if(current === end){
      noLoop();
    }else{
      openSet.delete(current);
      closeSet.add(current);

      for(let i = 0; i < current.neighbors.length; i++){
        if(!closeSet.has(current.neighbors[i].neighbor) && !current.neighbors[i].neighbor.obstacle){
          if(openSet.has(current.neighbors[i].neighbor)){
            if(current.g+current.neighbors[i].dist < current.neighbors[i].neighbor.g){
              current.neighbors[i].neighbor.g = current.g+current.neighbors[i].dist;
            }else{
              continue;
            }
          }else{
            current.neighbors[i].neighbor.g = current.g+current.neighbors[i].dist;
            openSet.add(current.neighbors[i].neighbor);
          }
          current.neighbors[i].neighbor.h = heuristic(current.neighbors[i].neighbor, end);
          current.neighbors[i].neighbor.f = current.neighbors[i].neighbor.g + current.neighbors[i].neighbor.h;
          current.neighbors[i].neighbor.cameFrom = current;
        }
      }
    }

    background(220);

    for(let i = 0; i < cols; i ++){
      for(let j = 0; j < rows; j++){
        grid[i][j].show(undefined);
      }
    }

    openSet.forEach(function(node){node.show(color(100, 255, 0));});

    closeSet.forEach(function(node){node.show(color(255, 0, 100));});

    path = [];
    do {
      path.push(current);
      current = current.cameFrom;
    } while (current);

    /*for(p of path){
      p.show(color(0, 100, 255));
    }*/

    stroke(color(0, 100, 255));
    strokeWeight(5);
    noFill();
    beginShape();
    curveVertex(path[0].i*resolution + resolution/2, path[0].j*resolution + resolution/2);
    for(p of path){
      curveVertex(p.i*resolution + resolution/2, p.j*resolution + resolution/2);
    }
    curveVertex(path[path.length-1].i*resolution + resolution/2, path[path.length-1].j*resolution + resolution/2);
    endShape();
    strokeWeight(1);

    end.show(color(0,100,255,100));
  }else{
    noLoop();
  }
}

function heuristic(a, b) {
  return abs(a.i-b.i) + abs(a.j-b.j); //Manhattan distance
  //return dist(a.i, a.j, b.i, b.j); //Euclidian distance
}

function reset() {

  noLoop();

  openSet.clear();
  closeSet.clear();

  resolution = zoomSlider.value();
  obstacles = obstacleSlider.value();
  diagonal = diagCheckbox.checked();

  setSize(int(widthInput.value()), int(heightInput.value()));

  widthInput.value("" + width);
  heightInput.value("" + height);


  //setSize((windowWidth < maxWidth ? windowWidth : maxWidth), ((windowHeight - canvas.y) < maxHeight ? (windowHeight - canvas.y) : maxHeight));

  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols,rows);

  for(let i = 0; i < cols; i ++){
    for(let j = 0; j < rows; j++){
      grid[i][j] = new Node(i, j);
    }
  }

  grid[0][0].obstacle = false;
  grid[cols-1][rows-1].obstacle = false;

  for(let i = 0; i < cols; i ++){
    for(let j = 0; j < rows; j++){
      grid[i][j].addNeighbors();
    }
  }

  start = grid[0][0];
  end = grid[cols-1][rows-1];

  openSet.add(start);

  loop();
}

function setSize(w, h) {
  let maxWidth = getMaxWidth();
  let maxHeight = getMaxHeight();

  if(isNaN(w) || w < 1){
    w = width;
  }else if(w > maxWidth){
    w = maxWidth;
  }
  if(isNaN(h) || h < 1){
    h = height;
  }else if(h > maxHeight){
    h = maxHeight;
  }

  if(w%resolution !== 0){
      w += (resolution - w%resolution);
      if(w > maxWidth){
        w -= resolution;
      }
  }
  if(h%resolution !== 0){
      h += (resolution - h%resolution);
      if(h > maxHeight){
        h -= resolution;
      }
  }

  resizeCanvas(w, h);
}

function getMaxWidth() {
  return windowWidth;
}

function getMaxHeight() {
  return windowHeight - canvas.y;
}

function gui() {
  let titleDiv = createDiv("A* search pathfinding");
  titleDiv.position(10,10);
  titleDiv.style('font-size', '24px');
  titleDiv.style('font-family','Ubuntu, sans-serif');
  titleDiv.style('color',color(51));

  widthInput = createInput("");
  widthInput.position(300,25);
  widthInput.size(50, 10);
  widthInput.value("" + maxW);
  widthInput.style('font-size', '13px');

  let widthDiv = createDiv("Width :");
  widthDiv.position(300,5);
  widthDiv.style('font-size', '16px');
  widthDiv.style('font-family','Ubuntu, sans-serif');
  widthDiv.style('color',color(51));

  heightInput = createInput("");
  heightInput.position(widthInput.x + widthInput.width + 10, 25);
  heightInput.size(50, 10);
  heightInput.value("" + maxH);
  heightInput.style('font-size', '13px');

  let heightDiv = createDiv("Height :");
  heightDiv.position(widthInput.x + widthInput.width + 10, 5);
  heightDiv.style('font-size', '16px');
  heightDiv.style('font-family','Ubuntu, sans-serif');
  heightDiv.style('color',color(51));

  zoomSlider = createSlider(10, 50, resolution, 10);
  zoomSlider.position(heightInput.x + heightInput.width + 10, 25);
  zoomSlider.size(50);

  let zoomDiv = createDiv("Zoom :");
  zoomDiv.position(heightInput.x + heightInput.width + 10, 5);
  zoomDiv.style('font-size', '16px');
  zoomDiv.style('font-family','Ubuntu, sans-serif');
  zoomDiv.style('color',color(51));

  obstacleSlider = createSlider(0.0, 0.5, obstacles, 0.1);
  obstacleSlider.position(zoomSlider.x + zoomSlider.width + 10, 25);
  obstacleSlider.size(50);

  let obstacleDiv = createDiv("Walls :");
  obstacleDiv.position(zoomSlider.x + zoomSlider.width + 10, 5);
  obstacleDiv.style('font-size', '16px');
  obstacleDiv.style('font-family','Ubuntu, sans-serif');
  obstacleDiv.style('color',color(51));

  diagCheckbox = createCheckbox("", diagonal);
  diagCheckbox.position(obstacleSlider.x + obstacleSlider.width + 10, 25);

  let diagDiv = createDiv("Diags :");
  diagDiv.position(obstacleSlider.x + obstacleSlider.width + 10, 5);
  diagDiv.style('font-size', '16px');
  diagDiv.style('font-family','Ubuntu, sans-serif');
  diagDiv.style('color',color(51));

  let newButton = createButton("NEW");
  newButton.position(obstacleSlider.x + obstacleSlider.width + 100, 10);
  newButton.style('font-size', '16px');
  newButton.style('font-family','Ubuntu, sans-serif');
  newButton.style('color',color(51));
  newButton.mousePressed(reset);
}

/*

Div = createDiv("");
Div.position(,);
Div.style('font-size', '16px');
Div.style('font-family','Ubuntu, sans-serif');
Div.style('color',color(51));
// let val = Div.html(); //get
// Div.html(""); //set

Button = createButton("");
Button.position(,);
Button.style('font-size', '16px');
Button.style('font-family','Ubuntu, sans-serif');
Button.style('color',color(51));
Button.mousePressed(function);

Slider = createSlider(1, 3, 2, 1);
Slider.position(,);
// let val = Slider.value(); //get
// Slider.value(int); //set

Input = createInput("");
Input.position(,);
Input.size(50);
Input.value("");
// let val = Input.value(); //get
// Input.value(""); //set

Checkbox = createCheckbox("", boolean);
Checkbox.position(,);
// let val = Checkbox.checked(); //get
// Checkbox.checked(boolean); //set

function keyPressed() {
  if(keyCode === 80){ //P
  }else if(keyCode === 32){ //SPACE
  }else if(keyCode === UP_ARROW){
  }else if (keyCode === DOWN_ARROW){
  }else if (keyCode === LEFT_ARROW){
  }else if (keyCode === RIGHT_ARROW){
  }
}

function mousePressed() {
}
*/
