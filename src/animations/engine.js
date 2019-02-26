import Util from "../util";

export default class Engine {
  constructor(props) {
    this.shape     = props.shape;
    this.canvas    = props.canvas
    // shape wall locations
    this.topWall   = [0, this.canvas.y];
    this.botWall   = [0, this.canvas.height - 65];
    this.leftWAll  = [this.canvas.x, 0];
    this.rightWall = [this.canvas.width, 0];
    // initial shape position and dimensions
    this.pos          = [this.shape.x, this.shape.y]
    this.initialPos   = [this.shape.x, this.shape.y].slice(0);     // stored for reference when needed
    // start delta, acceleration, friction, and threshold values
    this.deltaR       = this.shape.deltaY / 900;
    this.acceleration = 10;
    this.friction     = .889;
    this.velocity     = {x: this.shape.deltaX, y: this.shape.deltaY};
    this.thresholdY   = 0.4    // stop animation at this speed
    this.thresholdX   = 0.4    // stop animation at this speed
    this.ended        = false; // true when delta ~= 0;
    // bind functions
    this.animate       = this.animate.bind(this);
    this.growShape     = this.growShape.bind(this);
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
    if (this.shape.type != "circle") {
      //  get coordinates of the center of the shape
      this.midPoint = [Math.round(this.pos[0] + this.shape.width / 2), Math.round(this.pos[1] + this.shape.height / 2)];
    } else {
      this.midPoint = this.pos;
    };
    // get the coordinates of shapes 4 corners
    // let startX = this.pos[0];
    // let startY = this.pos[1];
    // let topLeft  = this.pos;
    // let topRight = [startX + this.shape.width, startY];
    // let botLeft  = [startX, startY + this.shape.height];
    // let botRight = [startX + this.shape.width , startY + this.shape.height]; 
    // wallIndexes = [0, 2]  // [top / bottom, left / right]
    let hitWalls = [];
    // if midP +/- radius <=> wall -> wall hit
    if( this.midPoint[0] - this.shape.radius <= this.leftWAll[0]){
      hitWalls.push(2);
      this.reverseDeltaX();
    } else if (this.midPoint[0] + this.shape.radius >= this.rightWall[0] ) {
      hitWalls.push(2);
      this.reverseDeltaX();
    };
    if (this.midPoint[1] - this.shape.radius <= this.topWall[1]) {
      hitWalls.push(0);
      this.reverseDeltaY();
    } else if (this.midPoint[1] + this.shape.radius >= this.botWall[1]) {
      hitWalls.push(0);
      this.reverseDeltaY();
    };
    if (hitWalls.length < 1) {
      this.increaseAccel();
    };
  };
////////////////////////////////////////
// Object collision logic
////////////////////////////////////////

  // TODO: object collision detection
    // for all objects passed into functions
    // if (this.distanceBetween(this.midPoint, otherMidP) <= 0
      // react to collision
        // by changing dX and dY accordingly


////////////////////////////////////////
// shape delta change logic
////////////////////////////////////////
  growShape() {
    this.shape.setDims(0, 0, this.shape.radius * this.deltaR)
  };

  reverseDeltaY(){
    // reverse vertical delta direction
    this.shape.deltaY =  this.friction * this.shape.deltaY * -1;
  };

  reverseDeltaX(){
    // reverse vertical delta direction
    this.shape.deltaX =  this.friction * this.shape.deltaX * -1;
  };

  increaseAccel() {
    this.shape.deltaY += 1;
  };

  moveInDyDir() {
    // move shape to position after adding delta
    this.shape.changePosition([this.shape.deltaX, this.shape.deltaY])
    this.pos = this.shape.getPosition()
  };

////////////////////////////////////////
// collision and delta change handlers
////////////////////////////////////////
  animate() {
    this.shape.render()

    // change deltaX when between start pos + 10 and  start pos + 30
    // this simulates slow in and slow out animation behavior
    if (Math.abs(this.pos[0] - this.initialPos[0]) > 10 ||
        Math.abs(this.pos[0] - this.initialPos[0]) < 30) {
      this.shape.deltaX = this.shape.deltaX * (this.friction / .92)
    };

    // set end condition to true if deltas have reached thresholds
    if (Math.abs(this.shape.deltaY ) < this.thresholdY &&
        Math.abs(this.shape.deltaX) <= this.thresholdX) {
        this.over = true
    };

    // check if render should end
    // if (this.over) { return null}

    // move the shape in dY direction
    this.moveInDyDir();

    // check to see if wall was hit
    const hitWall = this.hitWall();
  };

////////////////////////////////////////
// render logic
////////////////////////////////////////
  render(){
    // console.log(this.shape.dimensions);
    // this.shape.render();
    // if(this.shape.type === 'bounce') {
       this.animate(); 
      // };
  };
};