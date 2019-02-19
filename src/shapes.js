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
    // walls: [0, canvas.height, 0, canvas.width],  // [topW, botW, leftW, rightW]
    walls: [[0, 0], [0, canvas.height + 10], [0, 0], [canvas.width, 0]],  // [topW, botW, leftW, rightW]
    ctx: canvas.getContext('2d'),
    type: animationType,
    deltaX: 20, // horizontal delta
    deltaY: 0  // verticle delta
  }

  const circleDefaults = {
    shape: shapes[1], // circle
    color: colors[1],
    dimensions: [tokenWidth / 2, tokenWidth / 2, tokenWidth / 2], // [width, height, radius]
    position: [(canvas.width / 2.0), canvas.height / 3.0],  // [xStartPos - 1/2 * width, yStartPos - 1/2 * height]
    // walls: [0, canvas.height, 0, canvas.width],  // [topW, botW, leftW, rightW]
    walls: [[0, 0], [0, canvas.height + 10], [0, 0], [canvas.width, 0]],  // [topW, botW, leftW, rightW]
    ctx: canvas.getContext('2d'),
    type: animationType,
    deltaX: 20, // horizontal delta
    deltaY: 2, // verticle delta
  }

  const squashAndStretchDefalts = {
    shape: shapes[0], // squaere
    color: colors[3],
    dimensions: [tokenWidth, tokenWidth, tokenWidth / 2], // [width, height, radius]
    position: [ 10, canvas.height - 90],  // [xStartPos - 1/2 * width, yStartPos - 1/2 * height]
    // walls: [0, canvas.height, 0, canvas.width],  // [topW, botW, leftW, rightW]
    walls: [[0, 0], [0, canvas.height + 10],[0, 0], [canvas.width, 0]],  // [topW, botW, leftW, rightW]
    ctx: canvas.getContext('2d'),
    type: animationType,
    deltaX: 2.9 * Math.PI, // horizontal delta
    deltaY: -13.9, // verticle delta
  }

  const secondSquareDefault = {
    shape: shapes[0], // squaere
    color: colors[2],
    dimensions: [tokenWidth, tokenWidth, tokenWidth / 2], // [width, height, radius]
    position: [ 10, canvas.height - 170],  // [xStartPos - 1/2 * width, yStartPos - 1/2 * height]
    // walls: [0, canvas.height, 0, canvas.width],  // [topW, botW, leftW, rightW]
    walls: [[0, 0], [0, canvas.height + 10],[0, 0], [canvas.width, 0]],  // [topW, botW, leftW, rightW]
    ctx: canvas.getContext('2d'),
    type: animationType,
    deltaX: 0, // horizontal delta
    deltaY: 0, // verticle delta
  }

  return {
    square: new movingObject({
      token: new Token(squareDefaults)
    }),

    circle: new movingObject({
      token: new Token(circleDefaults)
    }),

    squash: new movingObject({
      token: new Token(squashAndStretchDefalts)
    }),

    secondary: new movingObject({
      token: new Token(secondSquareDefault)
    }),
    circleDeafault: circleDefaults,
    squareDefault: squareDefaults,
    squashDefault: squashAndStretchDefalts,
    secondSquareDefault: secondSquareDefault,
  }
}

export default Shapes;