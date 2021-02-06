function Branch(begin, end){
  this.begin = begin;
  this.end = end;
  this.finished = false;

  this.jitter = function() {
    this.end.x += random(-1,1);
    this.end.y += random(-1,1);
  }

  this.show = function() {
    stroke(255);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);

  }

  this.branch = function(angle) {
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(angle);
    dir.mult(2/3);
    var newEnd = p5.Vector.add(this.end, dir);
    var branch = new Branch(this.end, newEnd);
    return branch;
  }
}
