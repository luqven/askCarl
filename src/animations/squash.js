// squash animation
class Squash {
  constructor(props) {
    this.token     = props.token;
    this.topWall   = props.token.walls[0] / 3;
    this.botWall   = props.token.walls[1];
    this.leftWAll  = props.token.walls[2];
    this.rightWall = props.token.walls[3];
    
    this.pos          = this.token.position;   // [xPos, yPos]
    this.dimensions   = this.token.dimensions; // [w, h] 
    this.height       = this.token.dimensions[1];
    this.deltaY       = 1;   // initial vertical speed
    this.deltaX       = 0;   // initial horizontal speed
    this.acceleration = 20;  // initial accel
    this.threshhold   = .05; //  stop animationwhen speed reaches this
    this.hitCount     = 1;   // start with 0 bounces

    this.bounce        = this.bounce.bind(this);
    this.hitWall       = this.hitWall.bind(this);
    this.increaseAccel = this.increaseAccel.bind(this);
    this.moveInDyDir   = this.moveInDyDir.bind(this);
    this.reverseDeltaY = this.reverseDeltaY.bind(this);
  }

  hitWall(){
    // return true if token hit botWall or topWall
    if (this.pos[1] <= this.topWall){
      return true;
    } else if (this.pos[1] + this.height >= this.botWall) {
      return true;
    }
    return false;
  }

  reverseDeltaY(){
    // reverse verticle delta direction
    this.deltaY = this.deltaY * -1;
  }

  increaseAccel() {
    this.deltaY += 1;
  }

  moveInDyDir() {
    // move token to postion after adding delta
    this.token.changePosition([this.deltaX, this.deltaY])

  }

  increaseDelta() {
    // increase verticle speed
    this.deltaY += this.deltaY;
  }

  bounce() {
    this.token.render()
    // move the token in dY direciton
    this.moveInDyDir();
    // check to see if wall was hit
    if (this.hitWall() === true) {
      console.log('wall hit!');
      // if hit reverse verticle delta polarity
      this.reverseDeltaY();
      console.log(`deltaY inverted`)
    } else {
      this.increaseAccel();
    }
  }

  render(){
    console.log(this.token);
    setInterval(this.bounce, 50);
  }
}

export default Squash;