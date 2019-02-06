// index JS file
import Util from "./util";
import Token from './token';
import Animations from './animations/animations';
console.log('webpack is running...')


document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  const token = new Token({
    shape: "square",
    color: "lightblue",
    height: 50,
    width: 50,
    zPos: 0,
    xPos: 125,
    yPos: 150,
    ctx: document.getElementById('canvas')
  })
  let animations = new Animations({
    token: token,
  })

  animations.render()
});