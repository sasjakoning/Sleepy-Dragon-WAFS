// add story to localstorage
function saveStory(story) {
  console.log("checked");

  const existingStories = JSON.parse(
    localStorage.getItem("savedStories") || "[]"
  );

  if (existingStories === null) {
    console.log("no stories saved");

    localStorage.setItem("savedStories", JSON.stringify([story._id]));
  } else {
    console.log("stories saved");
    existingStories.push(story._id);
    localStorage.setItem("savedStories", JSON.stringify(existingStories));
  }
}

// Remove the story from localstorage
function deleteStory(story) {
  console.log("unchecked");

  const existingStories = JSON.parse(
    localStorage.getItem("savedStories") || "[]"
  );

  const storyIndex = existingStories.indexOf(story);

  existingStories.splice(storyIndex, 1);

  localStorage.setItem("savedStories", JSON.stringify(existingStories));
}

export { saveStory, deleteStory };
