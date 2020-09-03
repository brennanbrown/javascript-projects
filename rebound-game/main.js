let ball,
    paddle,
    score,
    timer,
    playingArea;

let aWidth,
    aHeight,
    pWidth,
    pHeight;

let gear,
    controls,
    newButton,
    difficultySelect,
    doneButton,
    snd,
    music;

let dx = 2;
let dy = 2;
let pdx = 48;
let currentScore = 0;
let paddleLeft = 228;
let ballLeft = 100;
let ballTop = 8;

let drag = false;
let sndEnabled = false;
let musicEnabled = false;

let beepX,
    beepY,
    beepPaddle,
    beepGameOver,
    bgMusic;

window.addEventListener("load", init);
window.addEventListener("resize", init);

function init() {
    ball = document.getElementById("ball");
    paddle = document.getElementById("paddle");
    score = document.getElementById("score");
    playingArea = document.getElementById("playing-area");

    gear = document.getElementById("gear");
    controls = document.getElementById("controls");
    newButton = document.getElementById("new");
    difficultySelect = document.getElementById("difficulty");
    doneButton = document.getElementById("done");

    snd = document.getElementById("snd");
    music = document.getElementById("music");

    layoutPage();
    document.addEventListener("keydown", keyListener, false);

    playingArea.addEventListener("mousedown", mouseDown, false);
    playingArea.addEventListener("mousemove", mouseMove, false);
    playingArea.addEventListener("mouseup", mouseUp, false);

    playingArea.addEventListener("touchstart", mouseDown, false);
    playingArea.addEventListener("touchmove", mouseMove, false);
    playingArea.addEventListener("touchend", mouseUp, false);

    gear.addEventListener("click", showSettings, false);
    newButton.addEventListener("click", newGame, false);
    doneButton.addEventListener("click", hideSettings, false);
    difficultySelect.addEventListener("click", function() {
        selectDifficulty(difficultySelect.selectedIndex)
        }, false);

    snd.addEventListener("click", toggleSound, false);
    music.addEventListener("click", toggleMusic, false);

    timer = requestAnimationFrame(start);
}

function layoutPage() {
    aWidth = innerWidth;
    aHeight = innerHeight;
    pWidth = aWidth - 22;
    pHeight = aHeight - 22;
    playingArea.style.width = pWidth + "px";
    playingArea.style.height = pHeight + "px";
}

function keyListener(e) {
    let key = e.keyCode;
    if((key == 37 || key== 65) && paddleLeft > 0) {
        paddleLeft -= pdx;
        if(paddleLeft < 0)
            paddleLeft = 0;
    } else if((key == 39 || key == 68) && paddleLeft < pWidth - 64) {
        paddleLeft += pdx;
        if(paddleLeft > (pWidth - 64))
            paddleLeft = pWidth - 64;
    }
    paddle.style.left = paddleLeft + "px";
}

function start() {
    render();
    detectCollisions();
    difficulty();
    if(ballTop < pHeight - 36) {
        timer = requestAnimationFrame(start);
    } else {
        gameOver();
    }
}

function render() {
    moveBall();
    updateScore();
}

function moveBall() {
    ballLeft += dx;
    ballTop += dy;
    ball.style.left = ballLeft + "px";
    ball.style.top = ballTop + "px";
}
function updateScore() {
    currentScore += 1;
    score.innerHTML = "Score: " + currentScore;
}

function detectCollisions() {
    if(collisionX()) {
        dx *= -1;
    }
    if(collisionY()) {
        dy *= -1;
    }
}
function collisionX() {
    // Checks if the ball collides with the 
    // left or right edge of the playing area.
    // Note: Ball is 16px in length.
    if(ballLeft < 4 || ballLeft > pWidth - 20) {
        playSound(beepX);
        return true;
    }
    return false;
}
function collisionY() {
    // Checks if the ball collides with the
    // top edge of the playing area.
    if(ballTop < 4){
        playSound(beepY);
        return true;
    }
    if(ballTop > pHeight - 64) {
        // Checks if the ball hits the center of the paddle.
        // Decreases speed if hit in the center.
        if (ballLeft >= paddleLeft + 16 && ballLeft < paddleLeft + 48) {
            // Checks if the ball is moving left or right.
            if (dx < 0) {
                dx = -2;
            } else {
                dx = 2;
            }
            currentScore += 150;
            playSound(beepPaddle);
            return true;
        // Increases speed if hit on one of the edges of the paddle.
        } else if (ballLeft >= paddleLeft && ballLeft < paddleLeft + 16) {
            if (dx < 0) {
                dx = -6;
            } else {
                dx = 6;
            }
            currentScore += 50;
            playSound(beepPaddle);
            return true;
        } else if (ballLeft >= paddleLeft + 48  && ballLeft <= paddleLeft + 64) {
            if (dx < 0) {
                dx = -6;
            } else {
                dx = 6;
            }
            currentScore += 50;
            playSound(beepPaddle);
            return true;
        }
    }
    return false;
    
}

