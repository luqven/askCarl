import Util from "../util";

class movingObject {
  constructor(props) {
    this.token     = props.token;
    // token wall locations
    this.topWall   = props.token.walls[0];
    this.botWall   = props.token.walls[1];
    this.leftWAll  = props.token.walls[2];
    this.rightWall = props.token.walls[3];
    this.inflectionPoint = 250;
    // initial token position and dimensions
    this.pos          = this.token.position;   // [xPos, yPos]
    this.initialPos   = this.pos.slice(0);     // stored for reference when needed
    this.dimensions   = this.token.dimensions; // [w, h, r] 
    this.radius       = this.token.dimensions[2];
    this.height       = this.token.dimensions[1];
    this.width        = this.dimensions[0];
    // start delta, acceleration, friction, and threshold values
    this.deltaY       = props.token.deltaY;
    this.deltaX       = props.token.deltaX;
    this.deltaR       = this.deltaY / 900;
    this.acceleration = 10;
    this.friction     = .889;
    this.thresholdY   = 0.009   // stop animation at this speed
    this.thresholdX   = 0.11    // stop animation at this speed
    this.ended        = false;  // true when delta ~= 0;
    // bind functions
    this.bounce        = this.bounce.bind(this);
    this.hitWall       = this.hitWall.bind(this);
    this.growToken     = this.growToken.bind(this);
    this.moveInDyDir   = this.moveInDyDir.bind(this);
    this.increaseAccel = this.increaseAccel.bind(this);
    this.reverseDeltaY = this.reverseDeltaY.bind(this);
    this.reverseDeltaX = this.reverseDeltaX.bind(this);

    this.newHitwall = this.newHitwall.bind(this);

  }


  newHitwall() {
    let startX = this.pos[0];
    let startY = this.pos[1];

    let topLeft  = this.pos;
    let topRight = [startX + this.width, startY];
    let botLeft  = [startX, startY + this.height];
    let botRight = [startX + this.width , startY + this.height];
    // wallIndexes = [1, 2, 3, 4]  // [top, bottm, left, right]
    let hitWalls = []

    console.log(`
      ${topLeft} ..............${topRight} ,
      .                                    .
      .                                    .
      .                                    .
      .                                    .
      .                                    .
      .                                    .
      .                                    .
      ${botLeft} ..............${botRight}`);

    if (
      topLeft[0]  <=  this.topWall[0] ||
      topRight[0] <=  this.topWall[0] ||
      botLeft[0]  <=  this.topWall[0] ||
      botRight[0] <=  this.topWall[0] ||
      topLeft[1]  <=  this.topWall[1] ||
      topRight[1] <=  this.topWall[1] ||
      botLeft[1]  <=  this.topWall[1] ||
      botRight[1] <=  this.topWall[1]
    ) { 
      // this.reverseDeltaY();
      hitWalls.push(1)
      } else if (
      topLeft[0]  <=  this.botWall[0] ||
      topRight[0] <=  this.botWall[0] ||
      botLeft[0]  <=  this.botWall[0] ||
      botRight[0] <=  this.botWall[0] ||
      topLeft[1]  >=  this.botWall[1] ||
      topRight[1] >=  this.botWall[1] ||
      botLeft[1]  >=  this.botWall[1] ||
      botRight[1] >=  this.botWall[1]
    ) {
      // this.reverseDeltaY();
      hitWalls.push(2)
      }

    if (
      topLeft[0]  <= this.leftWAll[0] ||
      topRight[0] <= this.leftWAll[0] ||
      botLeft[0]  <= this.leftWAll[0] ||
      botRight[0] <= this.leftWAll[0] ||
      topLeft[1]  <= this.leftWAll[1] ||
      topRight[1] <= this.leftWAll[1] ||
      botLeft[1]  <= this.leftWAll[1] ||
      botRight[1] <= this.leftWAll[1]
    ) {
      // this.reverseDeltaX();
      hitWalls.push(3)
      } else if (
      topLeft[0]  >= this.rightWall[0] ||
      topRight[0] >= this.rightWall[0] ||
      botLeft[0]  >= this.rightWall[0] ||
      botRight[0] >= this.rightWall[0] ||
      topLeft[1]  <= this.rightWall[1] ||
      topRight[1] <= this.rightWall[1] ||
      botLeft[1]  <= this.rightWall[1] ||
      botRight[1] <= this.rightWall[1]
    ) { 
      // this.reverseDeltaX();
      hitWalls.push(4)
      }
    return hitWalls;
  }

