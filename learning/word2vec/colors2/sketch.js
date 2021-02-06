let data;
let vectors;
let rainbow;
let lines;
let spanIds = [];

let rSlider, gSlider, bSlider;

function preload() {
  data = loadJSON("xkcd.json");
  lines = loadStrings("rainbow.txt")
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
  createCanvas(50, 50);
  rSlider = createSlider(-100, 100, 0);
  gSlider = createSlider(-100, 100, 0);
  bSlider = createSlider(-100, 100, 0);
  rSlider.input(sliderChanged);
  gSlider.input(sliderChanged);
  bSlider.input(sliderChanged);

  vectors = processData(data);
  //console.log(vectors);
  rainbow = join(lines, " ");
  let words = rainbow.split(/\W+/);
  spanStr = "";
  let spanId = 0;
  let keys = [];
  for(let word of words){
    if(vectors[word]){
      keys.push(word);
      word = '<span id="' + spanId + '" style="background-color: rgb(' + vectors[word].x + ', ' + vectors[word].y + ', ' + vectors[word].z +')">' + word + "</span>";
      spanIds.push(spanId);
      spanId++;
    }
    spanStr += word + " ";
  }
  createSpan(spanStr);
  //console.log(spanIds);
  //console.log(keys);

  let avg = createVector(0, 0, 0);
  for(let key of keys){
    avg.add(vectors[key]);
  }
  avg.div(keys.length);
  let nearest = findNearest(avg);
  //console.log(nearest);

  background(avg.x, avg.y, avg.z);

}

function sliderChanged(){
  let r = rSlider.value();
  let g = gSlider.value();
  let b = bSlider.value();
  //console.log(r, g, b);

  for(let id of spanIds){
    let v = vectors[document.getElementById(id).innerHTML].copy();
    v.add(r, g, b);
    document.getElementById(id).innerHTML = findNearest(v);
    document.getElementById(id).style.backgroundColor = "rgb(" + v.x + ", " + v.y + ", " + v.z + ")";
  }
}

function findNearest(v) {
  let keys = Object.keys(vectors);
  keys.sort((a, b) => {
    return p5.Vector.dist(v, vectors[a]) - p5.Vector.dist(v, vectors[b]);
  });

  //console.log(v);
  //console.log(vectors[keys[0]]);

  return keys[0];
}
