

const closeActiveWindow = (event, activeWindow, animDirection) => {
    activeWindow.classList.remove("visible");
    activeWindow.classList.remove(`slide-out-${animDirection}`);
    activeWindow.classList.remove(`slide-in-${animDirection}`);
    activeWindow.removeEventListener("animationend", closeActiveWindow);
};


// Function to open a window by adding the "visible" and "slide-in" classes
function openWindow(window, direction) {
    window.classList.add(`visible`, `slide-in-${direction}`);
}

// remove window if it already exists
function removeDuplicateWindow(window) {
    const targetWindow = document.querySelector(`${window}`);
    console.log(targetWindow)
    if (targetWindow && targetWindow.classList.contains("visible")) {
      window.remove();
    }
}

function hideWindow(window) {
    window.classList.add("hidden");
}



export { closeActiveWindow, openWindow, removeDuplicateWindow, hideWindow };