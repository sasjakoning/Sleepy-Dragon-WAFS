function closeActiveWindow() {
  const activeWindow = document.querySelector('.visible.window');

  activeWindow?.classList.forEach((className) => {
    if (className.includes('slide-')) {
      const [, , animDirection] = className.split('-');

      activeWindow.classList.add(`slide-out-${animDirection}`);

      activeWindow.addEventListener(
        'animationend',
        (event) => {
          activeWindow.classList.remove('visible');
          activeWindow.classList.remove(`slide-out-${animDirection}`);
          activeWindow.classList.remove(`slide-in-${animDirection}`);
          activeWindow.removeEventListener('animationend', closeActiveWindow);

          if (activeWindow.id === 'story') {
            const loader = activeWindow.querySelector('story-loading');
            const content = activeWindow.querySelector('story-success');

            loader.remove();
            content.remove();
          } else if (activeWindow.id === 'saved') {
            const loader = activeWindow.querySelector('saved-loading');
            const content = activeWindow.querySelector('saved-storypart');

            loader?.remove();
            content?.remove();
          }
        },
        { once: true }
      );
    }
  });
}

// Function to open a window by adding the 'visible' and 'slide-in' classes
function openWindow(window, direction) {
  window.classList.add(`visible`, `slide-in-${direction}`);
}

// remove window if it already exists
function removeDuplicateWindow(window) {
  const targetWindow = document.querySelector(`${window}`);
  if (targetWindow && !targetWindow.classList.contains('hidden')) {
    targetWindow.remove();
  }
}

function hideWindow(window) {
  window.classList.add('hidden');
}

function checkIfEmpty(element, window) {
  let emptyStateAdded = false; // flag to check if an empty state element has been added
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      const targetChildren = Array.from(mutation.target.children);
      if (!emptyStateAdded && !targetChildren.some(
        (child) =>
          child.nodeName === 'A' ||
          child.nodeName === 'SAVED-EMPTY'
      )
      ) {
        const emptyState = document.createElement(window);
        element.classList.add('animate-in');
        element.appendChild(emptyState);
        emptyStateAdded = true; // set the flag to true
      }
    });
  });

  const config = { attributes: true, childList: true, characterData: true };
  observer.observe(element, config);
}

// ChatGPT helped me with the above function.

export default {
  closeActiveWindow,
  openWindow,
  removeDuplicateWindow,
  hideWindow,
  checkIfEmpty,
};
