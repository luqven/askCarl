// index JS file
import Util from "./util";
import Token from './token';
import Squash from "./animations/squash";
console.log('webpack is running...')


document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  const canvas = document.getElementById('canvas');
  const shapes = ["square", "circle"];
  const colors = ["LightCoral", "lightblue", "lightgreen", "lightyellow"]
  var animations = [];

  // document.addEventListener('click', ()=> {
    // console.log('clicked!')
    const tokenWidth = 50;
    let animation = new Squash({
      token: new Token({
        shape: shapes[Util.getRandom(0, 1)],
        color: colors[Util.getRandom(0, 3)],
        dimensions: [tokenWidth, tokenWidth], // [width, height]
        position: [(canvas.width / 2.0) - (tokenWidth / 2.0) , canvas.height / 4.0],  // [xStartPos - 1/2 * width, yStartPos - 1/2 * height]
        walls: [0, canvas.height, 0, canvas.width],  // [topW, botW, leftW, rightW]
        ctx: canvas.getContext('2d'),
      })
    })
    animations.push(animation);
    render();
  // });
  function render() {
    console.log(animations);
    setInterval(() => {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    animations.forEach((animation) => {
      animation.render()
    })}, 20);
  };
  render();
});