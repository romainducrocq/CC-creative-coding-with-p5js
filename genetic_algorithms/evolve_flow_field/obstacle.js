//class for an obstacle, simple rectangle that is drawn
//and can check if rocket touches it

//also using this class for target position

class Obstacle{
  constructor(x, y, w_, h_){
    this.position = createVector(x, y);
    this.w = w_;
    this.h = h_;
  }

  display(){
    stroke(0);
    fill(175);
    strokeWeight(2);
    rectMode(CORNER);
    rect(this.position.x, this.position.y, this.w, this.h);
  }

  getCenter(){
    return createVector(this.position.x + this.w / 2, this.position.y + this.h / 2);
  }

  contains(spot){
    if(spot.x > this.position.x && spot.x < this.position.x + this.w && spot.y > this.position.y && spot.y < this.position.y + this.h){
      return true;
    }else {
      return false;
    }
  }
}
