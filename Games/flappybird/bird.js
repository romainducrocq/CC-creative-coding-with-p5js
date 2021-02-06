function Bird() {
  this.y = height/2;
  this.x = 64;
  this.radius = 16;

  this.gravity = 1;
  this.lift = -25;
  this.velocity = 0;

  this.show = function() {
    fill("#FDFD96");
    ellipse(this.x, this.y, this.radius*2);
  }

  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if(this.y > height - this.radius){
      this.y = height - this.radius;
      this.velocity = 0;
    }else if(this.y < this.radius){
          this.y = this.radius;
          this.velocity = 0;
    }
  }

  this.up = function() {
    this.velocity += this.lift;
  }
}
