const windowNoJS = document.querySelector('.window-nojs');
const windowStory = document.querySelector('.window-story');
const btnStory = document.querySelector('.btn-story');

// Add "hidden" class to windowNoJS to hide it if JavaScript is enabled
windowNoJS.classList.add("hidden")

// Array of template file paths to load. These are the files that define the custom elements.
const templates = ["./templates/story-loading.html", "./templates/story-error.html", "./templates/story-success.html"];

// Function to define a custom element based on a template file
async function defineTemplate(templatePath) {
  // Fetch the template file
  const response = await fetch(templatePath);
  const html = await response.text();

  const template = document.createElement('template');
  template.innerHTML = html;

  // Define a custom element using the template file
  class CustomElement extends HTMLElement {
    constructor() {
      super();
        //   Shadow DOM is a way to encapsulate styles and markup in a custom element. It ignores styles outside of the element and styles inside the element don't affect the rest of the page. Very cool.
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  // Get the tag name from the "data-tag-name" attribute in the template file
  const tagName = template.content.querySelector('[data-tag-name]').getAttribute('data-tag-name');

  // Define the custom element using the tag name and the custom element class
  customElements.define(tagName, CustomElement);
}

// Function to load all the templates
async function loadTemplates() {
  for (let i = 0; i < templates.length; i++) {
    await defineTemplate(templates[i]);
  }
}

// Load the templates
loadTemplates();


// Add a click event listener to the "Open Story" button
btnStory.addEventListener('click', (event) => {
  event.preventDefault();
  
  // Open the story window
  openWindow(windowStory);

  // Create a new instance of the "story-loading" element and add it to the window
  const storyLoading = document.createElement('story-loading');
  windowStory.appendChild(storyLoading);
});


// Function to open a window by adding the "visible" and "slide-in" classes
function openWindow(window) {
  window.classList.add('visible', 'slide-in');
}

// MDN Docs, Github Copilot and ChatGPT are my heroes. Web components are heckin' cool.


//  Get ramdom story from API
async function getRandomStory() {
	
    try {
        const response = await fetch(`https://shortstories-api.onrender.com/`);
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log(err);
    }
}



// WIP

// The below function detects the swipe direction and logs it to the console

const touchArea = document.querySelector('.touch-area');

touchArea.addEventListener('touchstart', handleTouchStart, false);
touchArea.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;

function getTouches(evt) {
    return evt.touches
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
            console.log('left');
        } else {
            console.log('right');
        }
    }

    xDown = null;
}
