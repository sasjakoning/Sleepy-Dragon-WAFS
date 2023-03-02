import { getRandomStory, listAllStories, findStories } from "./api.js";
import { riveAnimLoad, riveAnimTitle } from "./rive.js";
import { saveStory, deleteStory } from "./localstorage.js";
import { closeActiveWindow, openWindow, removeDuplicateWindow, hideWindow } from "./utilities.js";
import { returnToHome } from "./navigation.js"
import { swipeAndRemove } from "./touchHandler.js"

let currentStory = null;

function home() {
  // Load the dragon title animation
  const titleCanvas = document.querySelector("#canvas-dragon-title");
  riveAnimTitle(titleCanvas);

  // Close the active window
  const activeWindow = document.querySelector(".visible.window");

  activeWindow?.classList.forEach((className) => {
    if (className.includes("slide-")) {
      const [, , animDirection] = className.split("-");

      activeWindow.classList.add(`slide-out-${animDirection}`);

      activeWindow.addEventListener(
        "animationend",
        (event) => {
          closeActiveWindow(activeWindow, animDirection);
        },
        { once: true }
      );
    }
  });
}

async function story() {
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

  // Get a random story from the API
  const storyContent = await getRandomStory();

  currentStory = storyContent;

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

  const {story, title, author} = storyContent;

  storySuccessContent.textContent = story;
  storySuccessTitle.textContent = title;
  storySuccessAuthor.textContent = author;

  windowStory.appendChild(storySuccess);

  const saveBtn = storySuccess.shadowRoot.querySelector(".save-toggle");

  saveBtn.addEventListener("change", () => {
    if (saveBtn.checked) {
      saveStory(currentStory);
    }else if (!saveBtn.checked) {
      deleteStory(currentStory);
    }
  });

}

async function saved() {
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
  const savedStories = await findStories(allApiStories);

  // when fetch succeeds, hide the "story-loading" element and add the "story-success" element
  hideWindow(savedLoading)

  const savedStory = document.createElement("saved-storypart");

  savedStories.forEach((story) => {
    const savedStoryPart = document.createElement("saved-storypart");

    const savedStoryTitle = savedStoryPart.shadowRoot.querySelector(
      '[slot="saved-storypart-title"]'
    );
    savedStoryTitle.textContent = story.title;

    const savedStoryAuthor = savedStoryPart.shadowRoot.querySelector(
      '[slot="saved-storypart-author"]'
    );
    savedStoryAuthor.textContent = story.author;

    windowSavedContent.appendChild(savedStoryPart);
  });

  // The below function detects the swipe direction and logs it to the console

  const touchArea = document.querySelectorAll("saved-storypart");

  touchArea.forEach((element) => {
    const slideElement = element.shadowRoot.querySelector(".window-saved-storypart");
    swipeAndRemove(slideElement, element)
  });
    

}

export default {
  home,
  story,
  saved,
};
