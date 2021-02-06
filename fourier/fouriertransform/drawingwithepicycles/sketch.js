//https://shinao.github.io/PathToPoints/
//https://twitter.com/3blue1brown/status/1143342271535837184

let drawing = [];

let coordx = [];
let coordy = [];
let dftX;
let dftY;

let time = 0;
let path = [];
let iteration = 0;

let canvas;

function setup() {
  canvas = createCanvas(800, 600);
  canvas.position(0, 50);

  setPi();

  gui();
}

function epicycles(x, y, rot, dftXY) {
  for(let X = 0; X < dftXY.length; X++){
     let prevx = x;
     let prevy = y;

     x += dftXY[X].ampl * cos(dftXY[X].freq * time + dftXY[X].phase + rot);
     y += dftXY[X].ampl * sin(dftXY[X].freq * time + dftXY[X].phase + rot);

     (X > 0 ? stroke(220, 100) : stroke(220));
     noFill();
     ellipse(prevx, prevy, dftXY[X].ampl*2);
     stroke(220);

     fill(220);
     line(prevx, prevy, x, y);
  }
  return createVector(x, y);
}

function draw() {
  if(iteration < coordx.length+1){
    background(51);

    let vx = epicycles(400, 50, 0, dftX);
    let vy = epicycles(50, 300, HALF_PI, dftY);
    let v = createVector(vx.x, vy.y);

    path.unshift(v);

    if(iteration < coordx.length){
      line(vx.x, vx.y, v.x, v.y);
      line(vy.x, vy.y, v.x, v.y);
    }
    beginShape();
    noFill();
    for(let i = 0; i < path.length; i++) {
      vertex(path[i].x, path[i].y);
    }
    endShape();

    const dt = TWO_PI / dftY.length;
    time -= dt;
    iteration++;
  }
}

function reset() {
  drawing = [];

  coordx = [];
  coordy = [];

  time = 0;
  path = [];
  iteration = 0;
}

function setPi() {
  reset();

  drawing = pi120coords
  for(let i = 0; i < drawing.length; i++) {
    coordx.push(-drawing[i].x/2);
    coordy.push(-drawing[i].y/2);
  }

  dftX = dft(coordx);
  dftY = dft(coordy);
}

function setFourier() {
  reset();

  drawing = fourier876coords;
  for(let i = 0; i < drawing.length; i+=2) {
    coordx.push(drawing[i].x/2.5-400);
    coordy.push(drawing[i].y/2.5-200);
  }

  dftX = dft(coordx);
  dftY = dft(coordy);
}

function setPokemon() {
  reset();

  drawing = pokemonlogo220coords;
  for(let i = 0; i < drawing.length; i++) {
    coordx.push(drawing[i].x*3-200);
    coordy.push(drawing[i].y*3-200);
  }

  dftX = dft(coordx);
  dftY = dft(coordy);
}

function setPokeball() {
  reset();

  drawing = pokeball245coords;
  for(let i = 0; i < drawing.length; i++) {
    coordx.push(drawing[i].x*2);
    coordy.push(drawing[i].y*2-100);
  }

  dftX = dft(coordx);
  dftY = dft(coordy);
}

function setPig() {
  reset();

  drawing = pig190coords;
  for(let i = 0; i < drawing.length; i++) {
    coordx.push(drawing[i].x*2-100);
    coordy.push(drawing[i].y*2-100);
  }

  dftX = dft(coordx);
  dftY = dft(coordy);
}

function setDragon() {
  reset();

  drawing = dragon569coords;
  for(let i = 0; i < drawing.length; i++) {
    coordx.push(drawing[i].x/1.5-220);
    coordy.push(drawing[i].y/1.5-100);
  }

  dftX = dft(coordx);
  dftY = dft(coordy);
}

function setHeart() {
  reset();

  for(let t = 0; t < TWO_PI; t+=0.05){
    let heartx = 16*sin(t)**3;
    let hearty = 13*cos(t) - 5*cos(2*t) - 2*cos(3*t) - cos(4*t);
    coordx.push(-heartx*10);
    coordy.push(-hearty*10);
  }

  dftX = dft(coordx);
  dftY = dft(coordy);
}

function setWorld() {
  reset();

  drawing = world316coords;
  for(let i = 0; i < drawing.length; i++) {
    coordx.push(drawing[i].x/5-350);
    coordy.push(-drawing[i].y/5+250);
  }

  dftX = dft(coordx);
  dftY = dft(coordy);
}

