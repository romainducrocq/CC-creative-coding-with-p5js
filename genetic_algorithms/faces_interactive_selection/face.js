//class for faces, contains dna sequence, fitness value, position on screen

//fitness function f(t) = t, with t = time mouse rolls over face*

//create a new face
class Face{
  constructor(dna_, x_, y_){
    this.rolloverOn = false; //Are we rolling over this face?
    this.dna = dna_; //face's dna
    this.x = x_; //position on screen
    this.y = y_;
    this.wh = 70; //size of square enclosing face
    this.fitness = 1; //how good is this face ?
    //java.awt.Rectangle
    this.r = new Rectangle(
      this.x - this.wh / 2,
      this.y - this.wh / 2,
      this.wh,
      this.wh
    )
  }

  //display the face
  display() {
    //using the face's dna to pick properties for this face
    //such as: head size, color, eye position, etc.
    //now, since every gene is a floating point between 0 and 1, we map the values
    let genes = this.dna.genes;
    let r = map(genes[0], 0, 1, 0, 70);
    let c = color(genes[1], genes[2], genes[3]);
    let eye_y = map(genes[4], 0, 1, 0, 5);
    let eye_x = map(genes[5], 0, 1, 0, 10);
    let eye_size = map(genes[5], 0, 1, 0, 10);
    let eye_color = color(genes[4], genes[5], genes[6]);
    let mouth_color = color(genes[7], genes[8], genes[9]);
    let mouth_y = map(genes[5], 0, 1, 0, 25);
    let mouth_x = map(genes[5], 0, 1, -25, 25);
    let mouth_wh = map(genes[5], 0, 1, 0, 50);
    let mouth_hh = map(genes[5], 0, 1, 0, 10);

    //use variables to draw rects, ellipses, etc
    push();
    translate(this.x, this.y);
    noStroke();

    //draw the head
    fill(c);
    ellipseMode(CENTER);
    ellipse(0, 0, r, r);

    //draw the eyes
    fill(eye_color);
    rectMode(CENTER);
    rect(-eye_x, -eye_y, eye_size, eye_size);
    rect(eye_x, -eye_y, eye_size, eye_size);

    //draw the mouth
    fill(mouth_color);
    rectMode(CENTER);
    rect(mouth_x, mouth_y, mouth_wh, mouth_hh);

    //draw the bounding box
    stroke(0.25);
    if(this.rolloverOn){
      fill(0, 0.25);
    }else {
      noFill();
    }
    rectMode(CENTER);
    rect(0, 0, this.wh, this.wh);
    pop();

    //display fitness value
    textAlign(CENTER);
    if(this.rolloverOn){
      fill(0);
    }else {
      fill(0.25);
    }
    text('' + floor(this.fitness), this.x, this.y + 55);

  }

  getFitness(){
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

  //increment fitness if mouse is rolling over face
  rollover(mx, my){
    if(this.r.contains(mx, my)){
      this.rolloverOn = true;
      this.fitness += 0.25;
    }else {
      this.rolloverOn = false;
    }
  }

}
