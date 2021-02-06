function Block(x, w, velocity, mass, xmin) {
  this.x = x;
  this.y = height - w;
  this.w = w;
  this.velocity = velocity;
  this.mass = mass;
  this.xmin = xmin;
  this.c = color(floor(random(255)), floor(random(255)), floor(random(255)));

  this.collide = function(block) {
      return !(this.x + this.w < block.x || this.x > block.x + block.w);
  }

  this.bounce = function(block) {
    return ((this.velocity*(this.mass - block.mass) + block.velocity*2*block.mass) / (this.mass+block.mass));
  }

  this.hitWall = function() {
    return (this.x <= 0);
  }

  this.reverse = function() {
     this.velocity *= -1;
  }

  this.update = function() {
    this.x += this.velocity;
  }

  this.show = function() {
    fill(this.c);
    rect(constrain(this.x, this.xmin, width), this.y, this.w, this.w);
  }
}
