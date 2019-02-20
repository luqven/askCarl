// index JS file
import Util from "./util";
import Shapes from "./shapes";
import CardEvents from "./flipcards";
import { CanvasElement, CIRCLE, SQUARE, SQUARE2, SQUASH } from './canvas';
console.log('webpack is running...')


document.addEventListener("DOMContentLoaded", () => {

  // shim layer with setTimeout fallback based on work by Paul Irish
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
  const canvas4 = document.getElementById('canvas4');

  const flipcard0 = document.getElementById('fp00');
  const flipCard1 = document.getElementById('fp01');
  const flipcard2 = document.getElementById('fp02');
  const flipcard3 = document.getElementById('fp03');

  const cards = [flipcard0, flipCard1, flipcard2, flipcard3];
  const cardEvents = new CardEvents(cards);


  // add event listeners to cards
  cardEvents.mouseEnter();
  cardEvents.mouseLeave();

  // set shapes to render
  // animtaion01 shapes
  let square = new CanvasElement({
    target: canvas2,
    location: [270, 800],
    shapeType: SQUARE,
    container: 'a1',
  })
  // animation02 shapes
  let squash = new CanvasElement({
    target: canvas3,
    location: [801, 1200],
    shapeType: SQUASH,
    container: 'a2',
  })
  // animation03 shapes
  let square2 = new CanvasElement({
    target: canvas4,
    location: [1201, 1900],
    shapeType: SQUARE2,
    container: 'a3',
  })
  // store shapes in animations array
  var animations = [];
  animations.push(square);
  animations.push(squash);
  animations.push(square2);

  
  
  // render the shapes
  function draw() {
    window.requestAnimationFrame(draw)

    if (square.scrolledToElement() ){
      square.addClasses();
      square.render();
      squash.reset();
      square2.reset();
    } else if (squash.scrolledToElement() ){
      squash.addClasses()
      squash.render();
      square.reset();
      square2.reset();
    } else if (square2.scrolledToElement() ){
      squash.addClasses()
      square2.render();
      square.reset();
      squash.reset();
    }
  };
  window.requestAnimationFrame(draw);
});