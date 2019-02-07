// index JS file
import Util from "./util";
import Token from './token';
import Animations from './animations/animations';
console.log('webpack is running...')


document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  const canvas = document.getElementById('canvas');
  const token = new Token({
    shape: "square",
    color: "lightblue",
    dimensions: [50, 50],
    position: [canvas.width / 2 - 20, canvas.height / 2 ],
    walls: [0, canvas.height - 50, 0, canvas.width],
    ctx: canvas.getContext('2d'),
  })

  let animations = new Animations({
    token: token
  })

  animations.render()
});