function gui(){
  let titleDiv = createDiv("Drawing with fourier transform and epicycles");
  titleDiv.position(10, 10);
  titleDiv.style('font-size', '24px');
  titleDiv.style('font-family','Ubuntu, sans-serif');
  titleDiv.style('color',color(51));

  let formulaDiv = createDiv(
  "<strong>D</strong>iscrete <strong>F</strong>ourier <strong>T</strong>ransform :<br>" +
  nbsp(8) + "<strong>Xk</strong> = SUM{n=0:N-1} xn*(cos(2*PI*k*n/N)-i*sin(2*PI*k*n/N))<br>" +
  nbsp(8) + "<strong>Freq</strong> = k, <strong>Ampl</strong> = sqrt(re²+im²), <strong>Phase</strong> = atan2(im, re)<br>" +
  nbsp(8) + "<strong>DFT</strong> = [X0, X1, ..., Xn, ..., XN-1]<br><br>" +
  "<strong>Point</strong> n+1 coordinates for iteration t :<br>" +
  nbsp(8) + "<strong>x(n+1)</strong> = x(n)+Ampl(DFT(x)[Xn])*cos(Freq(DFT(x)[Xn])*(-t*2*PI/N)+Phase(DFT(x)[Xn]))<br>" +
  nbsp(8) + "<strong>y(n+1)</strong> = y(n)+Ampl(DFT(y)[Xn])*sin(Freq(DFT(y)[Xn])*(-t*2*PI/N)+Phase(DFT(y)[Xn])+PI/2)"
  );
  formulaDiv.position(10, canvas.height + canvas.y + 10);
  formulaDiv.style('font-size', '16px');
  formulaDiv.style('font-family','Ubuntu, sans-serif');
  formulaDiv.style('color',color(51));
  formulaDiv.size(width);

  let piButton = createButton("Pi");
  piButton.position(width + 10, canvas.y);
  piButton.style('font-size', '16px');
  piButton.style('font-family','Ubuntu, sans-serif');
  piButton.style('color',color(51));
  piButton.size(100);
  piButton.mousePressed(setPi);

  let pigButton = createButton("Pig");
  pigButton.position(width + 10, piButton.y + piButton.height + 10);
  pigButton.style('font-size', '16px');
  pigButton.style('font-family','Ubuntu, sans-serif');
  pigButton.style('color',color(51));
  pigButton.size(100);
  pigButton.mousePressed(setPig);

  let heartButton = createButton("Heart");
  heartButton.position(width + 10, pigButton.y + pigButton.height + 10);
  heartButton.style('font-size', '16px');
  heartButton.style('font-family','Ubuntu, sans-serif');
  heartButton.style('color',color(51));
  heartButton.size(100);
  heartButton.mousePressed(setHeart);

  let worldButton = createButton("World");
  worldButton.position(width + 10, heartButton.y + heartButton.height + 10);
  worldButton.style('font-size', '16px');
  worldButton.style('font-family','Ubuntu, sans-serif');
  worldButton.style('color',color(51));
  worldButton.size(100);
  worldButton.mousePressed(setWorld);

  let pokeballButton = createButton("Pokeball");
  pokeballButton.position(width + 10, worldButton.y + worldButton.height + 10);
  pokeballButton.style('font-size', '16px');
  pokeballButton.style('font-family','Ubuntu, sans-serif');
  pokeballButton.style('color',color(51));
  pokeballButton.size(100);
  pokeballButton.mousePressed(setPokeball);

  let pokemonButton = createButton("Pokemon");
  pokemonButton.position(width + 10, pokeballButton.y + pokeballButton.height + 10);
  pokemonButton.style('font-size', '16px');
  pokemonButton.style('font-family','Ubuntu, sans-serif');
  pokemonButton.style('color',color(51));
  pokemonButton.size(100);
  pokemonButton.mousePressed(setPokemon);

  let dragonButton = createButton("Dragon");
  dragonButton.position(width + 10, pokemonButton.y + pokemonButton.height + 10);
  dragonButton.style('font-size', '16px');
  dragonButton.style('font-family','Ubuntu, sans-serif');
  dragonButton.style('color',color(51));
  dragonButton.size(100);
  dragonButton.mousePressed(setDragon);

  let fourierButton = createButton("Fourier");
  fourierButton.position(width + 10, dragonButton.y + dragonButton.height + 10);
  fourierButton.style('font-size', '16px');
  fourierButton.style('font-family','Ubuntu, sans-serif');
  fourierButton.style('color',color(51));
  fourierButton.size(100);
  fourierButton.mousePressed(setFourier);

  let divLink1 = createDiv("<a target='_blank' rel='noopener noreferrer' href='https://shinao.github.io/PathToPoints/'>svg 2 coords</a>"
  );
  divLink1.position(width + 10, fourierButton.y + fourierButton.height + 10);
  divLink1.style('font-size', '16px');
  divLink1.style('font-family','Ubuntu, sans-serif');
  divLink1.style('color',color(51));

  let divLink2 = createDiv("<a target='_blank' rel='noopener noreferrer' href='coords'>coords 2 js</a>"
  );
  divLink2.position(width + 10, fourierButton.y + fourierButton.height + 40);
  divLink2.style('font-size', '16px');
  divLink2.style('font-family','Ubuntu, sans-serif');
  divLink2.style('color',color(51));
}

function nbsp(n){
  let nbsp = "";
  for(let i = 0; i < n; i++){
    nbsp += "&nbsp;";
  }
  return nbsp;
}
