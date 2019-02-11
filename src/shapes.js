import Token from './token';
import Util from "./util";
import Squash from "./animations/squash";

const shapes = ["square", "circle"];
const colors = ["LightCoral", "lightblue", "lightgreen", "lightyellow",
                "greenyellow,", "honeydew", "hotpink", "indianred", "indigo",]
const tokenWidth = 50;

const Shapes = (canvas) =>  {
  return {
    square: new Squash({
      token: new Token({
        shape: shapes[0],
        color: colors[Util.getRandom(0, 3)],
        dimensions: [tokenWidth, tokenWidth, tokenWidth / 2], // [width, height, radius]
        position: [(canvas.width / 2.0) - (tokenWidth / 2.0), canvas.height / 4.0],  // [xStartPos - 1/2 * width, yStartPos - 1/2 * height]
        walls: [0, canvas.height, 0, canvas.width],  // [topW, botW, leftW, rightW]
        ctx: canvas.getContext('2d'),
      })
    }),

    circle: new Squash({
      token: new Token({
        shape: shapes[1],
        color: colors[Util.getRandom(0, 3)],
        dimensions: [tokenWidth + 50, tokenWidth, tokenWidth / 2], // [width, height, radius]
        position: [(canvas.width / 2.0), canvas.height / 3.0],  // [xStartPos - 1/2 * width, yStartPos - 1/2 * height]
        walls: [0, canvas.height, 0, canvas.width],  // [topW, botW, leftW, rightW]
        ctx: canvas.getContext('2d'),
      })
    }),
  }
}

export default Shapes;