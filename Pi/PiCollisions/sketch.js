let canvas;

let blockImg;
let block1;
let block2;
let count = 0;
let m1 = 1;
let v1 = 0;
let v2 = 1;
let piDigits = 3;
const timeSteps = 1000;

let titleDiv;
let countDiv;
let formulaDiv;
let digitDiv;

let digitSlider;

let newButton;
let pauseButton;

let pause = false;

function setup() {
  canvas = createCanvas(windowWidth, 200);
  canvas.position(0, 50);
  block1 = new Block(100, 20, v1, m1, 0);
  block2 = new Block(300, 100, -v2/timeSteps, pow(m1*100, piDigits-1), 20);

  titleDiv = createDiv("3.14159 with collisions");
  titleDiv.position(10,10);
  titleDiv.style('font-size', '24px');
  titleDiv.style('font-family','Ubuntu, sans-serif');
  titleDiv.style('color',color(51));

  countDiv = createDiv("Collisions: <span style = 'color:rgb(255,0,100);'>" + count + "</span>");
  countDiv.position(10, height + canvas.y + 10);
  countDiv.style('font-size', '24px');
  countDiv.style('font-family','Ubuntu, sans-serif');
  countDiv.style('color',color(51));

  formulaDiv = createDiv("Mass: m1 = m2*100^(pi digits-1)<br>" +
  "Velocity: v'1 = v1*(m1-m2)/(m1+m2) + v2*(2*m2)/(m1+m2)");
  formulaDiv.position(10, height + canvas.y + 40);
  formulaDiv.style('font-size', '16px');
  formulaDiv.style('font-family','Ubuntu, sans-serif');
  formulaDiv.style('color',color(51));

  digitDiv = createDiv("Pi digits: " + piDigits);
  digitDiv.position(10, height + canvas.y + 100);
  digitDiv.style('font-size', '16px');
  digitDiv.style('font-family','Ubuntu, sans-serif');
  digitDiv.style('color',color(51));

  digitSlider = createSlider(1, 6, piDigits, 1);
  digitSlider.position(10, height + canvas.y + 115);

  newButton = createButton("NEW");
  newButton.position(digitSlider.width + digitSlider.x + 10, digitSlider.y);
  newButton.mousePressed(newCollisions);

  pauseButton = createButton("PAUSE");
  pauseButton.position(newButton.width + newButton.x + 10, newButton.y);
  pauseButton.mousePressed(pauseCollisions);
}

function draw() {
    if(!pause){
      background(220);
      for(i = 0; i < timeSteps; i++){
        if(block1.collide(block2)){
          const v1 = block1.bounce(block2);
          const v2 = block2.bounce(block1);
          block1.velocity = v1;
          block2.velocity = v2;
          count++;
          countDiv.html("Collisions: <span style = 'color:rgb(255,0,100);'>" + count + "</span>");
        }
        if(block1.hitWall()){
          block1.reverse();
          count++;
          countDiv.html("Collisions: <span style = 'color:rgb(255,0,100);'>" + count + "</span>");
        }
        block1.update();
        block2.update();
      }
      block1.show();
      block2.show();
    }
    digitDiv.html("Pi digits: " + digitSlider.value());
}

function newCollisions() {
  piDigits = digitSlider.value();
  block1 = new Block(100, 20, v1, m1, 0);
  block2 = new Block(300, 100, -v2/timeSteps, pow(m1*100, piDigits-1), 20);
  count = 0;
  countDiv.html("Collisions: <span style = 'color:rgb(255,0,100);'>" + count + "</span>");
  pause = false;
  pauseButton.style('color',color(51));
}

function pauseCollisions() {
  pause = !pause;
  if(pause){
    pauseButton.style('color',color(255, 0, 100));
  }else{
    pauseButton.style('color',color(51));
  }
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
