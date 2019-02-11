// index JS file
import Shapes from "./shapes";
console.log('webpack is running...')


document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  const canvas = document.getElementById('canvas');
  const canvas2 = document.getElementById('canvas2');
  var animations = [];

  // set shapes to render
  let square = Shapes(canvas2, 'slide').square;
  let circle = Shapes(canvas, 'bounce').circle;
  // add shapes to animations array
  animations.push(square);
  animations.push(circle);
  // render the shapes
  
  function render() {
    console.log(animations);
    var bouncing = setInterval(() => {
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      canvas2.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      animations.forEach((animation) => {
        animation.render()
        if (animation.over) {clearInterval(bouncing);}
      })}, 20);
    bouncing;
    };
  render();
});