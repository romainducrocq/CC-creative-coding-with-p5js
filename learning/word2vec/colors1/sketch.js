let data;
let vectors;

let pos;

function preload() {
  data = loadJSON("xkcd.json");
}

function processData(data) {
  let vectors = {};
  for(let i = 0; i < data.colors.length; i++){
    let label = data.colors[i].color;
    let rgb = color(data.colors[i].hex);
    vectors[label] = createVector(red(rgb), green(rgb), blue(rgb));
  }
  return vectors;
}

function setup() {
  noCanvas();
  //console.log(data);
  vectors = processData(data);
  //console.log(vectors);
  pos = createVector(random(255), random(255), random(255));
  createDiv(pos);
}

function draw() {
  let colorName = findNearest(pos);
  let div = createDiv(colorName).style('background-color',
    `rgb(${vectors[colorName].x}, ${vectors[colorName].y}, ${vectors[colorName].z})`
  );

  pos.add(p5.Vector.random3D().mult(50));
  pos.x = constrain(pos.x, 0, 255);
  pos.y = constrain(pos.y, 0, 255);
  pos.z = constrain(pos.z, 0, 255);
  frameRate(1);
}

function findNearest(v) {
  let keys = Object.keys(vectors);
  keys.sort((a, b) => {
    return p5.Vector.dist(v, vectors[a]) - p5.Vector.dist(v, vectors[b]);
  });

  console.log(v);
  console.log(vectors[keys[0]]);

  return keys[0];
}
