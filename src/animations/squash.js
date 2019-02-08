// squash animation
class Squash {
  constructor(props) {
    this.token = props.token;

    this.topWall   = props.token.walls[0]
    this.botWall   = props.token.walls[1]
    this.leftWAll  = props.token.walls[2]
    this.rightWall = props.token.walls[3]
    this.diff = [10, 10];

    this.moveInDir = this.moveInDir.bind(this)
    this.move = this.move.bind(this)
  }

  moveInDir(){
    // let diff = [0, 0];
    let leftOffset;
    let rightOffset;
    const pos = this.token.getPosition()
    const xPos = pos[0]
    const yPos = pos[1]
    const dims = this.token.getDimensions()
    const width = dims[0]
    const height = dims[1]
    // const tokenArea = width * height;

    if (xPos < this.leftWAll) {
      console.log('hit Left wall')
      rightOffset = +10;
      this.diff[0] = rightOffset; 
    } else if (xPos + width >= this.rightWall) {
      console.log('hit Right wall')
      rightOffset = -10;
      this.diff[0] = rightOffset; 
    }
    if (yPos > this.botWall) {
      console.log('hit Bot wall')
      leftOffset = -10;
      this.diff[1] = leftOffset; 
    } else if (yPos + height <= this.topWall) {
      console.log('hit Top wall')
      leftOffset= +10;
      this.diff[1] = leftOffset;
    }

    console.log(`xPpos + w: ${xPos + width}, xPpos: ${xPos}, yPpos + h: ${yPos + height}, yPpos: ${yPos}`)
    console.log(`leftW: ${this.leftWAll}, rightW: ${this.rightWall}, topW: ${this.topWall}, botW: ${this.botWall}`)
    console.log(this.diff);
    return this.diff;
  }


  move() {
    this.token.changePosition(this.moveInDir())
    this.token.render()
  }

  render(){
    // setInterval(this.move, 250);
  }
}

export default Squash;