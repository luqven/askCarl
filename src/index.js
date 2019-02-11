// index JS file
import Shapes from "./shapes";
console.log('webpack is running...')


document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  const canvas = document.getElementById('canvas');
  var animations = [];

  // set shapes to render
  let square = Shapes(canvas).square;
  let circle = Shapes(canvas).circle;
  // add shapes to animations array
  animations.push(square);
  animations.push(circle);
  // render the shapes
  
  function render() {
    console.log(animations);
    setInterval(() => {
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      animations.forEach((animation) => {
        animation.bounce()
      })}, 20);
    };
  render();
});