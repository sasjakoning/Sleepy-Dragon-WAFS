import { getRandomStory, listAllStories, findStories } from "./api.js";
import { riveDragonLoad } from "./rive.js";
import { saveStory, getStories } from "./localstorage.js";



let currentStory = null;

function home() {
  const activeWindow = document.querySelector(".visible.window");

  if (activeWindow) {
    for (let i = 0; i < activeWindow.classList.length; i++) {
      const className = activeWindow.classList[i];
      if (className.includes("slide-")) {
        const animDirection = className.split("-")[2];
        console.log(animDirection);

        activeWindow.classList.add(`slide-out-${animDirection}`);

        activeWindow.addEventListener(
          "animationend",
          () => {
            activeWindow.classList.remove("visible");
            activeWindow.classList.remove(`slide-out-${animDirection}`);
            activeWindow.classList.remove(`slide-in-${animDirection}`);
          },
          { once: true }
        );
      }
    }
  }
}


// Function to open a window by adding the "visible" and "slide-in" classes
function openWindow(window, direction) {
  const navToggle = document.querySelector(".nav-toggle");

  window.classList.add(`visible`, `slide-in-${direction}`);

  if (navToggle.checked) {
    navToggle.checked = false;
  }
}

async function story() {
  const windowStory = document.querySelector(".window-story");

  // Open the story window
  openWindow(windowStory, "right");

  // Create a new instance of the "story-loading" element and add it to the window
  if (document.querySelector("story-loading")) {
    document.querySelector("story-loading").remove();
  }

  const storyLoading = document.createElement("story-loading");
  windowStory.appendChild(storyLoading);

  const storyLoadingCanvas = storyLoading.shadowRoot.querySelector(
    "#canvas-dragon-load"
  );

  riveDragonLoad(storyLoadingCanvas);

  // Get a random story from the API
  const storyContent = await getRandomStory();
  
  
  currentStory = storyContent;

  // when fetch succeeds, hide the "story-loading" element and add the "story-success" element
  storyLoading.classList.add("hidden");

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

  storySuccessContent.textContent = storyContent.story;
  storySuccessTitle.textContent = storyContent.title;
  storySuccessAuthor.textContent = storyContent.author;

  windowStory.appendChild(storySuccess);

  const saveBtn = storySuccess.shadowRoot.querySelector(".save-toggle");

  saveBtn.addEventListener("change", () => {
    saveStory(saveBtn, currentStory);
  });

}

async function saved() {
  const windowSaved = document.querySelector(".window-saved");
  const windowSavedContent = document.querySelector(".saved-content");

  // Open the story window
  openWindow(windowSaved, "bottom");

  // Create a new instance of the "story-loading" element and add it to the window
  if (document.querySelector("saved-loading")) {
    document.querySelector("saved-loading").remove();
  }

  const savedLoading = document.createElement("saved-loading");
  windowSavedContent.appendChild(savedLoading);

  const allApiStories = await listAllStories();
  console.log('GOT ALL STORIES', allApiStories);
  const savedStories = await findStories(allApiStories);

  console.log(savedStories);

  // when fetch succeeds, hide the "story-loading" element and add the "story-success" element
  savedLoading.classList.add("hidden");

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




  // const saveBtn = storySuccess.shadowRoot.querySelector(".save-toggle");

  // saveBtn.addEventListener("change", () => {
  //   saveStory(saveBtn, currentStory);
  // });

}

export default {
  home,
  story,
  saved,
};
