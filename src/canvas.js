import Shapes from "./shapes";

export const SQUARE = 'SQUARE';
export const CIRCLE = 'CIRCLE';
export const SQUASH = 'SQUASH';
export const SQUARE2 = 'SQUARE2';

export class CanvasElement {
  // canvasObject = { target: canvasEle, loc: [yOffsetMin, yOffsetMax], shape: 'shape', container: 'id' }
  constructor(canvasObject) {
    this.target= canvasObject.target;
    this.elementContainer = document.getElementById(canvasObject.container);
    this.yOffsetMin = canvasObject.location[0];
    this.yOffsetMax = canvasObject.location[1];
    this.shapeType = canvasObject.shapeType;
    this.shape = this.setShape();
    this.newClasses = "hovered";
    this.initalClasses = "hover-card-container"
  };

  setShape() {
    // debugger
    if (this.shapeType === SQUARE ) {
      this.shape = Shapes(this.target, 'bounce').square
    }
    // if (this.shapeType === CIRCLE){
    //   this.shape = Shapes(this.target, 'bounce').circle
    // }
    if (this.shapeType === SQUASH) {
      this.shape = Shapes(this.target, 'bounce').squash;
    }
    if (this.shapeType === SQUARE2) {
      this.shape = Shapes(this.target, 'bounce').secondary
    }
  }

  reset() {
    this.elementContainer.classList = this.initalClasses;
    this.shape = this.setShape();
  };

  addClasses() {
    this.elementContainer.classList.add(this.newClasses);
  };

  scrolledToElement(){
    return (window.pageYOffset >= this.yOffsetMin && window.pageYOffset <= this.yOffsetMax);
  }

  render() {
    if (this.shape === undefined) { this.setShape(); }
    this.target.getContext('2d').clearRect(0, 0, this.target.width, this.target.height);
    this.shape.render();
  };
};