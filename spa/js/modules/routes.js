import api from './api.js';
import rive from './rive.js';
import local from './localstorage.js';
import utils from './utilities.js';
import touchHandle from './touchHandler.js'

let currentStory = null;

function home() {
  utils.closeActiveWindow();

  // Load the dragon title animation
  const titleCanvas = document.querySelector('#canvas-dragon-title');
  rive.riveAnimTitle(titleCanvas);

}

async function story(id) {
  utils.closeActiveWindow();

  const windowStory = document.querySelector('.window-story');

  // Open the story window
  utils.openWindow(windowStory, 'right');

  utils.removeDuplicateWindow('story-loading');

  // Create a new instance of the 'story-loading' element and add it to the window
  const storyLoading = document.createElement('story-loading');
  windowStory.appendChild(storyLoading);

  const storyLoadingCanvas = storyLoading.shadowRoot.querySelector(
    '#canvas-dragon-load'
  );

  rive.riveAnimLoad(storyLoadingCanvas);

  if (id) {
    // get story by id
    const allStories = await api.listAllStories();
    const matchingStory = api.findStory(allStories, id);

    currentStory = matchingStory;
  } else {
    // Get a random story from the API
    const storyContent = await api.getRandomStory();

    currentStory = storyContent;

  }

  // when fetch succeeds, hide the 'story-loading' element and add the 'story-success' element
  utils.hideWindow(storyLoading)

  const storySuccess = document.createElement('story-success');
  const storySuccessTitle = storySuccess.shadowRoot.querySelector(
    "[slot='story-success-title']"
  );
  const storySuccessAuthor = storySuccess.shadowRoot.querySelector(
    "[slot='story-success-author']"
  );
  const storySuccessContent = storySuccess.shadowRoot.querySelector(
    "[slot='story-success-content']"
  );

  const { story, title, author } = currentStory;

  storySuccessContent.textContent = story;
  storySuccessTitle.textContent = title;
  storySuccessAuthor.textContent = author;

  windowStory.appendChild(storySuccess);

  const dragonReadingCanvas = storySuccess.shadowRoot.querySelector(
    '#canvas-dragon-reading'
  );

  rive.riveAnimReading(dragonReadingCanvas);

  const saveBtn = storySuccess.shadowRoot.querySelector('.save-toggle');
  const saveNotif = storySuccess.shadowRoot.querySelector('.story-saved-notif');
  const saveNotifContent = saveNotif.querySelector('p');

  saveBtn.addEventListener('change', () => {
    if (saveBtn.checked) {
      local.saveStory(currentStory);
      saveNotifContent.textContent = 'Story saved!';
      saveNotif.classList.add('saved-notif-slide-in');
      setTimeout(() => {
        saveNotif.classList.remove('saved-notif-slide-in')
      }, 2000);
    } else if (!saveBtn.checked) {
      local.deleteStory(currentStory._id);
      saveNotifContent.textContent = 'Story unsaved!';
      saveNotif.classList.add('saved-notif-slide-in');
      setTimeout(() => {
        saveNotif.classList.remove('saved-notif-slide-in')
      }, 2000);
    }
  });

}

async function saved() {
  utils.closeActiveWindow();
  const windowSaved = document.querySelector('.window-saved');
  const windowSavedContent = document.querySelector('.saved-content');

  // Open the story window
  utils.openWindow(windowSaved, 'bottom');

  // Create a new instance of the 'story-loading' element and add it to the window

  utils.removeDuplicateWindow('saved-loading');
  utils.removeDuplicateWindow('saved-empty');

  const savedLoading = document.createElement('saved-loading');
  windowSavedContent.appendChild(savedLoading);

  const allApiStories = await api.listAllStories();
  const savedStories = await api.findSavedStories(allApiStories);

  // when fetch succeeds, hide the 'story-loading' element and add the 'story-success' element
  utils.hideWindow(savedLoading);

  if (savedStories.length === 0) {
    const savedEmpty = document.createElement('saved-empty');
    savedEmpty.classList.add('animate-in');
    windowSavedContent.appendChild(savedEmpty);
    return;
  }

  savedStories.forEach((story, i) => {
    const savedStoryLink = document.createElement('a');
    savedStoryLink.href = `#id=${story._id}`;

    const savedStoryPart = document.createElement('saved-storypart');
    savedStoryLink.appendChild(savedStoryPart);

    if (i === 0) {
      const slideElement = savedStoryPart.shadowRoot.querySelector('.window-saved-storypart');
      slideElement.classList.add('slide-hint');
      slideElement.addEventListener('animationend', () => {
        slideElement.classList.remove('slide-hint');
      })
    }

    const savedStoryTitle = savedStoryPart.shadowRoot.querySelector(
      "[slot='saved-storypart-title']"
    );
    savedStoryTitle.textContent = story.title;

    const savedStoryAuthor = savedStoryPart.shadowRoot.querySelector(
      "[slot='saved-storypart-author']"
    );
    savedStoryAuthor.textContent = story.author;

    savedStoryPart.dataset.storyId = story._id;

    windowSavedContent.appendChild(savedStoryLink);
  });

  // The below function detects the swipe direction and logs it to the console

  const touchArea = document.querySelectorAll('saved-storypart');


  touchArea.forEach((element) => {
    const slideElement = element.shadowRoot.querySelector('.window-saved-storypart');
    touchHandle.swipeAndRemove(slideElement, element);
  });

  utils.checkIfEmpty(windowSavedContent, 'saved-empty');

}

async function error() {
  utils.closeActiveWindow();

  const windowError = document.querySelector('.window-error');
  utils.openWindow(windowError, 'right');
}

export default {
  home,
  story,
  saved,
  error,
};