let imgArray = new Array();

for (let i = 0; i < 24; i++) {
    // Using an image object forces
    // browser to preload each object,
    // thus removing latency.
    imgArray[i] = new Image();
    imgArray[i].src = "img/ball" + i + ".gif";
}

let counter = 0;

function rotate() {
    if (counter > imgArray.length - 1) {
        // Restarts and loops animation.
        counter = 0;
    }
    document.getElementById("baseball").src = imgArray[counter].src;
    counter++;
    setTimeout("rotate()", 50);
}
// The load event fires after all of the resources have been downloaded. 
// And that's important, because we're using the image array, 
// storing image objects, that means all of the frames in the 
// animation will be downloaded before anything gets going.
window.addEventListener("load", rotate);