  // return corresponding wall integer if token hit a wall
  hitWall(){
    // logic for square token
    if (this.token.shape === "square"){
      if (this.pos[0] + this.width >= this.rightWall) {
          return 1;
      } else if (this.pos[0] <= this.leftWAll) {
          return 1;
      } else if (this.pos[1] <= this.topWall){
          return 0;
      } else if (this.pos[1] + this.height >= this.botWall) {
          return 0;
        }
    // logic for circle token, accounts for raidus
    } else if (this.token.shape === "circle") {
      // top wall hit
      if (Math.abs(this.deltaY) >= this.thresholdY && this.pos[1] <= this.topWall) {
        return 0;
      // bot wall hit
      } else if (Math.abs(this.deltaY) >= this.thresholdY && this.pos[1] + this.radius + 2.66 >= this.botWall) {
        return 0;
      // right wall hit
      } if (Math.abs(this.deltaX) >= this.thresholdX && this.pos[0] + this.radius >= this.rightWall) {
        return 1;
      // left wall hit
      } else if (Math.abs(this.deltaX) >= this.thresholdX && this.pos[0] + this.radius <= this.leftWAll) {
        return 1;
      }
    }
    // no wall hit
    return 3;
  }

/////////////////////////////////////////
//    TO DO: Implement dim resizing
/////////////////////////////////////////

  growToken() {
    // debugger
    this.token.setRadius(this.radius * this.deltaR)
  }

/////////////////////////////////////////


  reverseDeltaY(){
    // reverse verticle delta direction
    this.deltaY =  this.friction * this.deltaY * -1;
  }
  reverseDeltaX(){
    // reverse verticle delta direction
    this.deltaX =  this.friction * this.deltaX * -1;
  }

  increaseAccel() {
    this.deltaY += 1;
    // this.deltaR = this.deltaY / 500;
    // this.deltaX += 1;
  }

  moveInDyDir() {
    // move token to postion after adding delta
    this.token.changePosition([this.deltaX, this.deltaY])
  }
  
  bounce() {
    this.token.render()

    // change deltaX when between start pos + 10 and  start pos + 30
    // this simulates slow in and slow out animation behavior
    if (Math.abs(this.pos[0] - this.initialPos[0]) > 10 || Math.abs(this.pos[0] - this.initialPos[0]) < 30) {
      this.deltaX = this.deltaX * (this.friction / .92)
    }

    // set end condition to true if delats have reached thresholds
    if (Math.abs(this.deltaY ) < this.thresholdY  && Math.abs(this.deltaX) <= this.thresholdX) {
      // debugger 
      this.over = true
    };

    // check if render should end
    // if (this.over) { return null}

    // move the token in dY direciton
    this.moveInDyDir();

    // check to see if wall was hit
    const newHitWall = this.newHitwall();
    // debugger
    // if hit bottom or top wall
    if (newHitWall.includes(1) || newHitWall.includes(2)) {
      this.reverseDeltaY();
    }
    // if hit left or right wall
    if (newHitWall.includes(3) || newHitWall.includes(4)) {
      this.reverseDeltaX();
    } 
    // if no wall hit
    if (newHitWall.length < 1) {
      this.increaseAccel();
    }
  }

  render(){
    // console.log(this.token.dimensions);
    this.token.render();
    if(this.token.type === 'bounce') {
       this.bounce(); 
      }
  }
}

export default movingObject;