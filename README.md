# Welcome to askCarl
![home giph](https://media.giphy.com/media/43LhiFpDqLSXN2zE3a/giphy.gif)

Hi! This is the README for **askCarl**. askCarl is a Javascript app that displays complex Javascrpipt & CSS concepts as simple animations. The goal is to display how the two languages can be used to achieve some of the most tried and true animation techniques on one's webpage.

Although traditionally animation techniques were meant for film animators, these tested strategies translate well to uesr's expectations of webpage componenet behavior. Scroll bouncing, gesture navigation, scroll-to-zoom being some prime examples.

The list of askCarl's animation is heavily inspired by the video **The Illusion of Life** [vimeo](https://vimeo.com/93206523)

![interactivity giph](https://media.giphy.com/media/35B3R5c9bKy65umdjg/giphy.gif)

# Functionalities

askCarl stores your files in your browser, which means all your files are automatically saved locally. askCarl is written in Javascript and HTML.


# Libraries & technologies

**askCarl** makes use of:
- Vanilla Javascript for animation's logic
- HTML 5 for convas rendering
- NodeJS for dabaasse management

**Main Files**
![flipcard giph](https://media.giphy.com/media/3joSYfOKiWOlnTftbB/giphy.gif)
- ``home.js`` main structure of the canvas and webpage
- ``flipcards.js`` DOM events wrapper for canvas container cards
- ``canvas.js`` a custom HTMl Canvas class that handles a lot of rendering logic
- ``moving_object.js`` object that animations interact with (e.g. a square canvas element with speed, acc, size, etc., attributes)
- ``engine.js`` stores all the animation logic and applies it to moving_objects
- ``collision_math.js`` stores all the physiscs logic with additional comments and source documentaiton

# MVP Features

- [X] 4 CSS animations
- [X] Each animation restarts after a given period
- [X] Animations only load when scrolled to
- [X] Code for each animation can be displayed

**Reach Features**
- [ ] Animations can be searched for
- [ ] Animations are interactive
- [ ] Animations can be altered by changing displayed code
- [ ] Animation speed can be controlled by user

# Architecture 

askCarl is a single-page app that loads a CSS animation as the users scrolls. After each animation loads, dsiplays, and ends, it atuomatically restarts after a small period of time. Some of the animations can be intearcted with by the user. 

The user can browse askCarl by simply scrolling up or down the page, or, when applicable, cliking and scrolling inside the animation canvas.

# Implementation timeline

2/06/19 

|      Date      |         Functionality         |      Details                |
|----------------|-------------------------------|-----------------------------|
|    2/06/19     |   Setup                       |   Style and populate home page with at least one canvas placeholder |
|    2/07/19     |   Squash and stretch          |   Give the illusion of gravity, weight, mass and flexibility to element |
|    2/08/19     |   Anticipation                |   Give the illusion of predictable motion to element           |
|    2/11/19     |   Tags                        |   Add tags to all animations                                   |
|    2/12/19     |   Search                      |   Make tags searchable                                         |
|    2/13/19     |   Details                     |   Add links to GitHub, linkedIn, etc                           |
