//L-system 1
//   - variables: A, B
//   - axiom: A
//   - rules: (A -> AB), (B -> A)

// L-system 2
//   - variables: F+-[]
//   - axiom: F
//   - rules: (F -> FF+[+F-F-F]-[-F+F+F])

let select = 0;

let axioms = ["A", "F"];
let sentence = axioms[select];

let rules = [[{ a: "A", b: "AB"},{ a: "B", b: "A"}], [{ a: "F", b: "FF+[+F-F-F]-[-F+F+F]"}]];

let generation = 0;

let colors = ["255,0,100","51,51,51"];

let buttonChange;
let buttonGenerate;

function setup() {
  noCanvas();

  displaySetup();
}

function draw() {
}

function generate() {
  let nextSentence = "";
  for(let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for(let j = 0; j < rules[select].length; j++){
      if(current === rules[select][j].a){
        found = true;
        nextSentence += rules[select][j].b;
        break;
      }
    }
    if(!found){
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  generation++;
  createDiv(
    "<div style=\"font-family:Ubuntu, sans-serif; word-wrap:break-word; color:rgb(" + colors[1] + "); padding: 10px 20px 10px 20px;\">" +
      "<span style=\"color:rgb(" + colors[0] + ");\"> Generation " + generation + " :</span><br>" + sentence +
    "</div>"
  );
}

function displaySetup() {
  document.body.innerHTML = "";
  createDiv(
    "<div style=\"font-family:Ubuntu, sans-serif; font-size: 2em; color:rgb(" + colors[1] + "); padding: 10px 20px 10px 20px;\">" +
      "L-System" +
    "</div>"
  );

  createDiv(
    "<div style=\"font-family:Ubuntu, sans-serif; color:rgb(" + colors[1] + "); padding: 10px 20px 10px 20px;\">" +
      "<span style=\"display:inline-block; border:1px solid; color:rgb(" + colors[(select+0)%2] + "); padding: 10px 20px 10px 20px;\">" +
        "&nbsp;&nbsp;<strong>L-System 1 :</strong><br>&nbsp;&nbsp;&nbsp;&nbsp;- Variables: A, B<br>&nbsp;&nbsp;&nbsp;&nbsp;- Axiom: A<br>&nbsp;&nbsp;&nbsp;&nbsp;- Rules: (A -> AB), (B -> A)&nbsp;&nbsp;" +
      "</span>" +
      "<span style=\"display:inline-block; border:1px solid; color:rgb(" + colors[(select+1)%2] + "); padding: 10px 20px 10px 20px;\">" +
        "&nbsp;&nbsp;<strong>L-System 2 :</strong><br>&nbsp;&nbsp;&nbsp;&nbsp;- Variables: F, +, -, [, ]<br>&nbsp;&nbsp;&nbsp;&nbsp;- Axiom: F<br>&nbsp;&nbsp;&nbsp;&nbsp;- Rules: (F -> FF+[+F-F-F]-[-F+F+F])&nbsp;&nbsp;" +
      "</span>" +
    "</div>"
  );

  createDiv(
    "<div style=\"font-family:Ubuntu, sans-serif; word-wrap:break-word; color:rgb(" + colors[1] + "); padding: 10px 20px 10px 20px;\">" +
      "<span style=\"color:rgb(" + colors[0] + ");\"> Generation " + generation + " :</span><br>" + sentence +
    "</div>"
  );

  buttonGenerate = createButton("GENERATE");
  buttonGenerate.style('font-family','Ubuntu, sans-serif');
  buttonGenerate.style('color',color(eval(colors[1])));
  buttonGenerate.style('margin','10px 20px 10px 20px');
  buttonGenerate.mousePressed(generate);

  buttonChange = createButton("CHANGE");
  buttonChange.position(buttonGenerate.x + buttonGenerate.width, buttonGenerate.y);
  buttonChange.style('font-family','Ubuntu, sans-serif');
  buttonChange.style('color',color(eval(colors[1])));
  buttonChange.style('margin','10px 20px 10px 20px');
  buttonChange.mousePressed(newLSystem);
}

function newLSystem(){
    select = 1 - select;
    sentence = axioms[select];
    generation = 0;
    displaySetup();
}
