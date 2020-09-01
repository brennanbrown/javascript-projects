let currentX = 100;
let currentY = 430;

function animate() {

    document.getElementById("orb").style.left = currentX + "px";
    document.getElementById("orb").style.top = currentY + "px";

    if (currentX < 1800) {
        currentX += 4;
        currentY += 1;
    } else {
        currentX -= 900;
        currentY -= 300;
    }
    setTimeout("animate()", 10);
}

window.addEventListener("load", animate);