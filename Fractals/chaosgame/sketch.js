let seeds = [];

let current;
let previous;
let previous2 = false;

let n;
let percent;

let select = 0;

let shapes = [
  { name: "SERPINSKI TRIANGLE", n: 3, percent: 0.5, restriction: "None.",
  setOtherSeeds: function(){
  }, setPoints: function(next){
    current.x = lerp(current.x, next.x, percent);
    current.y = lerp(current.y, next.y, percent);
  }},
  { name: "SQUARE 1", n: 4, percent: 0.5, restriction: "The current vertex cannot be chosen in the next iteration.",
  setOtherSeeds: function(){
  }, setPoints: function(next){
    if(next !== previous){
      current.x = lerp(current.x, next.x, 0.5);
      current.y = lerp(current.y, next.y, 0.5);
    }
      previous = next;
  }},
  { name: "SQUARE 2", n: 4, percent: 0.5, restriction: "The current vertex cannot be one place away (anti-clockwise) from the previously chosen vertex.",
  setOtherSeeds: function(){
  }, setPoints: function(next){
    for(let i = 0; i < 4; i++){
      if(seeds[i] === next && seeds[(i+1)%4] === previous){
        return;
      }
    }
    current.x = lerp(current.x, next.x, 0.5);
    current.y = lerp(current.y, next.y, 0.5);

    previous = next;
  }},
  { name: "SQUARE 3", n: 4, percent: 0.5, restriction: "The currently chosen vertex cannot be 2 places away from the previously chosen vertex.",
  setOtherSeeds: function(){
  }, setPoints: function(next){
    for(let i = 0; i < 4; i++){
      if(seeds[i] === next && seeds[(i+2)%4] === previous){
        return;
      }
    }
    current.x = lerp(current.x, next.x, 0.5);
    current.y = lerp(current.y, next.y, 0.5);

    previous = next;
  }},
  { name: "SQUARE 4", n: 4, percent: 0.5, restriction: "The currently chosen vertex cannot neighbor the previously chosen vertex if the two previously chosen vertices are the same.",
  setOtherSeeds: function(){
  }, setPoints: function(next){
    for(let i = 0; i < 4; i++){
      if(((seeds[(i+1)%4] === previous && seeds[i] === next) || (seeds[(i+3)%4] === previous && seeds[i] === next))
      && previous === previous2){
        return;
      }
    }
    current.x = lerp(current.x, next.x, 0.5);
    current.y = lerp(current.y, next.y, 0.5);

    previous2 = previous;
    previous = next;
  }},
  { name: "PENTAGON 1", n: 5, percent: 0.5, restriction: "The currently chosen vertex cannot be the same as the previously chosen vertex.",
  setOtherSeeds: function(){
  }, setPoints: function(next){
    if(next !== previous){
      current.x = lerp(current.x, next.x, 0.5);
      current.y = lerp(current.y, next.y, 0.5);
    }
      previous = next;
  }},
  { name: "PENTAGON 2", n: 5, percent: 0.5, restriction: "The currently chosen vertex cannot neighbor the previously chosen vertex if the two previously chosen vertices are the same.",
  setOtherSeeds: function(){
  }, setPoints: function(next){
    for(let i = 0; i < 5; i++){
      if(((seeds[(i+1)%5] === previous && seeds[i] === next) || (seeds[(i+4)%5] === previous && seeds[i] === next))
      && previous === previous2){
        return;
      }
    }
    current.x = lerp(current.x, next.x, 0.5);
    current.y = lerp(current.y, next.y, 0.5);

    previous2 = previous;
    previous = next;
  }},
  { name: "VICSEK FRACTAL", n: 4, percent: 2/3, restriction: "The point can also jump towards the center of the square.",
  setOtherSeeds: function(){
    seeds.push(createVector(lerp(seeds[0].x, seeds[2].x, 0.5), lerp(seeds[0].y, seeds[2].y, 0.5)));
  },setPoints: function(next){
    current.x = lerp(current.x, next.x, percent);
    current.y = lerp(current.y, next.y, percent);
  }},
  { name: "SERPINSKI CARPET", n: 4, percent: 2/3, restriction: "The point can also jump towards the midpoints of the four sides.",
  setOtherSeeds: function(){
    for(let i = 0; i < 4; i++){
      seeds.push(createVector(lerp(seeds[i].x, seeds[(i+1)%4].x, 0.5), lerp(seeds[i].y, seeds[(i+1)%4].y, 0.5)));
    }
  },setPoints: function(next){
    current.x = lerp(current.x, next.x, percent);
    current.y = lerp(current.y, next.y, percent);
  }},
  { name: "PENTAGONAL N-FLAKE", n: 5, percent: 2/(1+Math.sqrt(5)), restriction: "None.",
  setOtherSeeds: function(){
  },setPoints: function(next){
    current.x = lerp(current.x, next.x, percent);
    current.y = lerp(current.y, next.y, percent);
  }},
];

