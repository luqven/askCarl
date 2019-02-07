// squash animation
class Squash {
  constructor(props) {
    this.token = props.token;

    this.topWall   = props.token.walls[0]
    this.botWall   = props.token.walls[1]
    this.leftWAll  = props.token.walls[2]
    this.rightWall = props.token.walls[3]

    this.moveInDir = this.moveInDir.bind(this)
  }

  moveInDir(){
    let diff = [0, 0];
    const pos = this.token.getPosition()
    const xPos = pos[0]
    const yPos = pos[1]
    const dims = this.token.getDimensions()
    const width = dims[0]
    const height = dims[1]
    // const tokenArea = width * height;
    console.log(`xPpos + w: ${xPos + width}, xPpos: ${xPos}, yPpos + h: ${yPos + height}, yPpos: ${yPos}`)
    console.log(`leftW: ${this.leftWAll}, rightW: ${this.rightWall}, topW: ${this.topWall}, botW: ${this.botWall}`)

    if (xPos < this.leftWAll) {
      diff[0] = +1; 
    } else if (xPos + width >= this.rightWall) {
      diff[0] = -1;
    }
    if (yPos > this.botWall) {
      diff[1] = +1;
    } else if (yPos + height <= this.topWall) {
      diff[1] = -1;
    }

    return diff;
  }

  render(){
    // debugger;
  }
}

export default Squash;