function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;

  this.checkNeighbors = function() {
    let neighbors = [];

    if(j > 0 && !cells[index(this.i, this.j-1)].visited){ //top
      neighbors.push(cells[index(this.i, this.j-1)]);
    }
    if(i < cols-1  && !cells[index(this.i+1, this.j)].visited){ //right
      neighbors.push(cells[index(this.i+1, this.j)]);
    }
    if(j < rows-1 && !cells[index(this.i, this.j+1)].visited){ //bottom
      neighbors.push(cells[index(this.i, this.j+1)]);
    }
    if(i > 0 && !cells[index(this.i-1, this.j)].visited){ //left
      neighbors.push(cells[index(this.i-1, this.j)]);
    }

    if(neighbors.length > 0){
      return neighbors[floor(random(neighbors.length))];
    }else{
      return undefined;
    }
  }

  this.highlight = function() {
    noStroke();
    fill(colorCurrent);
    rect(this.i*resolution, this.j*resolution, resolution, resolution);
  }

  this.show = function() {
    strokeWeight(2);
    stroke(220);
    if(this.walls[0]){
      line(this.i*resolution, this.j*resolution, (this.i+1)*resolution, this.j*resolution);
    }
    if(this.walls[1]){
      line((this.i+1)*resolution, this.j*resolution, (this.i+1)*resolution, (this.j+1)*resolution);
    }
    if(this.walls[2]){
      line(this.i*resolution, (this.j+1)*resolution, (this.i+1)*resolution, (this.j+1)*resolution);
    }
    if(this.walls[3]){
      line(this.i*resolution, this.j*resolution, this.i*resolution, (this.j+1)*resolution);
    }

    if(this.visited){
      noStroke();
      fill(colorPath);
      rect(this.i*resolution, this.j*resolution, resolution, resolution);
    }
  }
}
