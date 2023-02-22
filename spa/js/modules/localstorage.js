
function saveStory(btn, story) {
    console.log(story)
    if (btn.checked) {
        // Get the story
        console.log('checked');
        const existingStories = JSON.parse(localStorage.getItem("savedStories") || '[]')

        console.log(existingStories);

        if (existingStories === null) {
            console.log('no stories saved');

            localStorage.setItem("savedStories", JSON.stringify([story._id]));

        } else {

            console.log('stories saved');
            existingStories.push(story._id);
            localStorage.setItem("savedStories", JSON.stringify(existingStories));


        }

    }else{
        console.log('unchecked');
        
        // Remove the story
    }
}

export { saveStory }