// exports MovingObject class and makeObjects function
// Both take in props, makeObjects takes in additional num arg

export class MovingObject {
  constructor(props) {

    this.x = props.x
    this.y = props.y

    this.radius = props.radius
    this.width  = props.width
    this.height = props.height
    this.color  = props.color
    this.canvas = props.canvas
    this.ctx    = props.canvas.ctx
    this.type   = props.type
    this.deltaX = props.deltaX
    this.deltaY = props.deltaY

    this.opacity = props.opacity

    this.draw    = this.draw.bind(this)
    this.circle  = this.circle.bind(this)
    this.square  = this.square.bind(this)
    this.render  = this.render.bind(this)
    this.getDims = this.getDims.bind(this)
    this.getSpeed    = this.getSpeed.bind(this)
    this.changeDims  = this.changeDims.bind(this)
    this.getPosition = this.getPosition.bind(this)
    this.changeSpeed = this.changeSpeed.bind(this)
    this.changePosition = this.changePosition.bind(this)
  }

  getPosition(){
    return [this.x, this.y]
  }

 changePosition(offsets){
   let xDiff = offsets[0]
   let yDiff = offsets[1]
    this.x += xDiff
    this.y += yDiff
  }

  getDims(){
    return [this.width, this.height, this.radius]
  }

 changeDims(w, h, r=0) {
    this.width += w
    this.height += h
    this.r += r
  }

  getSpeed() {
    return [this.deltaX, this.deltaY]
  }

 changeSpeed(newDX, newDY) {
    this.deltaX = newDX
    this.deltaY = newDY
  }

  circle() {
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    this.ctx.fillStyle = this.color
    this.ctx.fill()
    this.ctx.closePath()
  }

  square() {
    this.ctx.globalAlpha = this.opacity
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.globalAlpha = 1.0
    this.ctx.closePath();
    return;
  }

  draw() {
    if(this.type === "square"){
      this.square();
    } else if (this.type === "circle"){
      this.circle()
    }
  }

  render() {
    this.draw()
  }
}
// returns an array of objects
export const makeObjects = (num, props) => {
  let objects = []
  for (let i = 0; i < num; i++) {
    objects.push(new MovingObject(props))
  }
  return objects
}