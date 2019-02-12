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
  const canvas3 = document.getElementById('canvas3');
  const canvas2 = document.getElementById('canvas2');
  // var animations = [];

  // set shapes to render
  let square = Shapes(canvas2, 'bounce').square;
  let circle = Shapes(canvas3, 'bounce').circle;
  // add shapes to animations array
  // animations.push(square);
  // animations.push(circle);
  // render the shapes
  console.log(square);
  function draw() {
    // console.log(animations);
    window.requestAnimationFrame(draw)
    canvas3.getContext('2d').clearRect(0, 0, canvas3.width, canvas3.height);
    canvas2.getContext('2d').clearRect(0, 0, canvas2.width, canvas2.height);

    // add hover efect when scrolled to specific animation
    if (window.pageYOffset > 270 && window.pageYOffset < 1000) {
      circle = Shapes(canvas3, 'bounce').circle; // reset circle animation
      animation1Container.classList.add('hovered')
      animation0Container.classList = ('hover-card-container')
      square.render();
    } 
    if (window.pageYOffset > 1000) {
      square = Shapes(canvas2, 'bounce').square; // reset square animation
      animation0Container.classList.add('hovered')
      circle.render();
      animation1Container.classList = ('hover-card-container')
    }

    if (window.pageYOffset < 169) {
      animation0Container.classList = ('hover-card-container')
      animation1Container.classList = ('hover-card-container')
      circle = Shapes(canvas3, 'bounce').circle; // reset circle animation
      square = Shapes(canvas2, 'bounce').square; // reset square animation
    }
  };
  window.requestAnimationFrame(draw);
});