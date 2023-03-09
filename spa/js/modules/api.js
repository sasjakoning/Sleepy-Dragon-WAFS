async function listAllStories(tory) {
    console.log(`fetching all stories`);
    const response = await fetch(`https://shortstories-api.onrender.com/stories`);
    const data = await response.json();
    return data;
}

function findSavedStories(allStories) {
    console.log(`finding saved stories`);
    const existingStories = JSON.parse(localStorage.getItem('savedStories'));

    if (existingStories != null) {
        const matchingStories = allStories.filter(story => existingStories.includes(story._id));
        return matchingStories;
    }

}

function findStory(allStories, id) {
    console.log('finding story');
    const matchingStory = allStories.find(story => story._id === id);

    if (matchingStory) {
        return matchingStory;
    } else {
        console.log('No story found');
    }
}


//  Get ramdom story from API
async function getRandomStory() {
    const windowStory = document.querySelector('.window-story');
    console.log('finding random story');
    try {
        const response = await fetch(`https://shortstories-api.onrender.com/`);
        const data = await response.json();
        return data;
    }
    catch (err) {
        // On fail, add the 'story-error' element to the DOM
        console.log(err);
        const storyError = document.createElement('story-error');
        windowStory.appendChild(storyError);
    }
}


export default {
    getRandomStory,
    listAllStories,
    findStory,
    findSavedStories,
};