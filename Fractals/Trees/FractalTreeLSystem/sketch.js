// variables: F+-[]
// axiom: F
// rules: (F -> FF+[+F-F-F]-[-F+F+F])

let axiom = "F";
let sentence = axiom;

let rules = [];

rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
}

let generation = 0;

let angle;
let len = 100;

let buttonGenerate;

function generate() {
  len *= 0.5;
  let nextSentence = "";
  for(let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for(let j = 0; j < rules.length; j++){
      if(current === rules[j].a){
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if(!found){
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  generation++;
  createP(sentence);
  turtle();
}

function turtle() {
  background(51);
  resetMatrix();
  translate(width/2, height);
  for(let i = 0; i < sentence.length; i++){
    switch (sentence.charAt(i)) {
      case "F":
        line(0, 0, 0, -len);
        translate(0, -len);
        break;
      case "+":
        rotate(angle);
        break;
      case "-":
        rotate(-angle);
        break;
      case "[":
        push();
        break;
      case "]":
        pop();
        break;
      default:
        break;
    }
  }
}

function setup() {
  createCanvas(400, 400);
  background(51);
  stroke(255, 100);
  angle = radians(25);
  createP(axiom);
  turtle();
  let buttonGenerate = createButton("GENERATE");
  buttonGenerate.mousePressed(generate);
}

function draw() {
}
