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
        //   Shadow DOM is a way to encapsulate styles and markup in a custom element. 
        // It ignores styles outside of the element and styles inside the element don't affect the rest of the page. 
        // Very cool.
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
btnStory.addEventListener('click', async (event) => {
  event.preventDefault();
  
  // Open the story window
  openWindow(windowStory);

  // Create a new instance of the "story-loading" element and add it to the window
  if(document.querySelector("story-loading")){
    document.querySelector("story-loading").remove();
  }
  
  const storyLoading = document.createElement('story-loading');
  windowStory.appendChild(storyLoading);

  // Get a random story from the API
  const storyContent = await getRandomStory();

  // when fetch succeeds, hide the "story-loading" element and add the "story-success" element
  storyLoading.classList.add('hidden');

  const storySuccess = document.createElement('story-success');
  const storySuccessTitle = storySuccess.shadowRoot.querySelector('[slot="story-success-title"]');
  const storySuccessAuthor = storySuccess.shadowRoot.querySelector('[slot="story-success-author"]');
  const storySuccessContent = storySuccess.shadowRoot.querySelector('[slot="story-success-content"]');
  storySuccessContent.textContent = storyContent.story;
  storySuccessTitle.textContent = storyContent.title;
  storySuccessAuthor.textContent = storyContent.author;



  windowStory.appendChild(storySuccess);
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
      // On fail, add the "story-error" element to the DOM
      console.log(err);
      const storyError = document.createElement('story-error');
      windowStory.appendChild(storyError);
  }
}



const backBtn = document.querySelector('.nav-back');

backBtn.addEventListener('click', (event) => {
    event.preventDefault();

    console.log("Back button clicked")

    if(document.querySelector("story-success")){
      document.querySelector("story-success").remove();
    }

    if(windowStory.classList.contains('visible')) {  
      windowStory.classList.add('slide-out');
      windowStory.addEventListener('animationend', () => {
        console.log("Animation ended event fired")
        windowStory.classList.remove('slide-out');
        windowStory.classList.remove('slide-in');
        windowStory.classList.remove('visible');
      }, {once: true});
    }
});




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
