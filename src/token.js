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
    this.ctx = props.ctx
  }
  

  render() {
    let canvas = this.ctx.getContext('2d');
    canvas.fillStyle = this.color;

    switch (this.shape) {
      case "square":
        canvas.fillRect(this.xPos, this.yPos, this.width, this.height)
      default:
        return null;
    }
  }
}

export default Token