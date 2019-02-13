// index JS file
import Util from "./util";
import Shapes from "./shapes";
import CardEvents from "./flipcards";
import { CanvasElement, CIRCLE, SQUARE, SQUASH } from './canvas';
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

  const canvas2 = document.getElementById('canvas2');
  const canvas3 = document.getElementById('canvas3');

  const flipCard1 = document.getElementById('fp01');
  const flipcard2 = document.getElementById('fp02');

  const cards = [flipCard1, flipcard2];
  const cardEvents = new CardEvents(cards);


  // add event listeners to cards
  cardEvents.mouseEnter();
  cardEvents.mouseLeave();

  // set shapes to render
  let square = new CanvasElement({
    target: canvas2,
    location: [270, 800],
    shapeType: SQUARE,
    container: 'a1',
  })
  let squash = new CanvasElement({
    target: canvas3,
    location: [801, 1230],
    shapeType: SQUASH,
    container: 'a2',
  })

  // store shapes in animations array
  var animations = [];
  animations.push(square);
  animations.push(squash);
  
  // render the shapes
  function draw() {
    window.requestAnimationFrame(draw)

    if (square.scrolledToElement() ){
      square.addClasses();
      square.render();
      squash.reset();
    } else if (squash.scrolledToElement() ){
      squash.addClasses()
      squash.render();
      square.reset();
    }
  };
  window.requestAnimationFrame(draw);
});