import { loadTemplates } from "./modules/templater.js";
import { goBack } from "./modules/navigation.js";
import { onRouteChanged } from "./modules/router.js";

const windowNoJS = document.querySelector(".window-nojs");


// Array of template file paths to load. These are the files that define the custom elements.
const templates = [
  "./templates/story-loading.html",
  "./templates/story-error.html",
  "./templates/story-success.html",
  "./templates/saved-error.html",
  "./templates/saved-loading.html",
  "./templates/saved-storypart.html",
  "./templates/saved-empty.html",	
];

// Load the templates
loadTemplates(templates);

// Fire router on load and on hashchange
window.addEventListener("load", () => {
  onRouteChanged(window.location.hash);
});

window.addEventListener("hashchange", () => onRouteChanged(window.location.hash));
