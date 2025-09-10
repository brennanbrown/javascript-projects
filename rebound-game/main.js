let ball, paddle, score, timer, playingArea;

let aWidth, aHeight, pWidth, pHeight;

let gear, controls, newButton, difficultySelect, doneButton, snd, music;

let dx = 2;
let dy = 2;
let pdx = 64;
let currentScore = 0;
let paddleLeft = 228;
let targetPaddleLeft = 228;
let ballLeft = 100;
let ballTop = 8;

let drag = false;
let sndEnabled = false;
let musicEnabled = false;

let beepX, beepY, beepPaddle, beepGameOver, bgMusic;

// Ensure we only bind event listeners once even though init runs on resize
let eventsBound = false;

window.addEventListener('load', init);
// Debounced resize handler to avoid re-running init() too frequently
let resizeTimeout;
function onResize() {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Only recompute layout; event binding is guarded by eventsBound
    layoutPage();
    // Constrain paddle within new bounds
    if (paddleLeft > pWidth - 64) {
      paddleLeft = Math.max(0, pWidth - 64);
      if (paddle) paddle.style.left = paddleLeft + 'px';
    }
  }, 150);
}
window.addEventListener('resize', onResize);

function init() {
  ball = document.getElementById('ball');
  paddle = document.getElementById('paddle');
  score = document.getElementById('score');
  playingArea = document.getElementById('playing-area');

  gear = document.getElementById('gear');
  controls = document.getElementById('controls');
  newButton = document.getElementById('new');
  difficultySelect = document.getElementById('difficulty');
  doneButton = document.getElementById('done');

  snd = document.getElementById('snd');
  music = document.getElementById('music');

  layoutPage();
  if (!eventsBound) {
    document.addEventListener('keydown', keyListener, false);

    // Pointer events unify mouse/touch
    playingArea.addEventListener('pointerdown', onPointerDown, false);
    // pointermove needs passive: false because we may call preventDefault to avoid scroll on touch
    playingArea.addEventListener('pointermove', onPointerMove, { passive: false });
    playingArea.addEventListener('pointerup', onPointerUp, false);
    playingArea.addEventListener('pointercancel', onPointerUp, false);

    gear.addEventListener('click', showSettings, false);
    newButton.addEventListener('click', newGame, false);
    doneButton.addEventListener('click', hideSettings, false);
    difficultySelect.addEventListener(
      'click',
      function () {
        selectDifficulty(difficultySelect.selectedIndex);
      },
      false
    );

    snd.addEventListener('click', toggleSound, false);
    music.addEventListener('click', toggleMusic, false);

    eventsBound = true;
  }

  if (!timer) {
    timer = requestAnimationFrame(start);
  }
}

function layoutPage() {
  aWidth = window.innerWidth;
  aHeight = window.innerHeight;
  pWidth = aWidth - 22;
  pHeight = aHeight - 22;
  playingArea.style.width = pWidth + 'px';
  playingArea.style.height = pHeight + 'px';
}

function keyListener(e) {
  const key = (e.key || '').toLowerCase();
  if ((key === 'arrowleft' || key === 'a')) {
    targetPaddleLeft = Math.max(0, (targetPaddleLeft || paddleLeft) - pdx);
  } else if ((key === 'arrowright' || key === 'd')) {
    targetPaddleLeft = Math.min(pWidth - 64, (targetPaddleLeft || paddleLeft) + pdx);
  }
}

function start() {
  render();
  detectCollisions();
  difficulty();
  if (ballTop < pHeight - 36) {
    timer = requestAnimationFrame(start);
  } else {
    gameOver();
  }
}

function render() {
  moveBall();
  // Smoothly move paddle toward target position
  if (typeof targetPaddleLeft === 'number') {
    const lerp = 0.35; // smoothing factor
    const clamped = Math.max(0, Math.min(pWidth - 64, targetPaddleLeft));
    paddleLeft = paddleLeft + (clamped - paddleLeft) * lerp;
    paddle.style.left = Math.round(paddleLeft) + 'px';
  }
  updateScore();
}

function moveBall() {
  ballLeft += dx;
  ballTop += dy;
  ball.style.left = ballLeft + 'px';
  ball.style.top = ballTop + 'px';
}

function updateScore() {
  currentScore += 1;
  score.textContent = 'Score: ' + currentScore;
}

