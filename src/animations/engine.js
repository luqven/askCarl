import Util from "../util";

class movingObject {
  constructor(props) {
    this.token     = props.token;
    this.allTokens = props.allTokens;
    // token wall locations
    this.topWall   = props.token.walls[0];
    this.botWall   = props.token.walls[1];
    this.leftWAll  = props.token.walls[2];
    this.rightWall = props.token.walls[3];
    // initial token position and dimensions
    this.pos          = this.token.position;   // [xPos, yPos]
    this.x            = this.pos[0];
    this.y            = this.pos[1];
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
    this.velocity     = {x: this.deltaX, y: this.deltaY};
    this.thresholdY   = 0.4    // stop animation at this speed
    this.thresholdX   = 0.4    // stop animation at this speed
    this.ended        = false; // true when delta ~= 0;
    // bind functions
    this.animate        = this.animate.bind(this);
    this.growToken     = this.growToken.bind(this);
    this.moveInDyDir   = this.moveInDyDir.bind(this);
    this.increaseAccel = this.increaseAccel.bind(this);
    this.reverseDeltaY = this.reverseDeltaY.bind(this);
    this.reverseDeltaX = this.reverseDeltaX.bind(this);
    
    this.hitWall = this.hitWall.bind(this);
    
  };
  
////////////////////////////////////////
// wall collision logic
////////////////////////////////////////
  hitWall() {
    if (this.token.type != "circle") {
      //  get coordinates of the center of the shape
      this.midPoint = [Math.round(this.pos[0] + this.width / 2), Math.round(this.pos[1] + this.height / 2)];
    } else {
      this.midPoint = this.pos;
    };
    // get the coordinates of shapes 4 corners
    // let startX = this.pos[0];
    // let startY = this.pos[1];
    // let topLeft  = this.pos;
    // let topRight = [startX + this.width, startY];
    // let botLeft  = [startX, startY + this.height];
    // let botRight = [startX + this.width , startY + this.height]; 
    // wallIndexes = [0, 2]  // [top / bottom, left / right]
    let hitWalls = [];
    // if midP +/- radius <=> wall -> wall hit
    if( this.midPoint[0] - this.radius <= this.leftWAll[0]){
      hitWalls.push(2);
      this.reverseDeltaX();
    } else if (this.midPoint[0] + this.radius >= this.rightWall[0] ) {
      hitWalls.push(2);
      this.reverseDeltaX();
    };
    if (this.midPoint[1] - this.radius <= this.topWall[1]) {
      hitWalls.push(0);
      this.reverseDeltaY();
    } else if (this.midPoint[1] + this.radius >= this.botWall[1]) {
      hitWalls.push(0);
      this.reverseDeltaY();
    };
    if (hitWalls.length < 1) {
      this.increaseAccel();
    };
  };

      // TODO: object collision detection
    // if (this.distanceBetween(this.midPoint, otherMidP) <= 0 ){
    //   debugger
    //     hitWalls.push(i);
    // }


////////////////////////////////////////
// token delta change logic
////////////////////////////////////////
  growToken() {
    this.token.setRadius(this.radius * this.deltaR)
  };

  reverseDeltaY(){
    // reverse vertical delta direction
    this.deltaY =  this.friction * this.deltaY * -1;
  };

  reverseDeltaX(){
    // reverse vertical delta direction
    this.deltaX =  this.friction * this.deltaX * -1;
  };

  increaseAccel() {
    this.deltaY += 1;
  };

  moveInDyDir() {
    // move token to position after adding delta
    this.token.changePosition([this.deltaX, this.deltaY])
  };

////////////////////////////////////////
// collision and delta change handlers
////////////////////////////////////////
  animate() {
    this.token.render()

    // change deltaX when between start pos + 10 and  start pos + 30
    // this simulates slow in and slow out animation behavior
    if (Math.abs(this.pos[0] - this.initialPos[0]) > 10 ||
        Math.abs(this.pos[0] - this.initialPos[0]) < 30) {
      this.deltaX = this.deltaX * (this.friction / .92)
    };

    // set end condition to true if deltas have reached thresholds
    if (Math.abs(this.deltaY ) < this.thresholdY &&
        Math.abs(this.deltaX) <= this.thresholdX) {
        this.over = true
    };

    // check if render should end
    // if (this.over) { return null}

    // move the token in dY direction
    this.moveInDyDir();

    // check to see if wall was hit
    const hitWall = this.hitWall();
  };

////////////////////////////////////////
// render logic
////////////////////////////////////////
  render(){
    // console.log(this.token.dimensions);
    this.token.render();
    if(this.token.type === 'bounce') {
       this.animate(); 
      };
  };
};

export default movingObject;