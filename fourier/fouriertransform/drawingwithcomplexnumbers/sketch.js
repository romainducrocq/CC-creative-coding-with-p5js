//https://shinao.github.io/PathToPoints/
//https://twitter.com/3blue1brown/status/1143342271535837184

let drawing = [];

let coordi = [];
let dftI;

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

function epicycles(re, im, rot, dftIY) {
  for(let X = 0; X < dftIY.length; X++){
     let prevre = re;
     let previm = im;

     re += dftIY[X].ampl * cos(dftIY[X].freq * time + dftIY[X].phase + rot);
     im += dftIY[X].ampl * sin(dftIY[X].freq * time + dftIY[X].phase + rot);

     if(iteration < coordi.length){
       (X > 0 ? stroke(220, 100) : stroke(220));
       noFill();
       ellipse(prevre, previm, dftIY[X].ampl*2);
       stroke(220);

       fill(220);
       line(prevre, previm, re, im);
     }
  }
  return createVector(re, im);
}

function draw() {
  if(iteration < coordi.length+1){
    background(51);

    let vi = epicycles(width/2, height/2, 0, dftI);
    path.unshift(vi);

    beginShape();
    noFill();
    for(let i = 0; i < path.length; i++) {
      vertex(path[i].x, path[i].y);
    }
    endShape();

    const dt = TWO_PI / dftI.length;
    time -= dt;
    iteration++;
  }
}

function reset() {
  drawing = [];

  coordi = [];

  time = 0;
  path = [];
  iteration = 0;
}

function setPi() {
  reset();

  drawing = pi120coords
  for(let i = 0; i < drawing.length; i++) {
    const c = new Complex(-drawing[i].x/2, -drawing[i].y/2)
    coordi.push(c);
  }

  dftI = dft(coordi);
}

function setFourier() {
  reset();

  drawing = fourier876coords;
  for(let i = 0; i < drawing.length; i+=2) {
    const c = new Complex(drawing[i].x/2.5-400, drawing[i].y/2.5-200);
    coordi.push(c);
  }

  dftI = dft(coordi);
}

function setPokemon() {
  reset();

  drawing = pokemonlogo220coords;
  for(let i = 0; i < drawing.length; i++) {
    const c = new Complex(drawing[i].x*3-200, drawing[i].y*3-200);
    coordi.push(c);
  }

  dftI = dft(coordi);
}

function setPokeball() {
  reset();

  drawing = pokeball245coords;
  for(let i = 0; i < drawing.length; i++) {
    const c = new Complex(drawing[i].x*2, drawing[i].y*2-100);
    coordi.push(c);
  }

  dftI = dft(coordi);
}

function setPig() {
  reset();

  drawing = pig190coords;
  for(let i = 0; i < drawing.length; i++) {
    const c = new Complex(drawing[i].x*2-100, drawing[i].y*2-100);
    coordi.push(c);
  }

  dftI = dft(coordi);
}

function setDragon() {
  reset();

  drawing = dragon569coords;
  for(let i = 0; i < drawing.length; i++) {
    const c = new Complex(drawing[i].x/1.5-220, drawing[i].y/1.5-100);
    coordi.push(c);
  }

  dftI = dft(coordi);
}

function setHeart() {
  reset();

  for(let t = 0; t < TWO_PI; t+=0.05){
    let heartre = 16*sin(t)**3;
    let heartim = 13*cos(t) - 5*cos(2*t) - 2*cos(3*t) - cos(4*t);
    const c = new Complex(-heartre*10, -heartim*10);
    coordi.push(c);
  }

  dftI = dft(coordi);
}

function setWorld() {
  reset();

  drawing = world316coords;
  for(let i = 0; i < drawing.length; i++) {
    const c = new Complex(drawing[i].x/5-350, -drawing[i].y/5+250);
    coordi.push(c);
  }

  dftI = dft(coordi);
}

function gui(){
  let titleDiv = createDiv("Drawing with fourier transform and epicycles : complex numbers version");
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
  nbsp(8) + "<strong>x(n+1)</strong> = x(n)+Ampl(DFT[Xn])*cos(Freq(DFT[Xn])*(-t*2*PI/N)+Phase(DFT[Xn]))<br>" +
  nbsp(8) + "<strong>y(n+1)</strong> = y(n)+Ampl(DFT[Xn])*sin(Freq(DFT[Xn])*(-t*2*PI/N)+Phase(DFT[Xn]))"
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
