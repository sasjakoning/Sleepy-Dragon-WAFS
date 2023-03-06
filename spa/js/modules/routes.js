import { getRandomStory, listAllStories, findStory, findSavedStories } from "./api.js";
import { riveAnimLoad, riveAnimTitle, riveAnimReading } from "./rive.js";
import { saveStory, deleteStory } from "./localstorage.js";
import { closeActiveWindow, openWindow, removeDuplicateWindow, hideWindow } from "./utilities.js";
import { returnToHome } from "./navigation.js"
import { swipeAndRemove } from "./touchHandler.js"

let currentStory = null;

function home() {
  closeActiveWindow();

  // Load the dragon title animation
  const titleCanvas = document.querySelector("#canvas-dragon-title");
  riveAnimTitle(titleCanvas);

}

async function story(id) {
  closeActiveWindow();

  const windowStory = document.querySelector(".window-story");

  // Open the story window
  openWindow(windowStory, "right");

  removeDuplicateWindow("story-loading");
  
  // Create a new instance of the "story-loading" element and add it to the window
  const storyLoading = document.createElement("story-loading");
  windowStory.appendChild(storyLoading);

  const storyLoadingCanvas = storyLoading.shadowRoot.querySelector(
    "#canvas-dragon-load"
  );

  riveAnimLoad(storyLoadingCanvas);

  if(id){
    // get story by id
    const allStories = await listAllStories();
    console.log(allStories)
    const matchingStory = findStory(allStories, id);

    currentStory = matchingStory;
  }else {
    // Get a random story from the API
    const storyContent = await getRandomStory();
  
    currentStory = storyContent;
    
  }

  // when fetch succeeds, hide the "story-loading" element and add the "story-success" element
  hideWindow(storyLoading)

  const storySuccess = document.createElement("story-success");
  const storySuccessTitle = storySuccess.shadowRoot.querySelector(
    '[slot="story-success-title"]'
  );
  const storySuccessAuthor = storySuccess.shadowRoot.querySelector(
    '[slot="story-success-author"]'
  );
  const storySuccessContent = storySuccess.shadowRoot.querySelector(
    '[slot="story-success-content"]'
  );

  const {story, title, author} = currentStory;

  storySuccessContent.textContent = story;
  storySuccessTitle.textContent = title;
  storySuccessAuthor.textContent = author;

  windowStory.appendChild(storySuccess);

  const dragonReadingCanvas = storySuccess.shadowRoot.querySelector(
    "#canvas-dragon-reading"
  );

  riveAnimReading(dragonReadingCanvas);

  const saveBtn = storySuccess.shadowRoot.querySelector(".save-toggle");

  saveBtn.addEventListener("change", () => {
    if (saveBtn.checked) {
      saveStory(currentStory);
    }else if (!saveBtn.checked) {
      deleteStory(currentStory._id);
    }
  });

}

async function saved() {
  closeActiveWindow();
  const windowSaved = document.querySelector(".window-saved");
  const windowSavedContent = document.querySelector(".saved-content");

  // Open the story window
  openWindow(windowSaved, "bottom");

  // Create a new instance of the "story-loading" element and add it to the window
  removeDuplicateWindow("saved-loading");

  const savedLoading = document.createElement("saved-loading");
  windowSavedContent.appendChild(savedLoading);

  const allApiStories = await listAllStories();
  console.log("GOT ALL STORIES", allApiStories);
  const savedStories = await findSavedStories(allApiStories);

  // when fetch succeeds, hide the "story-loading" element and add the "story-success" element
  hideWindow(savedLoading);

  if(savedStories.length === 0){
    const savedEmpty = document.createElement("saved-empty");
    windowSavedContent.appendChild(savedEmpty);
    return;
  }

  savedStories.forEach((story) => {
    const savedStoryLink = document.createElement("a");
    savedStoryLink.href = `#id=${story._id}`;

    console.log(savedStoryLink)

    const savedStoryPart = document.createElement("saved-storypart");
    savedStoryLink.appendChild(savedStoryPart);

    const savedStoryTitle = savedStoryPart.shadowRoot.querySelector(
      '[slot="saved-storypart-title"]'
    );
    savedStoryTitle.textContent = story.title;

    const savedStoryAuthor = savedStoryPart.shadowRoot.querySelector(
      '[slot="saved-storypart-author"]'
    );
    savedStoryAuthor.textContent = story.author;

    savedStoryPart.dataset.storyId = story._id;

    windowSavedContent.appendChild(savedStoryLink);
  });

  // The below function detects the swipe direction and logs it to the console

  const touchArea = document.querySelectorAll("saved-storypart");

  
  touchArea.forEach((element) => {
    const slideElement = element.shadowRoot.querySelector(".window-saved-storypart");
    swipeAndRemove(slideElement, element);
  });
    

}

async function error() {
  closeActiveWindow();

  const windowError = document.querySelector(".window-error");
  openWindow(windowError, "right");
}

export default {
  home,
  story,
  saved,
  error,
};
