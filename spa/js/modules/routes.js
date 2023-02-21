import { getRandomStory } from "./api.js";
import { riveDragonLoad } from "./rive.js";

function home() {
    const activeWindow = document.querySelector(".visible" && ".window");
    console.log(activeWindow.classList);

    for (let i = 0; i < activeWindow.classList.length; i++) {
        const className = activeWindow.classList[i];
        if (className.includes("slide-")) {

            const animDirection = className.split("-")[2];
            console.log(animDirection)

            activeWindow.classList.add(`slide-out-${animDirection}`);

            activeWindow.addEventListener( "animationend", () => {
                activeWindow.classList.remove("visible");
                activeWindow.classList.remove(`slide-out-${animDirection}`)
                activeWindow.classList.remove(`slide-in-${animDirection}`)
            }, { once: true } );
                
        }
    }
}

// Function to open a window by adding the "visible" and "slide-in" classes
function openWindow(window) {
    window.classList.add("visible", "slide-in-right");
}

async function story() {
    const windowStory = document.querySelector(".window-story");
    
    // Open the story window
    openWindow(windowStory);

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
  
    // // Get a random story from the API
    // const storyContent = await getRandomStory();
  
    // // when fetch succeeds, hide the "story-loading" element and add the "story-success" element
    // storyLoading.classList.add("hidden");
  
    // const storySuccess = document.createElement("story-success");
    // const storySuccessTitle = storySuccess.shadowRoot.querySelector(
    //   '[slot="story-success-title"]'
    // );
    // const storySuccessAuthor = storySuccess.shadowRoot.querySelector(
    //   '[slot="story-success-author"]'
    // );
    // const storySuccessContent = storySuccess.shadowRoot.querySelector(
    //   '[slot="story-success-content"]'
    // );

    // storySuccessContent.textContent = storyContent.story;
    // storySuccessTitle.textContent = storyContent.title;
    // storySuccessAuthor.textContent = storyContent.author;
  
    // windowStory.appendChild(storySuccess);
}
export default {
    home,
    story
}