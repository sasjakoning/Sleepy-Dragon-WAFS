import local from './localstorage.js';

function swipeAndRemove(element, parent) {
  let isDragging = false;
  let startPosition = null;
  let currentTranslate = 0;
  const threshold = -150;
  let animationFrameId;

  element.addEventListener('mousedown', dragStart);
  element.addEventListener('touchstart', dragStart);
  element.addEventListener('mouseup', dragEnd);
  element.addEventListener('touchend', dragEnd);
  element.addEventListener('mousemove', drag);
  element.addEventListener('touchmove', drag);

  function dragStart(event) {
    if (event.type === 'touchstart') {
      startPosition = event.touches[0].clientX;
    } else {
      startPosition = event.clientX;
    }
    isDragging = true;
    element.classList.remove('slide-out');
    element.classList.remove('slide-back');
  }

  function dragEnd(event) {
    if (currentTranslate < threshold) {
      element.classList.add('slide-out');
      setTimeout(() => {
        parent.parentNode.classList.add('slide-remove');
        // Remove the element from the DOM after the animation is complete
        parent.parentNode.addEventListener('animationend', () => {
          parent.parentNode.remove();
          // remove item from localstorage
          local.deleteStory(parent.dataset.storyId);
        });
      }, 500);
    } else {
      element.classList.add('slide-back');
      element.addEventListener('animationend', () => {
        element.style.setProperty('--xPos', 0 + 'px');
      });
      isDragging = false;
      startPosition = null;
      currentTranslate = 0;
      cancelAnimationFrame(animationFrameId);
    }
  }

  function drag(event) {
    if (isDragging) {
      const distance = currentTranslate - startPosition;
      let currentPosition = null;
      if (event.type === `touchmove`) {
        currentPosition = event.touches[0].clientX;
      } else {
        currentPosition = event.clientX;
      }
      const diff = currentPosition - startPosition;
      currentTranslate += diff;
      startPosition = currentPosition;

      // Prevent the element from being dragged in the wrong direction
      if (currentTranslate < 0) {
        element.style.setProperty(`--xPos`, `${currentTranslate}px`);
      }
    }
  }
}
// ChatGPT and Github Copilot helped me with this.

export default {
  swipeAndRemove,
};