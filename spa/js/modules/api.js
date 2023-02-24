async function listAllStories () {
    console.log('fetching all stories');
    const response = await fetch(`https://shortstories-api.onrender.com/stories`);
    const data = await response.json();
    return data;
}

function findStories(allStories) {
    console.log('finding saved stories');
    const existingStories = JSON.parse(localStorage.getItem("savedStories"));
    
    console.log(existingStories);
    
    if(existingStories != null) {
        const matchingStories = allStories.filter(story => existingStories.includes(story._id));
        return matchingStories;
    }

}


//  Get ramdom story from API
async function getRandomStory() {
    const windowStory = document.querySelector(".window-story");
    console.log('finding random story')
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


export { getRandomStory,  listAllStories , findStories};