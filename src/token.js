// import squash from "./animations/squash";

// token JS file

class Token {
  constructor(props){
    this.shape = props.shape;
    this.model = null;
    this.color = props.color;
    this.height = props.height;
    this.width = props.width;
    this.zPos = props.zPos;
    this.xPos = props.xPos;
    this.yPos = props.yPos;
    this.canvas = props.canvas
    this.ctx = this.canvas.getContext('2d');
    this.dir = "down"

    this.squash = this.squash.bind(this);
  }

  squash(dir = this.dir, amt = -50) {
    // debugger
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    console.log(`dir:${dir} yPos: ${this.yPos}`)
    if ( dir === "down") {
      amt = +10;
      if (this.yPos >= this.canvas.height- 60) { this.dir = "up"}}

    if ( dir === "up" ) {
      amt = -10;
      if (this.yPos <= 15) { this.dir = "down" }
    };

    this.yPos += amt;
    this.render();
    
  }

  render() {
    this.ctx.fillStyle = this.color;

    switch (this.shape) {
      case "square":
        this.ctx.fillRect(this.xPos, this.yPos, this.width, this.height)
      default:
        return null;
    }
  }
}

export default Token