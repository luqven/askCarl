// index JS file
import Util from "./util";
import Token from './token';
import Animations from './animations/animations';
console.log('webpack is running...')


document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  const canvas = document.getElementById('canvas');
  const shapes = ["square", "circle"];
  const colors = ["lightred", "lightblue", "lightgreen", "lightyellow"]
  var animations = [];

  document.addEventListener('click', ()=> {
    console.log('clicked!')
    let dims = Util.getRandom(10, 50);

    const token = new Token({
      shape: shapes[Util.getRandom(0, 1)],
      color: colors[Util.getRandom(0, 3)],
      dimensions: [dims, dims], // [width, height]
      position: [Util.getRandom(25, canvas.width / 3), Util.getRandom(25, canvas.height / 3)],  // [xStartPos - 1/2 * width, yStartPos - 1/2 * height]
      walls: [0, canvas.height, 0, canvas.width],  // [topW, botW, leftW, rightW]
      ctx: canvas.getContext('2d'),
    })

    let animation = new Animations({
      token: token
    })
    animations.push(animation);

    animations.forEach(animation => {
      console.log(animation)
      animation.render();
    });
  })
});