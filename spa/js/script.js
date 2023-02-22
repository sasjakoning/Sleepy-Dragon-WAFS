import { loadTemplates } from "./modules/templater.js";
import { goBack } from "./modules/navigation.js";
import { onRouteChanged } from "./modules/router.js";

const windowNoJS = document.querySelector(".window-nojs");
const btnStory = document.querySelector(".btn-story");

// Add "hidden" class to windowNoJS to hide it if JavaScript is enabled
windowNoJS.classList.add("hidden");

// Array of template file paths to load. These are the files that define the custom elements.
const templates = [
  "./templates/story-loading.html",
  "./templates/story-error.html",
  "./templates/story-success.html",
  "./templates/saved-error.html",
  "./templates/saved-loading.html",
  "./templates/saved-storypart.html"

];

// Load the templates
loadTemplates(templates);


// MDN Docs, Github Copilot and ChatGPT are my heroes. Web components are heckin' cool.

const backBtn = document.querySelector(".nav-back");

backBtn.addEventListener("click", (event) => {
  // event.preventDefault();

  // goBack();

});

// WIP

// The below function detects the swipe direction and logs it to the console

const touchArea = document.querySelector(".touch-area");

touchArea.addEventListener("touchstart", handleTouchStart, false);
touchArea.addEventListener("touchmove", handleTouchMove, false);

let xDown = null;

function getTouches(evt) {
  return evt.touches;
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
}

function handleTouchMove(evt) {
  if (!xDown) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let xDiff = xDown - xUp;

  if (Math.abs(xDiff) > 0) {
    if (xDiff > 0) {
      console.log("left");
    } else {
      console.log("right");
    }
  }

  xDown = null;
}
