function Leaf() {
  this.pos = createVector(floor(random(width)), floor(random(views[view].leafMinHeight)));
  this.reached = false;

  this.show = function() {
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 4, 4);
  }
}
