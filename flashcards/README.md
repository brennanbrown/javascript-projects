# Notes on Biding and Propagation

**Table of Contents:**

- [Notes on Biding and Propagation](#notes-on-biding-and-propagation)
  - [Prototype in JavaScript](#prototype-in-javascript)
    - [Planning the Application](#planning-the-application)
    - [Pseduocode](#pseduocode)
    - [Immediately invoked function expression](#immediately-invoked-function-expression)
  - [Dynamic Elements](#dynamic-elements)

## Prototype in JavaScript

### Planning the Application

- Think about a card game for a minute. What are it's objects?
  - First of all, there is a game and a game has a deck and a discard pile, which would be attributes, specifically objects.
    - You can play the game, which would be a function like `play()`.
  - The discardPile object/attribute itself probably has a Rules array, and maybe even a maximum card number.
    - There's also a function for card drag over, `cardDragOver()`.
  - There's a deck and decks have a list of suits and values.
    - For a deck, you would want to shuffle and stack it, `shuffle()` and `stack()`.
  - Decks have cards and there are single suits and values.
    - And for the card itself, we're going to want to flip, drag and drop it, `cardFlip()`, `cardDrag()`, and `cardDrop()`.
  - Specific instances of different card games might have modified attributes or functions.
    - FlashCards, for example would have no rules. And a game like Hearts would also require score.
    - Additionally, games like Solitaire and Hearts would require a standard deck with suits and numbers, whereas FlashCards wouldn't.
- You could imagine if we were building these objects with code, we may want to reuse them. And that's where prototypes come in.
  - Prototype is something available to all objects.
  - And just like any prototype, it's a way of making a plan for an object so that we can reproduce it.
  - Once created, you can use a protoype as many times as you want to create something as needed.

Prototypes Examples:

```javascript

// Object Instance w/o Prototype:
var person = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue
}

// Object Instance w/ Prototype:
let person = new Object();
person.firstName = "John";
person.lastName = "Doe";
person.age = 50;
person.eyeColor = "blue";

// Constuctor Function:
function Person(first, last, age, eye) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eye;
}

// Multiple Instances:
var John = new Person("John", "Doe", "33", "blue");
var Jane = new Person("Jane", "Doe", "43", "green");
```

### Pseduocode

- Sketching out and pseudo coding your application is a great way to get organized before you start.
- If your original plan changes and you have to update your pseudo code, it's a good indicator that you've pivoted on your idea or that something may take more time than you originally thought.
- You can then save it as comments to reference it as we build your objects.

```javascript
/*
Game
    Info Section
    Deck
    Discard Pile
    Rules

Deck
    Cards
    -----
    shuffle()
    stack()

Cards
    val
    suit
    ----
    flip()

Discard Pile
    Holders
    -------
    AcceptOrReject()
*/
```

### Immediately invoked function expression

- An IIFE function, or an immediately invoked function expression can be defined as wrapping code in a function and immediately running it, the internal variables are unavailable to the outside keeping our variables safe.
  - This avoids pollutiing the global namespace.
- Note: Start the code with a `;` just in case this is is ever minimized and the proceeding code doesn't end with a `;`.
- Starting off with the `Game` function, two parameters will be passed through, `el` and `option`.
  - The element is going to be the element you're going to drop the game into, and options is going to tell us what game you want to play.
- You're going to want to make our game element available on the window.
  - In the immediately invoked function, pass in the window as a parameter. In both the initial function and the anonymous function on the inside.
  - This means that when you attach that to the window object, say `window.Game = Game;` the game object is available.
- Within `index.html`, directly call an anonymous function to start the game, `var myGame = new Game("game_div", {game: "flashcard", data: flashcard_QA});`
  - The parameters being `"game_div"`, which is the `<div>` where the game will be displayed on the page, followed by the game data.

```javascript
(function (window) {
  // Game
  var Game = function (el, option) {};
  window.Game = Game;
})(window);
```

## Dynamic Elements

- Dynamic elements are ordinary HTML elements built and added by JavaScript, rather than being directly written within the HTML file.
- When do you assign something to a variable and when should you attach it to your object?
  - Eg. `div.className = "x"` being inside `var Object = {}` or outside of it.
  - Typically the idea is not to expose something until you really need to.

```javascript
// Dynamically creating new HTML on the page:
this.info_div = document.createElement("div");
this.info_div.id = "info_div";
this.deck_div = document.createElement("div");
this.deck_div.id = "deck_div";

// Append these new dics to the main element:
this.el.appendChild(this.info_div);
this.el.appendChild(this.deck_div);
```

- With a standard deck there are 52 cards, and rather than appending each to the page, we'll be using a document fragment.
  - Eg. `s`
  - Document fragments allow us to build out divs off dom and then append them to the body once they're all collected.
  - Each time you modify the DOM, it forces a redraw. And this might not matter with one or two divs, but with 52 cards, that would be a lot.
