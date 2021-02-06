function Arc(start, end, dir) {
  this.start = start;
  this.end = end;
  this.dir = dir;

  this.show = function() {
    let diameter = abs(this.end - this.start);
    let x = (this.end + this.start) / 2;

    stroke(220);
    strokeWeight(0.5);
    noFill();
    arc(x, 0, diameter, diameter, (1-this.dir)*PI, this.dir*PI);
  }
}
