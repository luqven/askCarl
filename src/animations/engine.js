import Util from "../util";

class movingObject {
  constructor(props) {
    this.token     = props.token;
    this.topWall   = props.token.walls[0] / 3;
    this.botWall   = props.token.walls[1];
    this.leftWAll  = props.token.walls[2];
    this.rightWall = props.token.walls[3];
    
    this.pos          = this.token.position;   // [xPos, yPos]
    this.initialPos   = this.pos.slice(0);     // initial [xPos, yPos]
    this.dimensions   = this.token.dimensions; // [w, h] 
    this.height       = this.token.dimensions[1];
    this.radius       = this.token.dimensions[2];
    this.initialH     = this.token.dimensions[1];
    this.width        = this.dimensions[0]; // this width gets changed
    this.initialW     = this.dimensions[0]; // store for later refrence

    this.deltaY       = props.token.deltaY;     // initial vertical change
    this.deltaX       = props.token.deltaX;     // initial vertical change
    this.acceleration = 10;    // initial accel
    this.friction     = .889;  // initial friction fraction
    this.thresholdY   = 0.009   // stop animation at this speed
    this.thresholdX   = 0.11    // stop animation at this speed
    this.ended        = false; // true when delta ~= 0;
    
  
    this.bounce        = this.bounce.bind(this);
    this.hitWall       = this.hitWall.bind(this);
    this.increaseAccel = this.increaseAccel.bind(this);
    this.moveInDyDir   = this.moveInDyDir.bind(this);
    this.reverseDeltaY = this.reverseDeltaY.bind(this);
    this.reverseDeltaX = this.reverseDeltaX.bind(this);
    
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
    if (this.token.shape === "square"){
      // debugger
      // console.log(this.token)
      if (this.pos[0] + this.width >= this.rightWall) {
          return 1;
      } else if (this.pos[0] <= this.leftWAll) {
          return 1;
      } else if (this.pos[1] <= this.topWall){
          return 0;
      } else if (this.pos[1] + this.height >= this.botWall) {
          return 0;
        }
    } else if (this.token.shape === "circle") {
      // debugger
      if (Math.abs(this.deltaY) >= this.thresholdY && this.pos[1] <= this.topWall) {
        return 0;
      } else if (Math.abs(this.deltaY) >= this.thresholdY && this.pos[1] + this.radius + 2.66 >= this.botWall) {
        return 0;
      } if (Math.abs(this.deltaX) >= this.thresholdX && this.pos[0] + this.radius >= this.rightWall) {
        return 1;
      } else if (Math.abs(this.deltaX) >= this.thresholdX && this.pos[0] + this.radius <= this.leftWAll) {
        return 1;
      }
    }

    return 3;
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
  reverseDeltaX(){
    // reverse verticle delta direction
    this.deltaX =  this.friction * .4 * this.deltaX * -1;
  }

  increaseAccel() {
    this.deltaY += 1;
    // this.deltaX += 1;
  }

  moveInDyDir() {
    // move token to postion after adding delta
    this.token.changePosition([this.deltaX, this.deltaY])
  }
  
  bounce() {
    this.token.render()
    if (Math.abs(this.pos[0] - this.initialPos[0]) > 10 || Math.abs(this.pos[0] - this.initialPos[0]) < 30) {
      this.deltaX = this.deltaX * (this.friction / .92)
      // console.log(`${this.pos[0]} === ${this.initialPos[0]}`)
    }
    // check if render should end
    if (Math.abs(this.deltaY ) < this.thresholdY  && Math.abs(this.deltaX) <= this.thresholdX) {
      this.over = true
    };
    if (this.over) { return }
    // move the token in dY direciton
    this.moveInDyDir();
    // check to see if wall was hit
    const hitWall = this.hitWall();
    if (hitWall === 0) {
      this.reverseDeltaY();
    }
    if (hitWall === 1) {
      this.reverseDeltaX();
    } 
    if (hitWall === 3 ) {
      this.increaseAccel();
    }
  }

  render(){
    this.token.render();
    if(this.token.type === 'bounce') {
       this.bounce(); 
      }
  }
}

export default movingObject;