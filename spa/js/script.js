
const btnStory = document.querySelector('.btn-story');

const windowStory = document.querySelector('.window-story');

const windowLoading = document.querySelector('.window-loading');

const windowContent = document.querySelector('.window-content');

btnStory.addEventListener('click', async () => {
    openWindow(windowStory);
    
    try {
        const data = await getRandomStory();

        windowLoading.remove()

        const storyElement = document.createElement('p');

        storyElement.textContent = data.story;
		
        windowContent.appendChild(storyElement);
    } catch (err) {
        console.log(err);
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