function difficulty() {
    // Each time the player hits an increment of 200,
    // the speed of the ball will gain vertical speed, 
    // and change the path, making it random.
    if(currentScore % 200 == 0){
        if(dy > 0) {
            dy += 2;
        } else {
            dy -= 2;
        }
    }
}

function gameOver() {
    cancelAnimationFrame(timer);
    score.innerHTML += " Game Over!";
    score.style.backgroundColor = "rgb(128,0,0)";
    playSound(beepGameOver);
    // Restart the game after five seconds.
    setTimeout(() => { newGame(); }, 5000);
}

function mouseDown(e) {
    drag = true;
}

function mouseUp(e) {
    drag = false;
}

function mouseMove(e) {
    if (drag) {
        e.preventDefault();
        paddleLeft = e.clientX -  32 || e.targetTouches[0].pageX - 32;
        if(paddleLeft < 0) {
            paddleLeft = 0;
        }
        if(paddleLeft > (pWidth - 64)) {
            paddleLeft = pWidth - 64;
        }
        paddle.style.left = paddleLeft + "px";
    }
}

function showSettings() {
    controls.style.display = "block";
    cancelAnimationFrame(timer);
}

function hideSettings() {
    controls.style.display = "none";
    timer = requestAnimationFrame(start);
}

function selectDifficulty(diff) {
    switch(diff) {
        // Easy
        case 0:
            dy = 2;
            pdx = 48;
            break;
        // Medium
        case 1:
            dy = 4;
            pdx = 32;
            break;
        // Hard
        case 2:
            dy = 6;
            pdx = 16;
            break;
        default:
            dy = 2;
            pdx = 48;
            break;
    }
}

function newGame() {
    ballTop = 8;
    currentScore = 0;
    dx = 2;
    selectDifficulty(difficultySelect.selectedIndex);
    score.style.backgroundColor = "rgb(32, 128, 64)";
    hideSettings();
}

function initAudio(){
    // Load audio files.
    beepX = new Audio("sounds/beepX.mp3");
    beepY = new Audio("sounds/beepY.mp3");
    beepPaddle = new Audio("sounds/beepPaddle.mp3");
    beepGameOver = new Audio("sounds/beepGameOver.mp3");
    bgMusic = new Audio("sounds/music.mp3");
    // Turn off volume.
    beepX.volume = 0;
    beepY.volume = 0;
    beepPaddle.volume = 0;
    beepGameOver.volume = 0;
    bgMusic.volume = 0;
    // Play each file,
    // this grants permission.
    beepX.play();
    beepY.play();
    beepPaddle.play();
    beepGameOver.play();
    bgMusic.play();
    // Pause each file,
    // This stores them in memory for later.
    beepX.pause();
    beepY.pause();
    beepPaddle.pause();
    beepGameOver.pause();
    bgMusic.pause();
    // Set the volume back for next time.
    beepX.volume = 1;
    beepY.volume = 1;
    beepPaddle.volume = 1;
    beepGameOver.volume = 1;
    bgMusic.volume = 1;
}

function toggleSound(){
    if(beepX == null) {
        initAudio();
    }
    sndEnabled = !sndEnabled;
}

function playSound(objSound){
    if(sndEnabled) {
        objSound.play();
    }
}

function toggleMusic() {
    if(bgMusic == null) {
        initAudio();
    }
    if(musicEnabled) {
        bgMusic.pause();
    } else {
        bgMusic.loop = true;
        bgMusic.play();
    }
    musicEnabled != musicEnabled
}