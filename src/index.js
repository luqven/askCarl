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
  // set the canvases
  const canvas1 = new Canvas({
    canvas: document.getElementById("canvas2"),
    container: document.getElementById("a1"),
    canvOffset: -2,
  })
  const canvas2 = new Canvas({
    canvas: document.getElementById("canvas3"),
    container: document.getElementById("a2"),
    canvOffset: -1,
  })
  const canvas3 = new Canvas({
    canvas: document.getElementById("canvas4"),
    container: document.getElementById("a3"),
    canvOffset: 0,
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

  // canvas1 shapes and animations
  const shape1 = new MovingObject({
    canvas: canvas1,
    x: 10,
    y: canvas1.height -125,
    radius: 40,
    width: 40,
    height: 40,
    color: canvas1.colors.red,
    opacity: 1.0,
    type: 'square',
    deltaX: 10,
    deltaY: 1,
  })
  const animation01 = new Engine({shape: shape1, canvas: canvas1})

  // canvas2 shapes and animations
  const shape3 = new MovingObject({
    canvas: canvas2,
    x: 10,
    y: canvas2.height - 131,
    radius: 40,
    width: 40,
    height: 40,
    color: canvas2.colors.yellow,
    opacity: 1.0,
    type: 'square',
    deltaX:  -7,
    deltaY: -19.1,
  })
  const animation02 = new Engine({ shape: shape3, canvas: canvas2 })

  // canvas3 shapes and animations
  const shape4 = new MovingObject({
    canvas: canvas3,
    x: 10,
    y: canvas3.height - 132,
    radius: 40,
    width: 40,
    height: 40,
    color: canvas2.colors.green,
    opacity: 1.0,
    type: 'square',
    deltaX: 10,
    deltaY: 1,
  })
  const shape5 = new MovingObject({
    canvas: canvas3,
    x: 223,
    y: 101.11,
    radius: 40,
    width: 40,
    height: 40,
    color: canvas2.colors.green,
    opacity: 1.0,
    type: 'square',
    deltaX: -2,
    deltaY: 2,
  })

  const animation03 = new Engine({ shape: shape4, canvas: canvas3 })
  const animation04 = new Engine({ shape: shape5, canvas: canvas3 })

  // store shapes and animations arrays in each canvas
  canvas1.shapes = [shape1]
  canvas1.animations = [animation01]
  canvas2.shapes = [shape3]
  canvas2.animations = [animation02]
  canvas3.shapes = [shape4, shape5]
  canvas3.animations = [animation03, animation04]

  const allCanvases = [canvas1, canvas2, canvas3]

  // render the shapes
  function draw() {
    window.requestAnimFrame(draw)
    const pageOffset = document.getElementsByClassName("main onepage-wrapper")[0].getBoundingClientRect()["top"]
    allCanvases.forEach( canvas => {
      if (canvas.scrolledTo(pageOffset) === true) {
        // debugger
        canvas.container.classList.toggle("hovered", true);
        canvas.draw();
        for (let i = 0; i < canvas.animations.length; i++) {
          let currentAnim = canvas.animations[i]
          for (let j = i + 1; j < canvas.animations.length; j++) {
            let nextAnim = canvas.animations[j]
            currentAnim.checkForCollisionWith(nextAnim)
          }
          currentAnim.render()
        }
      } else {
        canvas.container.classList.toggle("hovered", false);
        canvas.resetObjects();
      }
    })
  };
  window.requestAnimFrame(draw);
});