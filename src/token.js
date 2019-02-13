
// token JS file

class Token {
  constructor(props){
    this.shape = props.shape;
    this.type = props.type;
    this.color = props.color;
    this.ctx = props.ctx
    this.dir = "down"
    this.dimensions = props.dimensions; // [ w, h, r ],
    this.position = props.position;     // [ startX, startY ],
    this.walls = props.walls;           // [ top, bottom, left, right ]
    this.deltaX = props.deltaX;
    this.deltaY = props.deltaY;
  

    this.logger   = this.logger.bind(this);
    this.getColor = this.getColor.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.getDimensions = this.getDimensions.bind(this);
    this.setRadius = this.setRadius.bind(this);
    this.getTokenAttributes = this.getTokenAttributes.bind(this);
  }


  logger() {
    let currentTokenState = {
      token: {
        shape: this.shape,
        color: this.color,
        dims: this.dimensions,
        pos: `${this.position[0]}, ${this.position[1]}`,
        walls: this.walls,
      }
    }
    console.log( currentTokenState )
  }

  getPosition(){
    this.xPos = this.position[0];
    this.yPos = this.position[1];

    return [this.xPos, this.yPos];
  }

  setPosition(newX, newY) {
    this.position[0] = newX;
    this.position[1] = newY;
  }

  changePosition(offsets) {
    const xOffset = offsets[0];
    const yOffset = offsets[1];

    this.position[0] += xOffset;
    this.position[1] += yOffset;
  }

  getDimensions(){
    this.width  = this.dimensions[0];
    this.height = this.dimensions[1];
    this.radius = this.dimensions[2];

    return [this.width, this.height];
  }

  setRadius(newRadius) {
    this.dimensions[2] += newRadius;
  }

  getColor() {
    this.ctx.fillStyle = this.color;

  }

  getTokenAttributes() {
    this.getColor();
    this.getPosition();
    this.getDimensions();
  }

  render() {
    
    this.getTokenAttributes();
    // this.logger();
    switch (this.shape) {
      case "square":
        this.ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
        this.ctx.closePath();
        return;
      case "circle":
        this.ctx.beginPath();
        this.ctx.arc(this.xPos + 15, this.yPos, this.radius, 0, Math.PI * 2, true);
        this.ctx.fill();
        this.ctx.closePath();
        return;
      default:
        return null;
    }
  }
}

export default Token