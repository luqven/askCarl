import Token from './token';
import Util from "./util";
import movingObject from "./animations/engine";

const shapes = ["square", "circle"];
const colors = ["#EA4335", "lightblue", "lightgreen", "#FBBC05",
                "greenyellow,", "honeydew", "hotpink", "indianred", "indigo",]
const tokenWidth = 50;

const Shapes = (canvas, animationType) =>  {

  const squareDefaults = {
    shape: shapes[0], // square
    color: colors[0],
    dimensions: [tokenWidth, tokenWidth, tokenWidth / 2], // [width, height, radius]
    position: [0, canvas.height - tokenWidth],  // [xStartPos, yStartPos]
    walls: [[0, 0], [0, canvas.height], [0, 0], [canvas.width, 0]],  // [topW, botW, leftW, rightW]
    ctx: canvas.getContext('2d'),
    type: animationType,
    deltaX: 20, // horizontal delta
    deltaY:  0,  // vertical delta
  }

  const circleDefaults = {
    shape: shapes[1], // circle
    color: colors[1],
    dimensions: [tokenWidth / 2, tokenWidth / 2, tokenWidth / 2], // [width, height, radius]
    position: [(canvas.width / 2.0), canvas.height / 3.0],  // [xStartPos - 1/2 * width, yStartPos - 1/2 * height]
    walls: [[0, 0], [0, canvas.height], [0, 0], [canvas.width, 0]],  // [topW, botW, leftW, rightW]
    ctx: canvas.getContext('2d'),
    type: animationType,
    deltaX: 20, // horizontal delta
    deltaY: 0, // vertical delta
  }

  const squashAndStretchDefaults = {
    shape: shapes[0], // square
    color: colors[3],
    dimensions: [tokenWidth, tokenWidth, tokenWidth / 2], // [width, height, radius]
    position: [0, canvas.height - tokenWidth],  // [xStartPos, yStartPos]
    walls: [[0, 0], [0, canvas.height - 1], [0, 0], [canvas.width, 0]],  // [topW, botW, leftW, rightW]
    ctx: canvas.getContext('2d'),
    type: animationType,
    deltaX: 9, // horizontal delta
    deltaY: -17,  // vertical delta
  }

  const secondSquareDefault = {
    shape: shapes[0], // square
    color: colors[2],
    dimensions: [tokenWidth, tokenWidth, tokenWidth / 2], // [width, height, radius]
    position: [ 10, canvas.height - 170],  // [xStartPos, yStartPos]
    walls: [[0, 0], [0, canvas.height],[0, 0], [canvas.width, 0]],  // [topW, botW, leftW, rightW]
    ctx: canvas.getContext('2d'),
    type: animationType,
    deltaX: 0, // horizontal delta
    deltaY: 0, // vertical delta
  }

  return {
    square: new movingObject({
      token: new Token(squareDefaults)
    }),

    circle: new movingObject({
      token: new Token(circleDefaults)
    }),

    squash: new movingObject({
      token: new Token(squashAndStretchDefaults)
    }),

    secondary: new movingObject({
      token: new Token(secondSquareDefault)
    }),
    circleDefaults: circleDefaults,
    squareDefault: squareDefaults,
    squashDefault: squashAndStretchDefaults,
    secondSquareDefault: secondSquareDefault,
  }
}

export default Shapes;