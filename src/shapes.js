import Token from './token';
import Util from "./util";
import movingObject from "./animations/engine";

const shapes = ["square", "circle"];
const colors = ["LightCoral", "lightblue", "lightgreen", "lightyellow",
                "greenyellow,", "honeydew", "hotpink", "indianred", "indigo",]
const tokenWidth = 50;

const Shapes = (canvas, animationType) =>  {
  return {
    square: new movingObject({
      token: new Token({
        shape: shapes[0],
        color: colors[Util.getRandom(0, 3)],
        dimensions: [tokenWidth, tokenWidth, tokenWidth / 2], // [width, height, radius]
        position: [0, canvas.height - tokenWidth],  // [xStartPos, yStartPos]
        walls: [0, canvas.height, 0, canvas.width],  // [topW, botW, leftW, rightW]
        ctx: canvas.getContext('2d'),
        type: animationType,
        deltaX: 1.5, // horizontal delta
        deltaY: 0  // verticle delta
      })
    }),

    circle: new movingObject({
      token: new Token({
        shape: shapes[1],
        color: colors[Util.getRandom(0, 3)],
        dimensions: [tokenWidth + 50, tokenWidth, tokenWidth / 2], // [width, height, radius]
        position: [(canvas.width / 2.0), canvas.height / 3.0],  // [xStartPos - 1/2 * width, yStartPos - 1/2 * height]
        walls: [0, canvas.height, tokenWidth, canvas.width],  // [topW, botW, leftW, rightW]
        ctx: canvas.getContext('2d'),
        type: animationType,
        deltaX: 0, // horizontal delta
        deltaY: 2, // verticle delta
      })
    }),
  }
}

export default Shapes;