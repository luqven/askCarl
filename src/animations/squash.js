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
    this.initialH     = this.token.dimensions[1];
    this.width        = this.dimensions[0]; // this width gets changed
    this.initialW     = this.dimensions[0]; // store for later refrence

    this.deltaY       = 2;   // initial vertical change
    this.deltaX       = 0;   // initial vertical change
    this.acceleration = 20;  // initial accel
    this.friction     = 0.9; // initial friction fraction
    this.hitCount     = 1;   // start with 0 bounces
    
    this.bounce        = this.bounce.bind(this);
    this.hitWall       = this.hitWall.bind(this);
    this.increaseAccel = this.increaseAccel.bind(this);
    this.moveInDyDir   = this.moveInDyDir.bind(this);
    this.reverseDeltaY = this.reverseDeltaY.bind(this);
    
    //////////////////////////////////////
    // TO DO: threshold params
    //////////////////////////////////////
    
    // this.deltaD       = 10;  // initial dimensions change
    // this.threshold    = this.botWall -50; // pos of squish region of canvas
    // this.resize       = false;
    // this.hitThreshold  = this.hitThreshold.bind(this);
    // this.reverseDeltaD = this.reverseDeltaD.bind(this);
    // this.changeDimensions = this.changeDimensions.bind(this);

  }

  hitWall(){
    // return true if token hit a wall
    if (this.pos[1] <= this.topWall){
      return true;
    } else if (this.pos[1] + this.height >= this.botWall) {
      return true;
    } else if (this.pos[0] + this.width >= this.rightWall) {
      return true;
    } else if (this.pos[0] <= this.leftWAll) {
      return true;
    }
    return false;
  }

/////////////////////////////////////////
//    TO DO: Implement dim resizing
/////////////////////////////////////////

  // hitThreshold() {
  //   if (this.pos[1] === this.threshold) {
  //     this.reverseDeltaD();
  //     this.resize = !this.resize;
  //     return true;
  //   } else if (this.pos[1] + this.height === this.botWall) {
  //     this.reverseDeltaD();
  //     return true;
  //   }
  //   return false;
  // }

  // changeDimensions() {
  //   this.width += this.deltaD;
  //   // this.height += this.deltaD;
  //   this.token.setDimensions(this.width, this.height)
  // }

  // reverseDeltaD(){
  //   // reverse horizontal delta direction
  //   this.deltaD = this.deltaD * -1;
  // }

  reverseDeltaY(){
    // reverse verticle delta direction
    this.deltaY =  this.friction * this.deltaY * -1;
  }

  increaseAccel() {
    this.deltaY += 1;
  }

  moveInDyDir() {
    // move token to postion after adding delta
    this.token.changePosition([this.deltaX, this.deltaY])
  }
  
  bounce() {
    this.token.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.token.render()
    // move the token in dY direciton
    this.moveInDyDir();
    // check to see if wall was hit
    if (this.hitWall() === true) {
      // if hit reverse verticle delta polarity
      this.reverseDeltaY();
    } else {
      this.increaseAccel();
    }
  }

  render(){
    setInterval(this.bounce, 20);
  }
}

export default Squash;