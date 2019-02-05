# Welcome to askCarl

Hi! This is the README for **askCarl**. askCarl is a Javascript app that displays complex CSS concepts as simple animations. The goal is to display how CSS can be used to achieve some of the most tried and true animation techniques on one's webpage.

Although traditionally animation techniques were meant for film animators, these tested strategies translate well to uesr's expectations of webpage componenet behavior. Scroll bouncing, gesture navigation, scroll-to-zoom being some prime examples.

The list of askCarl's animation is heavily inspired by the video **The Illusion of Life** [vimeo](https://vimeo.com/93206523)


# Functionalities

askCarl stores your files in your browser, which means all your files are automatically saved locally. askCarl is written in Javascript and HTML.

## Search

Type your CSS selector or question in the **Search** field, and Carl will fetch the most relevant results. You can select the one that most suits your needs.


# Libraries & technologies

**askCarl** doesn't make use of any libraries or technologies outside of Node JS for database management.

> **Note:** askCarl is very much a work in progress.


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

**Reach MVPs**
- [ ] Animations can be searched for
- [ ] Animations are interactive
- [ ] Animations can be altered by changing displayed code

# Architecture 

askCarl is a single-page app that loads a CSS animation as the users scrolls. After each animation loads, dsiplays, and ends, it atuomatically restarts after a small period of time. Some of the animations can be intearcted with by the user. 

The user can browse askCarl by simply scrolling up or down the page, or, when applicable, cliking and scrolling inside the animation canvas.

# Implementation timeline

2/06/19 

|      Date      |         Functionality         |      Details                |
|----------------|-------------------------------|-----------------------------|
|    2/06/19     |   Squash and stretch          |   Give the illusion of gravity, weight, mass and flexibility to element |
|    2/07/19     |   Anticipation                |   Give the illusion of predictable motion to element           |
|    2/08/19     |   Staging                     |   Guide the users's eye and draw attention to element in focus |
|    2/08/19     |   Pose to pose                |   Use pose-2-pose to give illusion of shape change to element  |