function detectCollisions() {
  if (collisionX()) {
    dx *= -1;
  }
  if (collisionY()) {
    dy *= -1;
  }
}

function collisionX() {
  // Checks if the ball collides with the
  // left or right edge of the playing area.
  // Note: Ball is 16px in length.
  if (ballLeft < 4 || ballLeft > pWidth - 20) {
    playSound(beepX);
    return true;
  }
  return false;
}

function collisionY() {
  // Checks if the ball collides with the
  // top edge of the playing area.
  if (ballTop < 4) {
    playSound(beepY);
    return true;
  }
  if (ballTop > pHeight - 64) {
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
        dx = -4;
      } else {
        dx = 4;
      }
      currentScore += 50;
      playSound(beepPaddle);
      return true;
    } else if (ballLeft >= paddleLeft + 48 && ballLeft <= paddleLeft + 64) {
      if (dx < 0) {
        dx = -4;
      } else {
        dx = 4;
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
  if (currentScore % 200 == 0) {
    if (dy > 0) {
      dy += 2;
    } else {
      dy -= 2;
    }
  }
}

function gameOver() {
  cancelAnimationFrame(timer);
  score.textContent = 'Score: ' + currentScore + ' Game Over!';
  score.style.backgroundColor = 'rgb(128,0,0)';
  playSound(beepGameOver);
  // Restart the game after five seconds.
  setTimeout(() => {
    newGame();
  }, 5000);
}

function onPointerDown(e) {
  drag = true;
  // capture to continue getting events even if pointer leaves element
  try {
    playingArea.setPointerCapture && playingArea.setPointerCapture(e.pointerId);
  } catch (_) {}
}

function onPointerUp(e) {
  drag = false;
  try {
    playingArea.releasePointerCapture && playingArea.releasePointerCapture(e.pointerId);
  } catch (_) {}
}

function onPointerMove(e) {
  if (drag) {
    // prevent scrolling on touch while dragging
    if (e.cancelable) e.preventDefault();
    const x = (e.clientX != null ? e.clientX : 0) - 32;
    const clamped = Math.max(0, Math.min(pWidth - 64, x));
    targetPaddleLeft = clamped;
  }
}

function showSettings() {
  controls.style.display = 'block';
  cancelAnimationFrame(timer);
}

function hideSettings() {
  controls.style.display = 'none';
  timer = requestAnimationFrame(start);
}

function selectDifficulty(diff) {
  switch (diff) {
    // Easy
    case 0:
      dy = 2;
      pdx = 64;
      break;
    // Medium
    case 1:
      dy = 4;
      pdx = 48;
      break;
    // Hard
    case 2:
      dy = 6;
      pdx = 32;
      break;
    default:
      dy = 2;
      pdx = 64;
      break;
  }
}

function newGame() {
  ballTop = 8;
  currentScore = 0;
  dx = 2;
  selectDifficulty(difficultySelect.selectedIndex);
  score.style.backgroundColor = 'rgb(32, 128, 64)';
  hideSettings();
}

function initAudio() {
  // Load audio files.
  beepX = new Audio('sounds/beepX.mp3');
  beepY = new Audio('sounds/beepY.mp3');
  beepPaddle = new Audio('sounds/beepPaddle.mp3');
  beepGameOver = new Audio('sounds/beepGameOver.mp3');
  bgMusic = new Audio('sounds/music.mp3');
  // Turn off volume.
  beepX.volume = 0;
  beepY.volume = 0;
  beepPaddle.volume = 0;
  beepGameOver.volume = 0;
  bgMusic.volume = 0;
  // Play each file,
  // this grants permission.
  // Guard play() with promise catch for autoplay policies
  Promise.resolve(beepX.play()).catch(() => {});
  Promise.resolve(beepY.play()).catch(() => {});
  Promise.resolve(beepPaddle.play()).catch(() => {});
  Promise.resolve(beepGameOver.play()).catch(() => {});
  Promise.resolve(bgMusic.play()).catch(() => {});
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

function toggleSound() {
  if (beepX == null) {
    initAudio();
  }
  sndEnabled = !sndEnabled;
}

function playSound(objSound) {
  if (sndEnabled) {
    objSound.play();
  }
}

function toggleMusic() {
  if (bgMusic == null) {
    initAudio();
  }
  if (musicEnabled) bgMusic.pause();
  else {
    bgMusic.loop = true;
    bgMusic.play();
  }
  musicEnabled = !musicEnabled;
}
