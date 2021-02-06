function setup() {
  createCanvas(400, 400);
    background(51);

    fill(255);
    textSize(32);
    textAlign(CENTER,CENTER);
    text("jtm mon bbz <3", width/2, height/8);

    noStroke();
    fill(255, 0, 100);
    translate(width/2, height/2);
    beginShape();
    for(let t = 0; t < TWO_PI; t+=0.01){
      let x = 16*sin(t)**3;
      let y = 13*cos(t) - 5*cos(2*t) - 2*cos(3*t) - cos(4*t);
      vertex(-x*10,-y*10);
    }
    endShape(CLOSE);
}

function draw() {
}
