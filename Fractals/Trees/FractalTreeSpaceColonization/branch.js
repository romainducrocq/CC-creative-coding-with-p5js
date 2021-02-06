function Branch(parent, pos, dir) {
  this.parent = parent;
  this.pos = pos;
  this.dir = dir;
  this.origDir = this.dir.copy();
  this.count = 0;

  this.reset = function(){
    this.dir = this.origDir.copy();
    this.count = 0;
  }

  this.next = function(){
    let nextDir = p5.Vector.mult(this.dir, branchLen);
    //let nextDirRand = p5.Vector.add(nextDir, random(0.3));
    let nextPos = p5.Vector.add(this.pos, nextDir);//nextDirRand);
    let nextBranch = new Branch(this, nextPos, this.dir.copy());
    return nextBranch;
  }

  this.show = function(sw){
    if(parent !== null){
      strokeWeight(sw);
      stroke(255);
      line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
    }
  }
}