let canvas;
let shapeSlider;
let shapeButton;
let shapeSelectDiv;
let shapeDescriptionDiv;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight - 100);
  canvas.position(0, 50);

  gui();

  reset();
}

function draw() {
  if(frameCount % 2400 === 0){
    reset();
  }

  for(let i = 0; i < 1000; i++){
    shapes[select].setPoints(random(seeds));
    point(current.x, current.y);
  }

  shapeSelectDiv.html(shapes[shapeSlider.value()-1].name);
}

function reset() {

  select = shapeSlider.value()-1;

  seeds = [];

  n = shapes[select].n;
  percent = shapes[select].percent;

  for(let i = 0; i < n; i++){
    seeds.push(p5.Vector.fromAngle(i*TWO_PI/n)
      .mult(width >= height ? height/2-10 : width/2-10)
      .add(width/2, height/2));
  }

  shapes[select].setOtherSeeds();

  current = createVector(random(width), random(height));

  background(51);
  stroke(220);
  strokeWeight(4);

  for(let s of seeds){
    point(s.x, s.y);
  }

  stroke(255, 0, 100, 100);
    strokeWeight(1);

    shapeDescriptionDiv.html("<strong>" + shapes[select].name + "</strong> -> " +
    "Seeds: " + seeds.length + ", " +
    "Jump: " + (floor(percent*1000))/1000 + ", " +
    "Restriction: " + shapes[select].restriction);
}

function gui(){
  let titleDiv = createDiv("The chaos game");
  titleDiv.position(10, 10);
  titleDiv.style('font-size', '24px');
  titleDiv.style('font-family','Ubuntu, sans-serif');
  titleDiv.style('color',color(51));

  shapeSelectDiv = createDiv(shapes[0].name);
  shapeSelectDiv.position(250,10);
  shapeSelectDiv.style('font-size', '16px');
  shapeSelectDiv.style('font-family','Ubuntu, sans-serif');
  shapeSelectDiv.style('color',color(51));

  shapeSlider = createSlider(1, shapes.length, 1, 1);
  shapeSlider.position(250, 25);

  shapeButton = createButton("SELECT");
  shapeButton.position(shapeSlider.x + shapeSlider.width + 10, 10);
  shapeButton.style('font-size', '16px');
  shapeButton.style('font-family','Ubuntu, sans-serif');
  shapeButton.style('color',color(51));
  shapeButton.mousePressed(reset);

  shapeDescriptionDiv = createDiv(shapes[0].name);
  shapeDescriptionDiv.position(10, canvas.y + height + 10);
  shapeDescriptionDiv.style('font-size', '14px');
  shapeDescriptionDiv.style('font-family','Ubuntu, sans-serif');
  shapeDescriptionDiv.style('color',color(51));
  shapeDescriptionDiv.size(width-10);
}
