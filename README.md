# Welcome to askCarl

Hi! This is the README for **askCarl**. askCarl is a Javascript app that displays complex Javascrpipt & CSS concepts as simple animations. The goal is to display how the two languages can be used to achieve some of the most tried and true animation techniques on one's webpage.

Although traditionally animation techniques were meant for film animators, these tested strategies translate well to uesr's expectations of webpage componenet behavior. Scroll bouncing, gesture navigation, scroll-to-zoom being some prime examples.

The list of askCarl's animation is heavily inspired by the video **The Illusion of Life** [vimeo](https://vimeo.com/93206523)


# Functionalities

askCarl stores your files in your browser, which means all your files are automatically saved locally. askCarl is written in Javascript and HTML.

## Search

Type your CSS selector or question in the **Search** field, and Carl will fetch the most relevant results. You can select the one that most suits your needs.


# Libraries & technologies

**askCarl** makes use of:
- Vanilla Javascript for animation's logic
- HTML 5 for convas rendering
- NodeJS for dabaasse management

**Main Files**

- ``home.js`` main structure of the canvas and webpage
- ``token.js`` class object that animations interact with (e.g. a square canvas element with speed, acc, size, etc., attributes)
- ``animations.js`` stores all the animation logic
  - ``squash.js`` animation logic for squash
  - ``anticipation.js`` animation file
  - ``staging.js`` animation file
  - ``pose.js`` animation file
- ``physics.js`` stores all the physiscs logic
  - ``moveBy.js`` logic for moving in x, y, z coordinates
  - ``transformTo.js`` logic for changing shape in x, y, z directions
  - ``acceleration.js`` logic for movement speed
  - ``collision.js`` logic for detecting edges of the canvas
- ``search.js`` stores the search functionality logic



## DB Schema

SmartyPants converts ASCII punctuation characters into "smart" typographic punctuation HTML entities. For example:

|   Column Name  |         Data Type             |      Details                |
|----------------|-------------------------------|-----------------------------|
|   topicTags    |         `'string'`            |   Title of topic covered    |   
|   cssTopic     |         `'string'`            |   Title of topic covered    |

# MVP Features

- [ ] 4 CSS animations
- [ ] Each animation restarts after a given period
- [ ] Animations only load when scrolled to
- [ ] Code for each animation can be displayed

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
|    2/09/19     |   Staging                     |   Guide the users's eye and draw attention to element in focus |
|    2/10/19     |   Pose to pose                |   Use pose-2-pose to give illusion of shape change to element  |
|    2/11/19     |   Tags                        |   Add tags to all animations                                   |
|    2/12/19     |   Search                      |   Make tags searchable                                         |
|    2/13/19     |   Details                     |   Add links to GitHub, linkedIn, etc                           |