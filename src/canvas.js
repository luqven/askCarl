export default class Canvas {
  constructor(props) {
    this.render    = true;
    this.canvas    = props.canvas
    this.ctx       = props.canvas.getContext("2d")
    this.container = props.container // the canvas's container div or section in the html
    this.width     = this.container.offsetWidth
    this.height    = this.container.offsetHeight
    this.x = 0
    this.y = 0
    this.mousePos = {
      x: this.container.innerWidth / 2,
      y: this.container.innerHeight / 2
    }
    this.colors = { red: "red", blue: "blue", green: "green", yellow: "yellow" }
    this.canvasDidMount = false

    this.resize = this.resize.bind(this)
    this.draw = this.draw.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onCanvasDidMount = this.onCanvasDidMount.bind(this)
  }
  // change cursor pos when mouse moves over canvas container
  onMouseMove() {
    this.container.addEventListener('mousemove', e => {
      debugger
      this.mousePos.x = e.clientX
      this.mousePos.y = e.clientY
    })
  };
  // resize the canvas when it's container resizes
  resize() {
    this.container.addEventListener('resize',() => {
      this.width = innerWidth
      this.height = innerHeight
    })
  };
  // returns bool that determines if scrolled to current canvas
  scrolledTo(pageOffset){
    if (pageOffset < -300 && pageOffset > -600) {return true}
  }
  // on first render, add event listeners
  onCanvasDidMount() {
    this.onMouseMove()
    this.resize()
  }

  draw() {
    if (this.render === false) {return}
    if (this.canvasDidMount === false) {
      this.canvasDidMount = true;
      this.onCanvasDidMount()
    }
    // requestAnimationFrame(render) -- disabled since this is handled in index.js
    this.ctx.clearRect(0, 0, this.width, this.height)
  }
}