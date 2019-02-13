import Util from "../util";

class movingObject {
  constructor(props) {
    this.token     = props.token;
    // token wall locations
    this.topWall   = props.token.walls[0];
    this.botWall   = props.token.walls[1];
    this.leftWAll  = props.token.walls[2];
    this.rightWall = props.token.walls[3];
    // this.inflectionPoint = 250;
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
    this.growToken     = this.growToken.bind(this);
    this.moveInDyDir   = this.moveInDyDir.bind(this);
    this.increaseAccel = this.increaseAccel.bind(this);
    this.reverseDeltaY = this.reverseDeltaY.bind(this);
    this.reverseDeltaX = this.reverseDeltaX.bind(this);
    
    this.hitWall = this.hitWall.bind(this);
    this.hitHorizWall  = this.hitHorizWall.bind(this);
    this.hitVertWall   = this.hitVertWall.bind(this);
    
  }
  
////////////////////////////////////////
// wall collision logic
////////////////////////////////////////
  hitWall() {
    let startX = this.pos[0];
    let startY = this.pos[1];

    let topLeft  = this.pos;
    let topRight = [startX + this.width, startY];
    let botLeft  = [startX, startY + this.height];
    let botRight = [startX + this.width , startY + this.height];
    // wallIndexes = [1, 3]  // [top / bottm, left / right]
    let hitWalls = [];
    // check all four corners against each wall

    if (this.hitHorizWall(topLeft, topRight, botLeft, botRight)) {
       hitWalls.push(1);
    };
    if (this.hitVertWall(topLeft, topRight, botLeft, botRight)) {
      hitWalls.push(3);
    };
    return hitWalls;
  }

  hitHorizWall(topLeft, topRight, botLeft, botRight) {
      if  (
      topLeft[0]  <=  this.topWall[0] ||
      topRight[0] <=  this.topWall[0] ||
      botLeft[0]  <=  this.topWall[0] ||
      botRight[0] <=  this.topWall[0] ||  // topWall hit check
      topLeft[1]  <=  this.topWall[1] ||
      topRight[1] <=  this.topWall[1] ||
      botLeft[1]  <=  this.topWall[1] ||
      botRight[1] <=  this.topWall[1]
    ) { 
      return true;
      } else if (
      topLeft[0]  <=  this.botWall[0] ||
      topRight[0] <=  this.botWall[0] ||
      botLeft[0]  <=  this.botWall[0] ||
      botRight[0] <=  this.botWall[0] ||  // botWall hit check
      topLeft[1]  >=  this.botWall[1] ||
      topRight[1] >=  this.botWall[1] ||
      botLeft[1]  >=  this.botWall[1] ||
      botRight[1] >=  this.botWall[1]
    ) {
      return true;
      };
  };
  
  hitVertWall(topLeft, topRight, botLeft, botRight) {
    if (
      topLeft[0]  <= this.leftWAll[0] ||
      topRight[0] <= this.leftWAll[0] ||
      botLeft[0]  <= this.leftWAll[0] ||
      botRight[0] <= this.leftWAll[0] ||  // leftWall hit check
      topLeft[1]  <= this.leftWAll[1] ||
      topRight[1] <= this.leftWAll[1] ||
      botLeft[1]  <= this.leftWAll[1] ||
      botRight[1] <= this.leftWAll[1]
    ) {
      return true;
      } else if (
      topLeft[0]  >= this.rightWall[0] ||
      topRight[0] >= this.rightWall[0] ||
      botLeft[0]  >= this.rightWall[0] ||
      botRight[0] >= this.rightWall[0] || // right hit check
      topLeft[1]  <= this.rightWall[1] ||
      topRight[1] <= this.rightWall[1] ||
      botLeft[1]  <= this.rightWall[1] ||
      botRight[1] <= this.rightWall[1]
    ) { 
      return true;
      };
  };

////////////////////////////////////////
// token delta change logic
////////////////////////////////////////
  growToken() {
    // 
    this.token.setRadius(this.radius * this.deltaR)
  }

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

////////////////////////////////////////
// collision and delta change handlers
////////////////////////////////////////
  bounce() {
    this.token.render()

    // change deltaX when between start pos + 10 and  start pos + 30
    // this simulates slow in and slow out animation behavior
    if (Math.abs(this.pos[0] - this.initialPos[0]) > 10 || Math.abs(this.pos[0] - this.initialPos[0]) < 30) {
      this.deltaX = this.deltaX * (this.friction / .92)
    }

    // set end condition to true if delats have reached thresholds
    if (Math.abs(this.deltaY ) < this.thresholdY  && Math.abs(this.deltaX) <= this.thresholdX) {
      //  
      this.over = true
    };

    // check if render should end
    // if (this.over) { return null}

    // move the token in dY direciton
    this.moveInDyDir();

    // check to see if wall was hit
    const hitWall = this.hitWall();
    // 
    // if hit bottom or top wall
    if (hitWall.includes(1)) {
      this.reverseDeltaY();
    }
    // if hit left or right wall
    if (hitWall.includes(3)) {
      this.reverseDeltaX();
    } 
    // if no wall hit
    if (hitWall.length < 1) {
      this.increaseAccel();
    }
  }

////////////////////////////////////////
// render logic
////////////////////////////////////////
  render(){
    // console.log(this.token.dimensions);
    this.token.render();
    if(this.token.type === 'bounce') {
       this.bounce(); 
      }
  }
}

export default movingObject;