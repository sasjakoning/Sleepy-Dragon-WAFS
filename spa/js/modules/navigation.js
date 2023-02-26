function goBack() {
    if (document.querySelector("story-success")) {
        document.querySelector("story-success").remove();
    }

    if (windowStory.classList.contains("visible")) {
        windowStory.classList.add("slide-out");
        windowStory.addEventListener(
        "animationend",
        () => {
            console.log("Animation ended event fired");
            windowStory.classList.remove("slide-out-right");
            windowStory.classList.remove("slide-in-right");
            windowStory.classList.remove("visible");
        },
        { once: true }
        );
    }
};

function returnToHome(activeWindow) {
    activeWindow?.classList.forEach((className) => {
        if(className.includes('slide-')) {
            const [, , animDirection] = className.split('-');

            activeWindow.classList.add(`slide-out-${animDirection}`);

            return animDirection;
        }
    })
}

export { goBack, returnToHome };