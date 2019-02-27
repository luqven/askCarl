import Util from "../util";
// import { handleCollision, distanceBetween } from "./collision_math"

export default class Engine {
  constructor(props) {
    this.shape     = props.shape;
    this.canvas    = props.canvas
    // shape wall locations
    this.topWall   = [0, this.canvas.y];
    this.botWall   = [0, this.canvas.height - 65];
    this.leftWAll  = [this.canvas.x - 20, 0];
    this.rightWall = [this.canvas.width, 0];
    // initial shape position and dimensions
    this.pos          = [this.shape.x, this.shape.y]
    this.initialPos   = [this.shape.x, this.shape.y].slice(0);     // stored for reference when needed
    this.midPoint     = [Math.round(this.pos[0] + this.shape.width / 2), Math.round(this.pos[1] + this.shape.height / 2)];
    // start delta, acceleration, friction, and threshold values
    this.deltaR       = this.shape.deltaY / 900;
    this.acceleration = 10;
    this.friction     = .889;
    this.velocity     = {x: this.shape.deltaX, y: this.shape.deltaY};
    this.thresholdY   = 0.4    // stop animation at this speed
    this.thresholdX   = 0.4    // stop animation at this speed
    this.mass         = 1 * this.shape.radius   // mass is multiple of radius 
    this.ended        = false; // true when delta ~= 0;
    // bind functions
    this.animate       = this.animate.bind(this);
    this.growShape     = this.growShape.bind(this);
    this.moveInDyDir   = this.moveInDyDir.bind(this);
    this.increaseAccel = this.increaseAccel.bind(this);
    this.reverseDeltaY = this.reverseDeltaY.bind(this);
    this.reverseDeltaX = this.reverseDeltaX.bind(this);

    this.rotate = this.rotate.bind(this);
    this.hitWall = this.hitWall.bind(this);
    this.handleCollision = this.handleCollision.bind(this);
    this.distanceBetween = this.distanceBetween.bind(this);
    this.checkForCollisionWith = this.checkForCollisionWith.bind(this);
    
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


//////////////////////////////////////////////
// Object collision logic - called in js index
//////////////////////////////////////////////

  // calculates collision on rotated axis to be able to use 1d newtonian eq.
  rotate(velocity, angle){
    const rotatedVelocities = {
      // angle =  collision angle between two objects in radians
      x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
      y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
    return rotatedVelocities;
  }
  // changes dX and DY using newtonian eq.
  handleCollision(self, otherObject){
    // console.log('checking for collisions...')
    const xVelocityDiff = self.shape.deltaX - otherObject.shape.deltaX;
    const yVelocityDiff = self.shape.deltaY - otherObject.shape.deltaY;
    const xDist = otherObject.shape.x - self.shape.x;
    const yDist = otherObject.shape.y - self.shape.y;
    // Account for accidental overlap of shapes
    // this essentially ignores shapes that either
    // would overlap or somehow have managed to overlap
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
      // Get angle between the colliding shapes
      const angle = -Math.atan2(otherObject.shape.y - self.shape.y, otherObject.shape.x - self.shape.x);

      // shape mass
      const m1 =self.mass;
      const m2 = otherObject.mass;

      // shape velocity
      const u1 = this.rotate({x: self.shape.deltaX, y: self.shape.deltaY}, angle);
      const u2 = this.rotate({x: otherObject.shape.deltaX, y: otherObject.shape.deltaY}, angle);

      // shape velocity after right angle collision equation (1 dimensional)
      const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
      const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

      // Final velocity after reverting axis
      const vFinal1 = this.rotate(v1, -angle);
      const vFinal2 = this.rotate(v2, -angle);

      // Swap shape velocities for bounce animation
      self.shape.deltaX = vFinal1.x;
      self.shape.deltaY = vFinal1.y;

      otherObject.shape.deltaX = vFinal2.x;
      otherObject.shape.deltaY = vFinal2.y;
    }
  }

  // get the distance between two shapes midpoints
  distanceBetween(pos1, pos2) {
    let xDiff = Math.round(pos2[0]) - Math.round(pos1[0]);
    let yDiff = Math.round(pos2[1]) - Math.round(pos1[1]);
    // a**2 + b**2 === c**2
    let distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))
    return distance;
  }

  checkForCollisionWith(otherObject){
    if (this.distanceBetween(this.midPoint, otherObject.midPoint) <= this.shape.radius) {
      this.handleCollision(this, otherObject)
    }
  }

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