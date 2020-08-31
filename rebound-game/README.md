# Notes on Mobile Game Programming

**Table of Contents:**

- [Notes on Mobile Game Programming](#notes-on-mobile-game-programming)
  - [Introduction](#introduction)
  - [Part 1: Button Chaser](#part-1-button-chaser)

## Introduction

- Nearly every computer program ever written accepts input from the user, processes that input in some way, produces some output, and provides feedback to the user. 
  - Game programming is no different. 
  - Games forces developers to examine code optimization for the best user experience, something all web developers should consider.
- Usually, game programs create event listeners that listen for user input via touch, the mouse, or keyboard, and a game loop that manages processing. 
  - Once launched, the game loop continues until it encounters some end condition. 
  - If end conditions aren't met, objects are rendered to the screen and the game continues. 
- In this project, the game will be simple, and called **Rebound**.
  - Rebound is a simple paddle and ball game where the player must keep the ball from reaching the bottom of the playing area. 
  - The score is reflected at the bottom of the playing area. As the game progresses, difficulty is increased by moving the ball more quickly. 
  - Rebound includes some simple collision detection routines to reward the player for using the middle of the paddle. (game buzzes) 
  - It also includes some basic sound effects and a background music track, and a settings panel lets players decide if they want to hear the sounds and start a new game. 

## Part 1: Button Chaser

* Before implementing all the features of the Rebound game, we need to add some tools to our toolset. 
  * You need to crawl before we can walk. 
  * Let's start by creating a simple game. 
* Button Chaser is a Whac-A-Mole type game where the player needs to tap a button on screen that is randomly placed. 
  * The button will move once per second, and the score is increased each time the button is tapped. 
  * The game ends after 30 seconds, and the player is informed that the game is over.