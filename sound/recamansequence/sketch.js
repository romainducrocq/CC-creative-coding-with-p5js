let integers = [true];
let steps = 1;
let sequence = [];
let index = 0;

let arcs = [];

let biggest = 0;

let osc;

let attackLevel = 1.0;
let releaseLevel = 0;

let attackTime = 0.001;
let decayTime = 0.2;
let susPercent = 0.2;
let releaseTime = 0.5;


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(5);
  background(51);

  env = new p5.Env();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.amp(env);
  osc.start();

  integers[index] = true;
  sequence.push(index);

  gui();
}

function step() {
  let next = ((index-steps < 0 || integers[index-steps]) ? index+steps : index-steps);
  integers[next] = true;
  sequence.push(next);

  arcs.push(new Arc(index, next, steps%2));

  index = next;
  steps++;

  osc.freq(pianoKeyFreq(index%88));
  env.play();

  if(index > biggest) {
    biggest = index;
  }
}

function pianoKeyFreq(note) {
  return pow(2, ((note-49)/12))*440;
}

function draw() {
  step();

  background(51);
  translate(0, height / 2);
  scale(width/biggest);

  for(let a of arcs){
    a.show();
  }
}

function gui() {

  let formulaDiv = createDiv(
  "<strong>Recaman's sequence :</strong><br><br>" +
  "a(n) =<br>" +
  "&nbsp;&nbsp;&nbsp;&nbsp;{ 0 if n = 0<br>" +
  "&nbsp;&nbsp;&nbsp;&nbsp;{ a(n-1)-n if a(n-1)-n > 0 and is not already in the sequence<br>" +
  "&nbsp;&nbsp;&nbsp;&nbsp;{ a(n-1)+n otherwise<br>" +
  "<br>" +
  "Subtract if possible, else add :<br> " +
  "&nbsp;&nbsp;&nbsp;&nbsp;a(0) = 0<br>" +
  "&nbsp;&nbsp;&nbsp;&nbsp;a(1) = 1 [0+1=1 (0-1 would be negative)]<br>" +
  "&nbsp;&nbsp;&nbsp;&nbsp;a(2) = 3 [1+2=3 (1-2 would be negative)]<br>" +
  "&nbsp;&nbsp;&nbsp;&nbsp;a(3) = 6 [3+3=6 (3-3 is already in the sequence)]<br>" +
  "&nbsp;&nbsp;&nbsp;&nbsp;a(4) = 2 [6-4=2 (positive and not in the sequence)]<br>" +
  "&nbsp;&nbsp;&nbsp;&nbsp;a(5) = 7 [2+5=7 (2-5 would be negative)]<br>" +
  "&nbsp;&nbsp;&nbsp;&nbsp;etc..<br>" +
  "<br>" +
  "Index to piano key frequency (88 keys) :<br> " +
  "&nbsp;&nbsp;&nbsp;&nbsp; Freq = 2^((index%88-49)/12))*440 Hz<br>"
  );
  formulaDiv.position(10,height + 10);
  formulaDiv.style('font-size', '16px');
  formulaDiv.style('font-family','Ubuntu, sans-serif');
  formulaDiv.style('color',color(51));
}
