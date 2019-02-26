// index JS file
import Util from "./util";
import Canvas from './canvas';
import {MovingObject} from "./moving_object";
import CardEvents from "./flipcards";
import Engine from "./animations/engine"
// helper scroll library
import {onePageScroll} from "./onepage_scroll_helper/onepagescroll";

document.addEventListener("DOMContentLoaded", () => {
  console.log('webpack is running...')
  console.log("DOM fully loaded and parsed");
  window.requestAnimFrame = Util.requestAnimFrame;

  // store the canvases
  const canvas1 = new Canvas({
    canvas: document.getElementById("canvas2"),
    container: document.getElementById("a1")
  })
  // store the flipCards
  const flipcard0 = document.getElementById('fp00');
  const flipCard1 = document.getElementById('fp01');
  const flipcard2 = document.getElementById('fp02');
  const flipcard3 = document.getElementById('fp03');
  const cards = [flipcard0, flipCard1, flipcard2, flipcard3];
  const cardEvents = new CardEvents(cards);

  // add event listeners to cards
  cardEvents.mouseClick();

  // set shapes to render
  // animtaion01 shapes
  const shape1 = new MovingObject({
    canvas: canvas1,
    x: 20,
    y: canvas1.height / 1.5,
    radius: 40,
    width: 40,
    height: 40,
    color: canvas1.colors.red,
    type: 'square',
    deltaX: 10,
    deltaY: 1,
  })
  const animation01 = new Engine({shape: shape1, canvas: canvas1})
  // animation02 shapes
  // animation03 shapes
  // store shapes in animations array
  var animations = [shape1];

  
  
  // render the shapes
  function draw() {
    window.requestAnimFrame(draw)
    const pageOffset = document.getElementsByClassName("main onepage-wrapper")[0].getBoundingClientRect()["top"]
    if (canvas1.scrolledTo(pageOffset) === true) {
      canvas1.container.classList.toggle("hovered", true);
      animation01.render();
    } else {
      canvas1.container.classList.toggle("hovered", false);
    }
  };
  window.requestAnimFrame(draw);
});