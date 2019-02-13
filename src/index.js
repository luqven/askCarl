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

  // const animation1Container = document.getElementById('a1');
  // const animation2Container = document.getElementById('a2');

  const canvas2 = document.getElementById('canvas2');
  const canvas3 = document.getElementById('canvas3');

  const flipCard1 = document.getElementById('fp01');
  const flipcard2 = document.getElementById('fp02');

  const cards = [flipCard1, flipcard2];
  const cardEvents = new CardEvents(cards);


  // add event listeners to cards
  cardEvents.mouseEnter();
  cardEvents.mouseLeave();


  var animations = [];

  // set shapes to render
  // let squash = Shapes(canvas3, 'bounce').squash;

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
  animations.push(square);
  animations.push(squash);
  
  // render the shapes
  // console.log(square);
  function draw() {
    // console.log(animations);
    window.requestAnimationFrame(draw)
    // canvas2.getContext('2d').clearRect(0, 0, canvas2.width, canvas2.height);
    // canvas3.getContext('2d').clearRect(0, 0, canvas3.width, canvas3.height);

    if (square.scrolledToElement() ){
      square.addClasses();
      square.render();
      squash.reset();
    } else if (squash.scrolledToElement() ){
      squash.addClasses()
      squash.render();
      square.reset();
    }

    // // add hover efect when scrolled to specific animation
    // if (window.pageYOffset > 270 && window.pageYOffset < 800) {
    //   squash = Shapes(canvas3, 'bounce').squash; // reset squash animation
    //   // animation1Container.classList.add('hovered')
    //   animation2Container.classList = ('hover-card-container')
    //   // square.render();
    // } 
    // if (window.pageYOffset > 820) {
    //   // square = Shapes(canvas2, 'bounce').square; // reset square animation
    //   animation2Container.classList.add('hovered')
    //   squash.render();
    //   // animation1Container.classList = ("hover-card-container card-face frontface2")
    // }

    // if (window.pageYOffset < 169) {
    //   animation2Container.classList = ('hover-card-container')
    //   // animation1Container.classList = ("hover-card-container card-face frontface2")
    //   squash = Shapes(canvas3, 'bounce').squash; // reset squash animation
    //   // square = Shapes(canvas2, 'bounce').square; // reset square animation
    // }
  };
  window.requestAnimationFrame(draw);
});