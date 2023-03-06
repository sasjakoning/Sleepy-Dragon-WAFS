
function closeActiveWindow() {

    const activeWindow = document.querySelector(".visible.window");

    activeWindow?.classList.forEach((className) => {
        if (className.includes("slide-")) {
          const [, , animDirection] = className.split("-");
    
          activeWindow.classList.add(`slide-out-${animDirection}`);
    
          activeWindow.addEventListener(
            "animationend",
            (event) => {
                activeWindow.classList.remove("visible");
                activeWindow.classList.remove(`slide-out-${animDirection}`);
                activeWindow.classList.remove(`slide-in-${animDirection}`);
                activeWindow.removeEventListener("animationend", closeActiveWindow);
            
                console.log(activeWindow.id)
            
                if(activeWindow.id === 'story') {
                    const loader = activeWindow.querySelector("story-loading");
                    const content = activeWindow.querySelector("story-success");
            
                    loader.remove();
                    content.remove();
            
                }else if(activeWindow.id === 'saved') {
                    const loader = activeWindow.querySelector("saved-loading");
                    const content = activeWindow.querySelector("saved-storypart");
            
                    loader.remove();
                    content.remove();
                }
            },
            { once: true }
          );
        }
    });
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