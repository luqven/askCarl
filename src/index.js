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
  const animation0Container = document.getElementById('a0');
  const animation1Container = document.getElementById('a1');
  const canvas = document.getElementById('canvas');
  const canvas2 = document.getElementById('canvas2');
  var animations = [];

  // set shapes to render
  let square = Shapes(canvas2, 'bounce').square;
  let circle = Shapes(canvas, 'bounce').circle;
  // add shapes to animations array
  // animations.push(square);
  // animations.push(circle);
  // render the shapes
  console.log(square);
  function draw() {
    // console.log(animations);
    window.requestAnimationFrame(draw)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    canvas2.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

    // add hover efect when scrolled to specific animation
    if (window.pageYOffset > 270) {
      circle = Shapes(canvas, 'bounce').circle; // reset circle animation
      animation1Container.classList.add('hovered')
      animation0Container.classList = ('hover-card-container')
      square.render();
    } else if (window.pageYOffset < 270) {
      square = Shapes(canvas2, 'bounce').square; // reset square animation
      animation0Container.classList.add('hovered')
      circle.render();
      animation1Container.classList = ('hover-card-container')
    }
  };
  window.requestAnimationFrame(draw);
});