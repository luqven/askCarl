// squash animation
class Squash {
  constructor(props) {
    this.token     = props.token;
    this.topWall   = props.token.walls[0];
    this.botWall   = props.token.walls[1];
    this.leftWAll  = props.token.walls[2];
    this.rightWall = props.token.walls[3];
    
    this.pos          = this.token.getPosition();   // [xPos, yPos]
    this.dimensions   = this.token.getDimensions(); // [w, h] 
    this.speed        = 1;   // initial speed
    this.acceleration = 20;  // initial accel
    this.threshhold   = .05; //  stop animationwhen speed reaches this
    this.hitCount     = 1;   // start with 0 bounces

    this.bounce        = this.bounce.bind(this)
    this.increaseAccel = this.increaseAccel.bind(this);
    this.hitWall       = this.hitWall.bind(this)
  }

  hitWall(){
    const yPos = this.pos[1]
    if (yPos + 50 >= this.botWall) {
      return true;
    } else if (yPos <= this.topWall) {
      return true;
    }
    return false;
  }

  increaseAccel() {
    this.acceleration = this.acceleration * 1.2;
    const newY = this.pos[1] + this.acceleration
    if ( newY > this.botWall) {
      this.acceleration = newY - this.botWall;
    } else if (newY < this.topWall) {
      this.acceleration = this.topWall - newY;
    }
  }

  bounce() {
    // check if hit wall
    let wallHit = this.hitWall();
    if (wallHit) {
      console.log('WALL HIT')
      // increment hitCount
      this.hitCount += 1;
      // set yDelta direction
      this.speed = this.speed * -1;
      // set new wall height
      this.topWall  = this.topWall - this.topWall / 6;
    }
    // move by yDelta
    this.increaseAccel();
    let delta = (this.speed * this.acceleration)
    let xPos = this.pos[0]
    let yPos = this.pos[1] + delta;
    console.log(`NEXT action: ${yPos} speed: ${this.speed} acc: ${this.acceleration}`)
    this.token.render()
    this.token.setPosition(xPos, yPos);
  }

  render(){
    console.log(this.token);
    // setInterval(this.bounce, 1000);
  }
}

export default Squash;