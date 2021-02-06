function Pipe(speed,space){
  this.space = space;
  this.top = random(height - this.space);
  this.bottom = height - this.space - this.top;
  this.x = width;
  this.w = 20;
  this.speed = speed;
  this.c = color(floor(random(255)), floor(random(255)), floor(random(255)))

  this.ispassed = false;

  this.hits = function(bird) {
    let xcircle;
    let ycircle;

    for(let i = 0; i < 2*PI; i += 36*PI/180)
    {
      xcircle = bird.x + cos(i)*bird.radius;
      ycircle = bird.y + sin(i)*bird.radius;

      if((ycircle < this.top || ycircle > height - this.bottom)
        && (xcircle > this.x && xcircle < this.x + this.w)){
          return true;
        }
    }
    return false;
  }


  this.show = function() {
    fill(this.c);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height-this.bottom, this.w, this.bottom);
  }

  this.update = function() {
    this.x -=  this.speed;
  }

  this.offscreen = function(){
    return this.x < -this.w;
  }

  this.passed = function(bird){
    if(this.x < bird.x - bird.radius - this.w - 1 && !this.ispassed){
      return this.ispassed = true;
    }
    return false;
  }
}
