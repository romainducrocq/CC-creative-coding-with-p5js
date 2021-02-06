let canvas;

let pi = 0;
let iterations = 0;

let history = [];
let minHistory;
let maxHistory;
let p = 1;

let piDiv;
let titleDiv;
let precisionDiv;
let minDIv;
let legDiv;
let maxDiv;

let res = "";

function setup() {
  canvas = createCanvas(600, 300);
  canvas.position(300, 50);

  minHistory = PI - 1;
  maxHistory = PI + 1;

  titleDiv = createDiv("PI approximation with Leibniz Series : 1 - 1/3 + 1/5 - 1/7 + 1/9 - ... = PI/4");
  titleDiv.position(10,10);
  titleDiv.style('font-size', '24px');
  titleDiv.style('font-family','Ubuntu, sans-serif');
  titleDiv.style('color',color(51));

  piDiv = createDiv(res);
  piDiv.position(10, 50);
  piDiv.style('font-size', '16px');
  piDiv.style('font-family','Ubuntu, sans-serif');
  piDiv.style('color',color(51));

  precisionDiv = createDiv("Precision = 1 digit : <span style='color:rgb(255,0,100);'>3</span>.141592653589793");
  precisionDiv.position(300, height + canvas.y + 10);
  precisionDiv.style('font-size', '16px');
  precisionDiv.style('font-family','Ubuntu, sans-serif');
  precisionDiv.style('color',color(51));

  maxDiv = createDiv("");
  maxDiv.position(width + canvas.x + 10, canvas.y);
  maxDiv.style('font-size', '16px');
  maxDiv.style('font-family','Ubuntu, sans-serif');
  maxDiv.style('color',color(225,0,100));

  legDiv = createDiv("PI");
  legDiv.position(width + canvas.x + 10, (height + canvas.y)/2 + 15);
  legDiv.style('font-size', '16px');
  legDiv.style('font-family','Ubuntu, sans-serif');
  legDiv.style('color',color(225,0,100));

  minDIv = createDiv("");
  minDIv.position(width + canvas.x +10, height + canvas.y - 20);
  minDIv.style('font-size', '16px');
  minDIv.style('font-family','Ubuntu, sans-serif');
  minDIv.style('color',color(255,0,100));
}

function draw() {
  background(51);
  pi += (1-2*(iterations%2)) * (1/(iterations*2+1));
  iterations++;

  history.push(pi*4);
  let spacing = width / history.length;
  stroke(255);
  noFill();
  beginShape();
  for(let i = 0; i < history.length; i++){
    let x = i * spacing;
    let y = map(history[i], minHistory, maxHistory, 0, height)
    vertex(x, y);
  }
  endShape();

  let piY = map(PI, minHistory, maxHistory, 0, height);
  stroke(255,0,100);
  line(0, piY, width, piY);

  maxDiv.html(("" + maxHistory).substring(0,p+1));
  minDIv.html(("" + minHistory).substring(0,p+1));

  if(iterations === 1 ||
    iterations === 2 ||
    iterations === 5 ||
    iterations === 10){
    res += "PI approximation with " + iterations + " iterations :<br>" + pi*4 + "<br><br>";
    piDiv.html(res);
    }else if(iterations%100 === 0){
    piDiv.html(res + "PI approximation with " + iterations + " iterations :<br>" + pi*4 + "<br><br>");

    if(iterations === 100){
      minHistory = PI - 0.1;
      maxHistory = PI + 0.1;
      precisionDiv.html("Precision = 2 digits : <span style='color:rgb(255,0,100);'>3.1</span>41592653589793");
      p++;
    }else if(iterations === 700){
      minHistory = PI - 0.01;
      maxHistory = PI + 0.01;
      precisionDiv.html("Precision = 3 digits : <span style='color:rgb(255,0,100);'>3.14</span>1592653589793");
      p++;
    }else if(iterations === 1700){
      minHistory = PI - 0.001;
      maxHistory = PI + 0.001;
      precisionDiv.html("Precision = 4 digits : <span style='color:rgb(255,0,100);'>3.141</span>592653589793");
      p++;
    }else if(iterations === 10800){
      minHistory = PI - 0.0001;
      maxHistory = PI + 0.0001;
      precisionDiv.html("Precision = 5 digits : <span style='color:rgb(255,0,100);'>3.1415</span>92653589793");
      p++;
    }
  }
}
