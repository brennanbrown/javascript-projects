let ball,
    paddle,
    score,
    timer,
    playingArea;

let aWidth,
    aHeight,
    pWidth,
    pHeight;

let dx = 2;
let dy = 2;
let pdx = 48;
let currentScore = 0;
let paddleLeft = 228;
let ballLeft = 100;
let ballTop = 8;

window.addEventListener('load', init);
window.addEventListener('resize', init);

function init(){
    ball = document.getElementById('ball');
    paddle = document.getElementById('paddle');
    score = document.getElementById('score');
    playingArea = document.getElementById('playing-area');
    layoutPage();
    document.addEventListener('keydown', keyListener, false);
}

function layoutPage(){
    aWidth = innerWidth;
    aHeight = innerHeight;
    pWidth = aWidth - 22;
    pHeight = aHeight - 22;
    playingArea.style.width = pWidth + 'px';
    playingArea.style.height = pHeight + 'px';
}

function keyListener(e){
    if((e.keyCode == 37 || e.keyCode == 65) && paddleLeft > 0){
        paddleLeft -= pdx;
        if(paddleLeft < 0)
            paddleLeft = 0;
        paddle.style.left = paddleLeft + 'px';
    }
    if((e.keyCode == 39 || e.keyCode == 68) && paddleLeft < pWidth - 64){
        paddleLeft += pdx;
        if(paddleLeft > (pWidth - 64))
            paddleLeft = pWidth - 64;
        paddle.style.left = paddleLeft + 'px';
    }
}

