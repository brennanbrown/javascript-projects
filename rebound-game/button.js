let score = 0;
let iterations = 0;
let aWidth;
let aHeight;
let timer;

// Executes after all of the resources for the page are downloaded.
window.addEventListener("load", setGameAreaBounds);

function setGameAreaBounds() {
    aWidth = innerWidth;
    aHeight = innerHeight;
    // Taking other element sizes into account:
    aWidth -= 22;
    aHeight -= 97;

    document.getElementById("game-area").style.width = aWidth + 'px';
    document.getElementById("game-area").style.height = aHeight + 'px';
    document.getElementById("dot").addEventListener("click", detectHit);

    // Make sure the dot stays within the
    // right and bottom of the gaming area:
    aWidth -= 74;
    aHeight -= 74;

    moveDot();

}

function detectHit() {
    score += 1;
    document.getElementById("score-label").innerHTML = "Score: " + score;
}

function moveDot() {


    // Allowing the dot to appear randomly
    // within the available area:
    let x = Math.floor(Math.random() * aWidth);
    let y = Math.floor(Math.random() * aHeight);

    // Make sure the dot stays within the
    // left and top of the gaming area:
    if (x < 10) {
        x = 10;
    }
    if (y < 10) {
        y = 10;
    }

    document.getElementById("dot").style.left = x + "px";
    document.getElementById("dot").style.top = y + "px";

    // Note: Not recursive, setTimeout returns 
    // immediately and tells the browser to wait 
    // the specified delay, and then execute the code.
    if (iterations < 10) {
        timer = setTimeout("moveDot()", 1000);
    } else {
        // Ending the game and disabling functionality:
        document.getElementById("score-label").innerHTML += " Game Over!";
        document.getElementById("dot").removeEventListener("click", detectHit);
        clearTimeout(timer);
    }

    iterations++;
}