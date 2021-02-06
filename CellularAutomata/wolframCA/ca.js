function CA(ruleset, w, res) {
  this.ruleset = ruleset;
  this.w = w;
  this.res = res;
  this.cells = new Array(this.w);
  this.generation = 0;

  for(let i = 0; i < this.cells.length; i++){
    this.cells[i] = 0;
  }
  this.cells[floor(this.cells.length/2)] = 1;

  this.generate = function() {
    let nextgen = new Array(this.cells.length);
    for(let i = 1; i < this.cells.length-1; i++){
      let left = 1-this.cells[i-1];
      let center = 1-this.cells[i];
      let right = 1-this.cells[i+1];
      nextgen[i] = this.rules(left,center,right);
    }
    nextgen[0] = 0;
    nextgen[this.cells.length-1] = 0;
    this.cells = nextgen;
    this.generation++;
  }

  this.rules = function(a, b, c) {
    return ruleset[7 - (a*4 + b*2 + c*1)];
  }

  this.display = function() {
    for(let i = 0; i < this.cells.length; i++) {
      fill(220*(1-this.cells[i]));
      rect(i*this.res, this.generation*this.res, this.res, this.res);
    }
  }
}
