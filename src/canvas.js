export default class Canvas {
  constructor(props) {
    this.x = 0
    this.y = 0
    this.render    = true; // set to false when not scrolled to
    this.canvas    = props.canvas
    this.ctx       = props.canvas.getContext("2d")
    this.container = props.container // the canvas's container div or section in the html
    this.width     = this.container.offsetWidth
    this.height    = this.container.offsetHeight
    this.mousePos  = {
      x: this.container.offsetWidth / 2,
      y: this.container.offsetHeight / 2
    }
    this.colors = { red: "rgba(255, 0, 0)", blue: "blue", green: "green", yellow: "yellow" }
    this.shapes = props.shapes // shapes objs that belong to this canvas
    this.canvOffset = props.canvOffset  // the scroll position of this canvas
    this.animations = props.animations // animation objs that belong to this canvas
    this.canvasDidMount = false // bool turns true on first render

    this.draw   = this.draw.bind(this);
    this.resize = this.resize.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onCanvasDidMount = this.onCanvasDidMount.bind(this)
  }

  // change cursor pos when mouse moves over canvas container
  onMouseMove() {
    // console.log('watching mouse movements')
    this.container.addEventListener('mousemove', e => {
      this.mousePos.x = e.offsetX
      this.mousePos.y = e.offsetY /1.2
    })
    // console.log(this.mousePos)
  };

  // resize the canvas when it's container resizes
  resize() {
    this.container.addEventListener('resize',() => {
      this.width  = this.container.offsetWidth
      this.height = this.container.offsetHeight
    })
  };

  // returns bool that determines if scrolled to current canvas
  scrolledTo(pageOffset){
    const start = document.getElementsByClassName("main onepage-wrapper")[0].offsetHeight
    // if (pageOffset < -300 && pageOffset > -600) {return true}
    if (start / pageOffset === this.canvOffset) {return true}
    debugger
    if (start / pageOffset > -1 && this.canvOffset === 0) {return true}
  }

  // on first render, add event listeners
  onCanvasDidMount() {
    // this.onMouseMove()
    this.resize()
  }

  // set all objects that belong to this canvas to initial state
  resetObjects(){
    this.shapes.forEach( shape => {
      shape.reset();
    })
  }

  draw() {
    if (this.render === false) {return}
    if (this.canvasDidMount === false) {
      this.canvasDidMount = true;
      this.onCanvasDidMount()
    }
    this.ctx.clearRect(0, 0, this.width, this.height)
  }
}