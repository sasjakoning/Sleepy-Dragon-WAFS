
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