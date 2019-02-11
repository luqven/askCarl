// index JS file
import Util from "./util";
import Shapes from "./shapes";
console.log('webpack is running...')


document.addEventListener("DOMContentLoaded", () => {

  // shim layer with setTimeout fallback by  Paul Irish
  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  console.log("DOM fully loaded and parsed");
  const canvas = document.getElementById('canvas');
  const canvas2 = document.getElementById('canvas2');
  var animations = [];

  // set shapes to render
  let square = Shapes(canvas2, 'bounce').square;
  let circle = Shapes(canvas, 'bounce').circle;
  // add shapes to animations array
  animations.push(square);
  animations.push(circle);
  // render the shapes
  console.log(square);
  function render() {
    // console.log(animations);
    window.requestAnimationFrame(render)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    canvas2.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

    animations.forEach((animation) => {
      animation.render()
    })
  };
  window.requestAnimationFrame(render);
});