// add story to localstorage
function saveStory(story) {
  console.log('checked');

  const existingStories = JSON.parse(
    localStorage.getItem('savedStories') || '[]'
  );

  if (existingStories === null) {
    localStorage.setItem('savedStories', JSON.stringify([story._id]));
  } else {
    existingStories.push(story._id);
    localStorage.setItem('savedStories', JSON.stringify(existingStories));
  }
}

// Remove the story from localstorage
function deleteStory(story) {
  console.log('unchecked');

  const existingStories = JSON.parse(
    localStorage.getItem('savedStories') || '[]'
  );

  const storyIndex = existingStories.indexOf(story);

  existingStories.splice(storyIndex, 1);

  localStorage.setItem('savedStories', JSON.stringify(existingStories));
}

export default {
  saveStory,
  deleteStory,
};
