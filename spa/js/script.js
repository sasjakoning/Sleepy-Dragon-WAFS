
const btnStory = document.querySelector('.btn-story');

const windowStory = document.querySelector('.window-story');

const windowLoading = document.querySelector('.window-loading');

const windowContent = document.querySelector('.window-content');

btnStory.addEventListener('click', async () => {
    openWindow(windowStory);
    
    try {
        const data = await getRandomStory();

        windowLoading.remove()
        // classes ipv remove

        const storyElement = document.createElement('p');

        storyElement.textContent = data.story;
		
        windowContent.appendChild(storyElement);
    } catch (err) {
        console.log(err);
        // error state on server offline etc
    }
});

// wrap the above eventlistener in a try catch block




function openWindow(window) {
    window.classList.add('visible', 'slide-in');
}

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

// Create a function that detects mobile touch swipes and console.log the direction


// Create a function that detects mobile touch swipes and console.log the direction

const touchArea = document.querySelector('.touch-area');

touchArea.addEventListener('touchstart', handleTouchStart, false);
touchArea.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
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

fetch("./template.html")
    .then(response => response.text())
    .then(text => define(text));


function define(html){

    const template = document.createElement("template");
    
    template.innerHTML = html;
    
    class testTemplate extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }
    }
    
    customElements.define("test-template", testTemplate);

}
