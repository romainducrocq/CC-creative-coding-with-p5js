function Node(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.cameFrom = undefined;
  this.obstacle = (random(1) < obstacles);

  this.show = function(col) {
    (this.obstacle ? fill(51) : (col ? fill(col) : noFill()));
    (col ? stroke(51) : noStroke());
    rect(this.i*resolution, this.j*resolution, resolution, resolution, 10*this.obstacle);
  }

  this.addNeighbors = function() {
    if(this.i < cols - 1){
      this.neighbors.push({neighbor: grid[this.i+1][this.j], dist: 1});
    }
    if(this.i > 0){
      this.neighbors.push({neighbor: grid[this.i-1][this.j], dist: 1});
    }
    if(this.j < rows - 1){
      this.neighbors.push({neighbor: grid[this.i][this.j+1], dist: 1});
    }
    if(this.j > 0){
      this.neighbors.push({neighbor: grid[this.i][this.j-1], dist: 1});
    }
    if(diagonal){
      if(this.i > 0 && this.j > 0){
        this.neighbors.push({neighbor: grid[this.i-1][this.j-1], dist: sqrt(2)});
      }
      if(this.i > 0 && this.j < rows - 1){
        this.neighbors.push({neighbor: grid[this.i-1][this.j+1], dist: sqrt(2)});
      }
      if(this.i < cols - 1 && this.j > 0){
        this.neighbors.push({neighbor: grid[this.i+1][this.j-1], dist: sqrt(2)});
      }
      if(this.i < cols - 1 && this.j < rows - 1){
        this.neighbors.push({neighbor: grid[this.i+1][this.j+1], dist: sqrt(2)});
      }
    }
  }
}
