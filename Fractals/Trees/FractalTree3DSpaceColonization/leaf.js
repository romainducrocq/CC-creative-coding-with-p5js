function Leaf() {
  this.pos = createVector(random(width), random(height), random(width));
  this.reached = false;

  this.show = function() {
    fill(255);
    noStroke();
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    ellipse(0, 0, 4, 4);
    pop();
  }
}
